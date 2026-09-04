const { BRAND_SEED, SERVICES_SEED } = require('./seed-data');

function uid(n) {
  n = n || 8;
  return Array.from({ length: n }, () => 'abcdefghjkmnpqrstuvwxyz0123456789'[Math.floor(Math.random() * 33)]).join('');
}
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function todayISO() { return new Date().toISOString().slice(0, 10); }
function addDays(iso, d) { const dt = new Date(iso); dt.setDate(dt.getDate() + d); return dt.toISOString().slice(0, 10); }
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; } return Math.abs(h); }
function seededRand(seedStr) {
  let seed = hashStr(seedStr) || 1;
  return function () { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; seed |= 0; return ((seed >>> 0) % 10000) / 10000; };
}

const STATUS_STAGES = ['Booked', 'Received', 'Diagnosed', 'In Progress', 'Quality Check', 'Ready', 'Completed'];

function buildBrands() {
  return BRAND_SEED.map(b => {
    const bid = slug(b.name);
    return {
      id: bid, name: b.name, tier: b.tier, enabled: true,
      series: b.series.map(s => {
        const sid = bid + '__' + slug(s.name);
        return {
          id: sid, name: s.name, enabled: true,
          models: s.models.map(m => ({ id: sid + '__' + slug(m), name: m, enabled: true }))
        };
      })
    };
  });
}

function buildPrices(brands) {
  const rows = [];
  brands.forEach(b => {
    b.series.forEach(s => {
      s.models.forEach(m => {
        SERVICES_SEED.forEach(svc => {
          const rnd = seededRand(b.id + '|' + m.id + '|' + svc.id)();
          const [lo, hi] = svc.range[b.tier];
          const price = Math.round((lo + rnd * (hi - lo)) / 10) * 10;
          rows.push({
            id: uid(10),
            brandId: b.id, seriesId: s.id, modelId: m.id,
            serviceId: svc.id,
            price, time: svc.time, warrantyDays: svc.warrantyDays,
            enabled: true
          });
        });
      });
    });
  });
  return rows;
}

function findBrand(brands, id) { return brands.find(b => b.id === id); }
function getPrice(prices, brandId, modelId, serviceId) {
  return prices.find(p => p.brandId === brandId && p.modelId === modelId && p.serviceId === serviceId);
}

function seedBookings(brands, prices, techs) {
  const samples = [
    { brand: 'apple', model: 'iphone-15-pro', service: 'screen', status: 'In Progress', name: 'Rahul Sharma', mobile: '9876543210', city: 'Mumbai' },
    { brand: 'samsung', model: 'galaxy-s24-ultra', service: 'battery', status: 'Ready', name: 'Ananya Iyer', mobile: '9876500011', city: 'Pune' },
    { brand: 'oneplus', model: 'oneplus-12', service: 'charging-port', status: 'Completed', name: 'Vikram Singh', mobile: '9876500022', city: 'Delhi' },
    { brand: 'xiaomi', model: 'redmi-note-13-pro', service: 'water-damage', status: 'Diagnosed', name: 'Fatima Sheikh', mobile: '9876500033', city: 'Hyderabad' },
    { brand: 'apple', model: 'iphone-13', service: 'battery', status: 'Booked', name: 'Aditya Kulkarni', mobile: '9876500044', city: 'Mumbai' },
    { brand: 'google', model: 'pixel-8', service: 'camera', status: 'Quality Check', name: 'Sneha Reddy', mobile: '9876500055', city: 'Bengaluru' },
    { brand: 'vivo', model: 'vivo-v30', service: 'software', status: 'Received', name: 'Manish Gupta', mobile: '9876500066', city: 'Mumbai' }
  ];
  let seq = 10245;
  const yr = new Date().getFullYear();
  return samples.map((s, i) => {
    const b = findBrand(brands, s.brand);
    let found = null;
    b.series.forEach(se => se.models.forEach(m => { if (m.id.includes('__' + s.model)) found = { series: se, model: m }; }));
    if (!found) return null;
    const pr = getPrice(prices, b.id, found.model.id, s.service);
    const svc = SERVICES_SEED.find(x => x.id === s.service);
    const createdDaysAgo = 8 - i;
    const createdAt = addDays(todayISO(), -createdDaysAgo);
    const stageIdx = STATUS_STAGES.indexOf(s.status);
    const history = STATUS_STAGES.slice(0, stageIdx + 1).map((st, idx) => ({ status: st, at: addDays(createdAt, idx), note: '' }));
    const tech = techs[i % techs.length];
    return {
      id: uid(10),
      repairId: 'MR-' + yr + '-' + (seq++),
      createdAt,
      customer: { name: s.name, mobile: s.mobile, email: slug(s.name) + '@example.com', address: '12 MG Road', city: s.city, pincode: '400001' },
      device: { brandId: b.id, brandName: b.name, seriesId: found.series.id, seriesName: found.series.name, modelId: found.model.id, modelName: found.model.name, variant: '128GB', imei: '' },
      serviceId: svc.id, serviceName: svc.name,
      problemDesc: 'Reported by customer at drop-off.',
      images: [],
      appointment: { type: i % 2 === 0 ? 'store' : 'pickup', date: addDays(createdAt, 1), time: '11:00 AM' },
      price: pr ? pr.price : 1500,
      estRepairTime: svc.time,
      warrantyDays: svc.warrantyDays,
      technicianId: tech.id, technicianName: tech.name,
      status: s.status,
      statusHistory: history,
      payment: { method: s.status === 'Completed' ? 'UPI' : '—', status: s.status === 'Completed' ? 'Paid' : 'Pending', amountPaid: s.status === 'Completed' ? (pr ? pr.price : 1500) : 0 },
      notes: [],
      cancelled: false
    };
  }).filter(Boolean);
}

module.exports = { buildBrands, buildPrices, seedBookings, uid, slug };
