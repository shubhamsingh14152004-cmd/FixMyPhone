const fs = require('fs');
const path = require('path');
const { buildBrands, buildPrices, seedBookings, uid } = require('./build');
const { SERVICES_SEED, TECH_SEED } = require('./seed-data');

const DB_PATH = path.join(__dirname, '..', '..', 'storage', 'database.json');
const os = require('os');
const TMP_DB_PATH = path.join(os.tmpdir(), 'fixmyphone-database.json');

const DEFAULT_SETTINGS = {
  nextSeq: 10252,
  storeName: 'FixMyPhone',
  storeAddress: 'Shop 14, Linking Road, Bandra West, Mumbai 400050',
  storePhone: '+91 9004245310',
  storeWhatsApp: '9004245310',
  popupPhone: '+91 9004245310',
  popupWhatsApp: '9004245310',
  popupTitle: 'FixMyPhone Support',
  popupStatus: 'Online • Instant Help',
  popupMessage: '👋 Hi! Need help with your phone repair? Chat with us or call directly:',
  popupWaText: 'Hi FixMyPhone, I need help with my phone repair',
  popupBadgeText: '💬 Need help? Chat or Call',
  popupEnabled: true,
  storeEmail: 'support@fixmyphone.in',
  hours: 'Mon–Sat: 10:00 AM – 8:00 PM, Sun: 11:00 AM – 5:00 PM',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Bandra+West+Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed',
  facebook: '',
  instagram: '',
  youtube: '',
  linkedin: '',
  addresses: [
    {
      id: 'addr_bandra',
      title: 'Main Service Centre (Bandra)',
      street: 'Shop 14, Linking Road',
      area: 'Bandra West',
      city: 'Mumbai',
      pincode: '400050',
      fullAddress: 'Shop 14, Linking Road, Bandra West, Mumbai 400050',
      phone: '+91 9004245310',
      whatsapp: '9004245310',
      timing: 'Mon–Sat: 10:00 AM – 8:00 PM',
      isPrimary: true
    },
    {
      id: 'addr_andheri',
      title: 'Andheri Express Drop Point',
      street: 'Unit 4, Crystal Point Mall, New Link Road',
      area: 'Andheri West',
      city: 'Mumbai',
      pincode: '400053',
      fullAddress: 'Unit 4, Crystal Point Mall, New Link Road, Andheri West, Mumbai 400053',
      phone: '+91 9820011225',
      whatsapp: '9004245310',
      timing: 'Mon–Sat: 10:30 AM – 7:30 PM',
      isPrimary: false
    }
  ]
};

let memoryStore = null;

function getStorePath() {
  if (fs.existsSync(TMP_DB_PATH)) return TMP_DB_PATH;
  return DB_PATH;
}

function buildInitialData() {
  const brands = buildBrands();
  const prices = buildPrices(brands);
  const technicians = TECH_SEED.map(t => ({ id: uid(8), ...t }));
  const bookings = seedBookings(brands, prices, technicians);
  const settings = DEFAULT_SETTINGS;
  return { brands, prices, bookings, technicians, settings, services: SERVICES_SEED };
}

function readDB() {
  if (memoryStore) return memoryStore;

  const targetPath = getStorePath();
  if (fs.existsSync(targetPath)) {
    try {
      memoryStore = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      return memoryStore;
    } catch (e) {
      console.error('Error reading database at', targetPath, e);
    }
  }

  memoryStore = buildInitialData();
  return memoryStore;
}

function writeDB(data) {
  memoryStore = data;
  const content = JSON.stringify(data, null, 2);
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, content);
    return;
  } catch (err) {
    try {
      fs.writeFileSync(TMP_DB_PATH, content);
    } catch (tmpErr) {
      console.warn('Could not persist to /tmp:', tmpErr.message);
    }
  }
}

function initStore() {
  const db = readDB();
  if (!db.settings) {
    db.settings = DEFAULT_SETTINGS;
    writeDB(db);
  }
}

function getCollection(name) {
  const db = readDB();
  if (name === 'settings') {
    if (!db.settings) {
      db.settings = DEFAULT_SETTINGS;
      writeDB(db);
    }
    return db.settings;
  }
  return db[name] || [];
}
function setCollection(name, value) {
  const db = readDB();
  if (name === 'settings') {
    db[name] = { ...(db.settings || DEFAULT_SETTINGS), ...value };
  } else {
    db[name] = value;
  }
  writeDB(db);
  return db[name];
}

module.exports = { initStore, getCollection, setCollection, DEFAULT_SETTINGS };
