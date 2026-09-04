/* ================= HOME PAGE SECTIONS ================= */
function heroSection(){
  const phone = getStorePhone();
  const wa = getStoreWhatsApp();
  const waClean = cleanWa(wa);
  return `
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <h1>Your Phone.<br>Our Expertise.</h1>
        <p class="sub">Fast, Reliable &amp; Affordable Mobile Phone Repair</p>
        <p class="desc">Repair your smartphone with trusted technicians, genuine quality parts and transparent pricing — for every major iOS and Android brand.</p>
        <div class="hero-btns">
          <a href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background:#25D366;border-color:#25D366;box-shadow:0 4px 14px rgba(37,211,102,.4)">💬 WhatsApp Us</a>
          <a href="tel:${phone}" class="btn btn-ghost-light">📞 Call: ${escapeHtml(phone)}</a>
        </div>
        <div class="stat-strip">
          <div class="stat"><div class="num">10,000+</div><div class="lbl">Repairs Done</div></div>
          <div class="stat"><div class="num">50+</div><div class="lbl">Phone Models</div></div>
          <div class="stat"><div class="num">Same-Day</div><div class="lbl">Service</div></div>
          <div class="stat"><div class="num">4.9/5</div><div class="lbl">Customer Rating</div></div>
        </div>
      </div>
      <div class="hero-art">
        <div class="blob"></div>
        <div class="phone-illustration">
          <div class="screen">
            <svg width="70%" height="70%" viewBox="0 0 100 100"><path d="M50 5 L30 45 L48 45 L38 95 L75 40 L55 40 Z" fill="#ffffff" opacity="0.9"/></svg>
          </div>
        </div>
        <div class="float-card f1"><div class="t">&#9989; Diagnosis Complete</div><div class="s">Screen &amp; battery checked</div></div>
        <div class="float-card f2"><div class="t">&#9203; 45 min avg.</div><div class="s">Typical repair time</div></div>
      </div>
    </div>
  </section>`;
}

function servicesSection(){
  return `
  <section id="services" class="container-section">
    <div class="wrap">
      <div class="section-head">
        <h2>Repair services for every kind of damage</h2>
        <p>From cracked screens to battery and hardware issues — our technicians handle it with genuine-quality parts and clear pricing.</p>
      </div>
      <div class="svc-grid">
        ${SERVICES_SEED.map(s=>`
          <div class="svc-card" onclick="toggleContactPopup(true);">
            <div class="svc-icon">${s.icon}</div>
            <h4>${s.name}</h4>
            <p>${s.desc}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

const BRAND_DATA = {
  apple: {
    bg: 'linear-gradient(135deg, #1F2937, #111827)',
    color: '#ffffff',
    accent: '#111827',
    icon: `<svg width="28" height="28" viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.3-9.58-11.23-20.73-14.79-33.45-3.55-12.72-5.33-24.31-5.33-34.78 0-14.16 3.49-26.06 10.47-35.68 6.98-9.63 15.75-14.54 26.31-14.75 4.8 0 10.14 1.25 16.02 3.75 5.88 2.5 9.77 3.81 11.68 3.94 1.52-.13 5.61-1.48 12.27-4.06 6.66-2.58 12.16-3.76 16.51-3.53 12.44.63 22.37 5.34 29.8 14.14-10.89 6.58-16.23 15.54-16.02 26.89.22 8.92 3.64 16.32 10.27 22.21 6.63 5.89 14.48 9.3 23.55 10.23-2.39 7.33-5.27 14.67-8.64 22.02zM119.22 33.64c0-7.07 2.57-13.71 7.71-19.92 5.14-6.21 11.45-10.16 18.93-11.84.44 1.41.66 2.76.66 4.06 0 7.07-2.67 13.82-8.01 20.25-5.34 6.43-11.75 10.36-19.23 11.79-.04-1.47-.06-2.92-.06-4.34z"/>
    </svg>`
  },
  samsung: {
    bg: 'linear-gradient(135deg, #034EA2, #002B66)',
    color: '#ffffff',
    accent: '#034EA2',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:12px;letter-spacing:1px">SAMSUNG</span>`
  },
  oneplus: {
    bg: 'linear-gradient(135deg, #EB0028, #99001A)',
    color: '#ffffff',
    accent: '#EB0028',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:16px;display:flex;align-items:center;gap:1px">1<span style="font-size:18px;color:#fff;margin-top:-2px">+</span></span>`
  },
  xiaomi: {
    bg: 'linear-gradient(135deg, #FF6900, #D95300)',
    color: '#ffffff',
    accent: '#FF6900',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:900;font-size:17px;letter-spacing:-.5px">mi</span>`
  },
  vivo: {
    bg: 'linear-gradient(135deg, #415FFF, #1D39D1)',
    color: '#ffffff',
    accent: '#415FFF',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;letter-spacing:.5px">vivo</span>`
  },
  oppo: {
    bg: 'linear-gradient(135deg, #00875A, #005639)',
    color: '#ffffff',
    accent: '#00875A',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;letter-spacing:1px">OPPO</span>`
  },
  realme: {
    bg: 'linear-gradient(135deg, #FFC915, #E5AC00)',
    color: '#111827',
    accent: '#E5AC00',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:14px;letter-spacing:.5px">realme</span>`
  },
  google: {
    bg: 'linear-gradient(135deg, #4285F4, #34A853)',
    color: '#ffffff',
    accent: '#4285F4',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#ffffff" opacity="0.9" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#ffffff" opacity="0.8" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#ffffff" opacity="0.9" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>`
  },
  motorola: {
    bg: 'linear-gradient(135deg, #001435, #0A2F6E)',
    color: '#ffffff',
    accent: '#0A2F6E',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;font-style:italic">M</span>`
  },
  nothing: {
    bg: 'linear-gradient(135deg, #111111, #222222)',
    color: '#ffffff',
    accent: '#333333',
    icon: `<span style="font-family:'Courier New',monospace;font-weight:700;font-size:11px;letter-spacing:1.5px">(NOTHING)</span>`
  },
  iqoo: {
    bg: 'linear-gradient(135deg, #FFB800, #FF7A00)',
    color: '#111827',
    accent: '#FF7A00',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:900;font-size:14px;letter-spacing:1px">iQOO</span>`
  },
  poco: {
    bg: 'linear-gradient(135deg, #FFD400, #F2A900)',
    color: '#111827',
    accent: '#FFD400',
    icon: `<span style="font-family:'Poppins',sans-serif;font-weight:900;font-size:14px;letter-spacing:1px">POCO</span>`
  }
};

function brandsSection(){
  const b = DB.brands || [];
  return `
  <section id="brands" class="container-section" style="background:var(--gray-50)">
    <div class="wrap">
      <div class="section-head">
        <h2>Choose your phone brand</h2>
        <p>We repair every major iOS and Android brand with certified technicians and genuine-quality parts.</p>
      </div>
      <div class="brand-grid">
        ${b.map(br=>{
          const meta = BRAND_DATA[br.id] || {
            bg: 'linear-gradient(135deg, var(--navy), #1e293b)',
            color: '#ffffff',
            accent: 'var(--blue)',
            icon: `<span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:15px">${escapeHtml(br.name.slice(0,2).toUpperCase())}</span>`
          };
          return `
          <button class="brand-tile" style="--brand-accent:${meta.accent}" onclick="toggleContactPopup(true);">
            <div class="brand-icon-wrap" style="background:${meta.bg};color:${meta.color}">
              ${meta.icon}
            </div>
            <div class="bn">${br.name}</div>
            <div class="brand-action">Inquire Now &rarr;</div>
          </button>`;
        }).join('')}

        <!-- Etc. / Other Phone Brand Tile -->
        <button class="brand-tile" style="--brand-accent:var(--blue)" onclick="toggleContactPopup(true);" title="Other / Unlisted Phone Brands">
          <div class="brand-icon-wrap" style="background:linear-gradient(135deg, #0B1220, #2563eb);color:#ffffff">
            <span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:15px;letter-spacing:.5px">ETC</span>
          </div>
          <div class="bn">Etc.</div>
          <div class="brand-action">Inquire Now &rarr;</div>
        </button>
      </div>
    </div>
  </section>`;
}

function howItWorksSection(){
  const steps=[
    ['Identify Your Phone','Tell us your brand and model or visit our service centre.'],
    ['Select Repair','Tell us the issue — screen, battery, charging port, camera or water damage.'],
    ['Contact Our Team','Visit our store or get in touch via WhatsApp or phone call.'],
    ['Get Your Phone Back','Same-day repair with genuine quality parts and expert testing.']
  ];
  return `
  <section class="container-section">
    <div class="wrap">
      <div class="section-head"><h2>How it works</h2><p>Four simple steps to get your phone repaired.</p></div>
      <div class="steps-row">
        ${steps.map((s,i)=>`<div class="step-card"><div class="step-num">${i+1}</div><h4>${s[0]}</h4><p>${s[1]}</p></div>`).join('')}
      </div>
    </div>
  </section>`;
}

function whyUsSection(){
  const items=[
    ['&#129513;','Certified Technicians','Every repair is handled by a technician trained on that specific brand and category.'],
    ['&#128737;&#65039;','Genuine Quality Parts','We use parts that meet OEM specifications for maximum durability.'],
    ['&#128176;','Transparent Pricing','Clear, upfront pricing with no hidden charges or surprise diagnosis fees.'],
    ['&#9889;','Fast Turnaround','Most common repairs are completed the same day.'],
    ['&#128274;','Data Safety First','Your data stays private — we never access personal files without consent.'],
    ['&#11088;','4.9/5 Customer Rating','Thousands of repairs completed with consistently high satisfaction.']
  ];
  return `
  <section class="container-section" style="background:var(--gray-50)">
    <div class="wrap">
      <div class="section-head"><h2>Why choose FixMyPhone</h2><p>What sets our service apart from the average repair shop.</p></div>
      <div class="why-grid">
        ${items.map(i=>`<div class="why-item"><div class="why-ic">${i[0]}</div><div><h4 style="margin:0 0 4px;font-size:15px">${i[1]}</h4><p style="margin:0;font-size:13.5px;color:var(--gray-500);line-height:1.55">${i[2]}</p></div></div>`).join('')}
      </div>
    </div>
  </section>`;
}

function reviewsSection(){
  const revs=[
    ['Rahul Sharma','Screen replacement — iPhone 15 Pro','Dropped off in the morning, had my phone back by evening. Screen quality feels exactly like original.'],
    ['Ananya Iyer','Battery replacement — Galaxy S24','Transparent pricing, no surprise charges. Quick turnaround and friendly staff.'],
    ['Vikram Singh','Charging port repair — OnePlus 12','Quick diagnosis and fair price. Technician was courteous and helpful.'],
    ['Fatima Sheikh','Water damage repair — Redmi Note 13','They were honest about the recovery process and managed to save my phone.'],
    ['Sneha Reddy','Camera repair — Pixel 8','Professional service and the invoice was itemised clearly. Highly recommend.']
  ];
  return `
  <section class="container-section">
    <div class="wrap">
      <div class="section-head"><h2>What our customers say</h2><p>Real feedback from recent repairs.</p></div>
      <div class="rev-track">
        ${revs.map(r=>`
          <div class="rev-card">
            <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p>"${r[2]}"</p>
            <div class="rev-who"><div class="rev-avatar">${r[0].split(' ').map(w=>w[0]).join('')}</div><div><div style="font-weight:600;font-size:13.5px">${r[0]}</div><div style="font-size:12px;color:var(--gray-500)">${r[1]}</div></div></div>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function contactBandSection(){
  const phone = getStorePhone();
  const wa = getStoreWhatsApp();
  const waClean = cleanWa(wa);
  return `
  <section class="container-section">
    <div class="wrap">
      <div class="track-band" style="background:linear-gradient(135deg,#0B1220 0%,#1a2a4e 100%);color:#fff">
        <div><h3 style="color:#fff">Need fast phone repair assistance?</h3><p style="color:rgba(255,255,255,.7)">Speak with our experienced technicians or message us directly on WhatsApp for an instant quote.</p></div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background:#25D366;border-color:#25D366;box-shadow:0 4px 12px rgba(37,211,102,.35)">💬 WhatsApp Us</a>
          <a href="tel:${phone}" class="btn btn-ghost-light">📞 Call Us: ${escapeHtml(phone)}</a>
        </div>
      </div>
    </div>
  </section>`;
}

function bookCtaSection(){
  const phone = getStorePhone();
  const wa = getStoreWhatsApp();
  const waClean = cleanWa(wa);
  return `
  <section class="container-section" style="background:var(--navy);color:#fff">
    <div class="wrap center" style="max-width:640px">
      <h2 style="color:#fff;font-size:30px;margin:0 0 12px">Ready to get your phone fixed?</h2>
      <p style="color:rgba(255,255,255,.65);margin:0 0 26px">Visit our store or reach out to our technicians directly for same-day repair service.</p>
      <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">
        <a href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background:#25D366;border-color:#25D366">💬 WhatsApp: ${escapeHtml(wa)}</a>
        <a href="tel:${phone}" class="btn btn-ghost-light">📞 Call: ${escapeHtml(phone)}</a>
      </div>
    </div>
  </section>`;
}

const FAQS=[
 ['How long does a phone repair take?','Most common repairs like screen or battery replacement are completed within 60–90 minutes. Water damage and complex board-level issues can take 24–48 hours for diagnosis and repair.'],
 ['Do you repair iPhones?','Yes — we support the full iPhone lineup from iPhone 8 through the latest iPhone series, including Face ID and camera replacements.'],
 ['Do you repair Samsung & Android phones?','Yes — Galaxy S, Z Fold, Z Flip, A series, OnePlus, Xiaomi, Vivo, Oppo and RealMe are all supported.'],
 ['How much does a repair cost?','Pricing depends on your exact device model and the issue. Message us on WhatsApp or call our shop for a free instant estimate.'],
 ['How can I contact your technicians?','You can reach us directly via WhatsApp or phone, or visit any of our service centre locations during opening hours.'],
 ['Do you offer pickup and delivery?','Yes — we provide pickup and drop service across the local area. Contact us on WhatsApp to arrange a convenient pickup time.']
];

function faqSection(){
  return `
  <section id="faq" class="container-section" style="background:var(--gray-50)">
    <div class="wrap" style="max-width:760px">
      <div class="section-head center"><h2>Frequently asked questions</h2><p>Everything you need to know about our repair service.</p></div>
      <div id="faq-list">
        ${FAQS.map((f,i)=>`
          <div class="faq-item" id="faq-${i}">
            <button class="faq-q" onclick="toggleFaq(${i})"><span>${f[0]}</span><span class="faq-plus">+</span></button>
            <div class="faq-a" id="faq-a-${i}"><p>${f[1]}</p></div>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function toggleFaq(i){
  const item=document.getElementById('faq-'+i);
  const a=document.getElementById('faq-a-'+i);
  const open=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el=>{el.classList.remove('open');});
  document.querySelectorAll('.faq-a').forEach(el=>{el.style.maxHeight=null;});
  if(!open){ item.classList.add('open'); a.style.maxHeight=a.scrollHeight+20+'px'; }
}

function contactSection(){
  const s = DB.settings || {};
  const phone = getStorePhone();
  const wa = getStoreWhatsApp();
  const waClean = cleanWa(wa);
  const email = s.storeEmail || 'support@fixmyphone.in';
  const hours = s.hours || 'Mon–Sat: 10:00 AM – 8:00 PM';
  const addrs = (s.addresses && s.addresses.length) ? s.addresses : [
    { title: 'Main Store', fullAddress: s.storeAddress || 'Shop 14, Linking Road, Bandra West, Mumbai 400050', phone, whatsapp: wa, timing: hours, isPrimary: true }
  ];

  return `
  <section id="contact" class="container-section">
    <div class="wrap">
      <div class="section-head">
        <h2>Get in touch &amp; Visit Our Store</h2>
        <p>Visit our service centres, give us a call, or chat directly with our technicians on WhatsApp.</p>
      </div>

      <!-- Quick Contact Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:18px;margin-bottom:30px">
        <a href="tel:${phone}" class="card" style="padding:22px;display:flex;align-items:center;gap:16px;text-decoration:none;transition:transform .15s,box-shadow .15s">
          <div style="width:48px;height:48px;border-radius:14px;background:#eff6ff;color:#2F6FEF;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">📞</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--gray-500);text-transform:uppercase">Call Support</div>
            <div style="font-size:16px;font-weight:700;color:var(--navy);margin-top:2px">${escapeHtml(phone)}</div>
          </div>
        </a>
        <a href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" class="card" style="padding:22px;display:flex;align-items:center;gap:16px;text-decoration:none;transition:transform .15s,box-shadow .15s">
          <div style="width:48px;height:48px;border-radius:14px;background:#f0fdf4;color:#25D366;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">💬</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--gray-500);text-transform:uppercase">WhatsApp Support</div>
            <div style="font-size:16px;font-weight:700;color:var(--navy);margin-top:2px">${escapeHtml(wa)}</div>
          </div>
        </a>
        <div class="card" style="padding:22px;display:flex;align-items:center;gap:16px">
          <div style="width:48px;height:48px;border-radius:14px;background:#fdf2f8;color:#db2777;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">✉️</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--gray-500);text-transform:uppercase">Email Support</div>
            <div style="font-size:15px;font-weight:700;color:var(--navy);margin-top:2px">${escapeHtml(email)}</div>
          </div>
        </div>
        <div class="card" style="padding:22px;display:flex;align-items:center;gap:16px">
          <div style="width:48px;height:48px;border-radius:14px;background:#fef3c7;color:#d97706;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">⏰</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--gray-500);text-transform:uppercase">Opening Hours</div>
            <div style="font-size:13.5px;font-weight:600;color:var(--navy);margin-top:2px">${escapeHtml(hours)}</div>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:30px" class="grid2">
        <!-- Store Locations List -->
        <div>
          <h3 style="margin:0 0 16px;font-size:20px">📍 Our Store &amp; Service Locations (${addrs.length})</h3>
          <div style="display:flex;flex-direction:column;gap:16px">
            ${addrs.map(a=>{
              const aPhone = a.phone || phone;
              const aWa = a.whatsapp || wa;
              const aWaClean = cleanWa(aWa);
              const fullAddr = a.fullAddress || `${a.street || ''}, ${a.area || ''}, ${a.city || ''} ${a.pincode || ''}`.replace(/^, | ,/g,'');
              return `
              <div class="card" style="padding:22px;border:1.5px solid ${a.isPrimary?'var(--blue)':'var(--gray-100)'};position:relative">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px">
                  <h4 style="margin:0;font-size:17px;color:var(--navy)">${escapeHtml(a.title || 'Service Centre')}</h4>
                  ${a.isPrimary?'<span class="pill badge-blue" style="font-size:11.5px">⭐ Primary Location</span>':''}
                </div>
                <p style="font-size:14px;color:var(--gray-700);line-height:1.6;margin:0 0 14px">
                  🏢 <strong>Address:</strong> ${escapeHtml(fullAddr)}
                </p>
                <div style="display:flex;flex-wrap:wrap;gap:18px;font-size:13px;color:var(--gray-500);margin-bottom:16px">
                  ${a.timing?`<span>⏰ <strong>Timing:</strong> ${escapeHtml(a.timing)}</span>`:''}
                  ${aPhone?`<span>📞 <strong>Phone:</strong> ${escapeHtml(aPhone)}</span>`:''}
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                  <a href="https://wa.me/${aWaClean}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="background:#25D366;border-color:#25D366">💬 WhatsApp Location</a>
                  <a href="tel:${aPhone}" class="btn btn-sm btn-outline">📞 Call Store</a>
                  <a href="https://maps.google.com/?q=${encodeURIComponent(fullAddr)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">🗺️ Google Maps</a>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card" style="padding:26px;height:fit-content">
          <h3 style="margin:0 0 14px;font-size:19px">Send Us a Direct Message</h3>
          <p class="small-note" style="margin-bottom:18px">Have a specific repair question or require bulk enterprise device service? Write to us.</p>
          <form onsubmit="submitContact(event)">
            <div class="field"><label>Full Name</label><input required name="name" placeholder="e.g. Rahul Sharma"></div>
            <div class="field"><label>Mobile Number</label><input required name="mobile" placeholder="e.g. 9876543210"></div>
            <div class="field"><label>Message / Device Issue</label><textarea required rows="4" name="message" placeholder="Describe the phone model and issue you are facing..."></textarea></div>
            <button class="btn btn-primary" style="width:100%" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}
function submitContact(e){ e.preventDefault(); e.target.reset(); toast('Message sent — our team will reach out to you shortly.'); }

function aboutSection(){
  return `
  <section id="about" class="container-section" style="background:var(--gray-50)">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center" class="grid2">
      <div>
        <div class="section-head" style="margin-bottom:20px"><h2>About FixMyPhone</h2></div>
        <p style="color:var(--gray-500);line-height:1.7;font-size:15px;margin-bottom:14px">For over eight years, FixMyPhone has repaired everyday smartphones for everyday people — from cracked screens before an exam to a battery that won't survive the day.</p>
        <p style="color:var(--gray-500);line-height:1.7;font-size:15px;margin-bottom:22px">Every technician on our team is trained on the brands they work with, every part meets genuine-equivalent quality, and every price is clear with no surprise fees.</p>
        <div class="why-grid" style="grid-template-columns:1fr 1fr">
          <div class="why-item"><div class="why-ic">&#128119;</div><div><h4 style="margin:0;font-size:14px">Expert Technicians</h4></div></div>
          <div class="why-item"><div class="why-ic">&#9989;</div><div><h4 style="margin:0;font-size:14px">Genuine Parts</h4></div></div>
          <div class="why-item"><div class="why-ic">&#128176;</div><div><h4 style="margin:0;font-size:14px">Transparent Pricing</h4></div></div>
          <div class="why-item"><div class="why-ic">&#9889;</div><div><h4 style="margin:0;font-size:14px">Fast Service</h4></div></div>
        </div>
      </div>
      <div style="background:var(--navy);border-radius:24px;height:340px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:Poppins;flex-direction:column;gap:10px">
        <div style="font-size:40px">&#128736;&#65039;</div>
        <div>8+ Years Repairing Phones</div>
      </div>
    </div>
  </section>`;
}

function homeView(){
  return heroSection()+servicesSection()+brandsSection()+howItWorksSection()+whyUsSection()+reviewsSection()+contactBandSection()+bookCtaSection()+faqSection()+contactSection()+aboutSection();
}
