/* ================= STREAMLINED ADMIN PANEL =================
   Dedicated options:
   1. 📞 Edit Phone Number & WhatsApp Number
   2. 📍 Edit Store Address & Locations
   3. 📱 Add Phone Brands & Manage Brands
============================================================ */

const adminState = {
  tab: 'contact', // 'contact' | 'address' | 'brands'
  modal: null, // { type, ... }
  sidebarOpen: false
};

function adminView(hash) {
  if (!ADMIN_SESSION) return loginRedirectNotice();
  let sub = (hash.split('/')[1] || 'contact').toLowerCase();
  
  // Normalise legacy or unrecognized hashes to 'contact'
  if (!['contact', 'address', 'brands'].includes(sub)) {
    sub = 'contact';
  }
  adminState.tab = sub;

  return `
  <div class="admin-shell">
    <!-- Admin Sidebar Navigation -->
    <aside class="admin-sidebar ${adminState.sidebarOpen ? 'open' : ''}" id="admin-sidebar">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div class="logo" style="font-size:18px">
          <span class="mark">&#9881;&#65039;</span> FixMyPhone
        </div>
        <button class="hide-desktop" style="background:none;border:none;color:#fff;font-size:22px;cursor:pointer" onclick="adminState.sidebarOpen=false;render();">&times;</button>
      </div>

      <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;padding-left:6px">
        Admin Controls
      </div>

      <nav style="display:flex;flex-direction:column;gap:5px">
        <a href="#admin/contact" class="${sub === 'contact' ? 'active' : ''}" onclick="adminState.sidebarOpen=false;">
          <span style="font-size:16px">📞</span> Phone &amp; WhatsApp
        </a>
        <a href="#admin/address" class="${sub === 'address' ? 'active' : ''}" onclick="adminState.sidebarOpen=false;">
          <span style="font-size:16px">📍</span> Address &amp; Location
        </a>
        <a href="#admin/brands" class="${sub === 'brands' ? 'active' : ''}" onclick="adminState.sidebarOpen=false;">
          <span style="font-size:16px">📱</span> Phone Brands
        </a>
      </nav>

      <div style="flex:1;min-height:50px"></div>

      <div style="border-top:1px solid rgba(255,255,255,.1);padding-top:16px;display:flex;flex-direction:column;gap:6px">
        <a href="#home" style="color:rgba(255,255,255,.75)">← Back to Website</a>
        <a href="javascript:void(0)" onclick="adminLogout()" style="color:#ff9d9d">⏻ Logout</a>
      </div>
    </aside>

    <!-- Admin Main Content Area -->
    <main class="admin-main">
      <div class="admin-topbar">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="btn btn-outline btn-sm hide-desktop" id="admin-hamburger" onclick="adminState.sidebarOpen=true;render();">&#9776; Menu</button>
          <div>
            <h2 style="margin:0;font-family:Poppins;font-size:22px;color:var(--navy)">
              ${sub === 'contact' ? '📞 Phone & WhatsApp Numbers' : (sub === 'address' ? '📍 Store Address & Location' : '📱 Add & Manage Phone Brands')}
            </h2>
            <p class="small-note" style="margin:2px 0 0">
              ${sub === 'contact' ? 'Update the direct call number and WhatsApp number shown to visitors on your website' : (sub === 'address' ? 'Edit store address, branch locations, operating hours and Google Maps directions' : 'Add new phone brands, series and models to your repair catalogue')}
            </p>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:10px">
          ${sub === 'brands' ? `<button class="btn btn-primary btn-sm" onclick="openAddBrand()">+ Add Phone Brand</button>` : ''}
          ${sub === 'address' ? `<button class="btn btn-primary btn-sm" onclick="openAddressModal()">+ Add New Address</button>` : ''}
          <a href="#home" target="_blank" class="btn btn-outline btn-sm" style="background:#fff">🌐 View Website ↗</a>
        </div>
      </div>

      <!-- Active Section View -->
      ${sub === 'contact' ? adminContactSection() : ''}
      ${sub === 'address' ? adminAddressSection() : ''}
      ${sub === 'brands' ? adminBrandsSection() : ''}

      <!-- Modals -->
      ${adminState.modal && adminState.modal.type === 'addBrand' ? addBrandModalHtml() : ''}
      ${adminState.modal && adminState.modal.type === 'addSeries' ? addSeriesModalHtml() : ''}
      ${adminState.modal && adminState.modal.type === 'addModel' ? addModelModalHtml() : ''}
      ${adminState.modal && adminState.modal.type === 'addressModal' ? addressModalHtml() : ''}
    </main>
  </div>
  <style>
    @media(max-width:900px){
      #admin-hamburger{display:inline-flex !important}
      .hide-desktop{display:inline-flex !important}
      .hide-mobile{display:none !important}
    }
    @media(min-width:901px){
      .hide-desktop{display:none !important}
    }
  </style>
  `;
}

function loginRedirectNotice() {
  setTimeout(() => { if (!ADMIN_SESSION) nav('#login'); }, 10);
  return `<div class="wrap container-section" style="text-align:center;padding:80px 20px"><h3>Redirecting to admin login…</h3></div>`;
}

function closeModal() {
  adminState.modal = null;
  render();
}

/* ================= 1. PHONE & WHATSAPP NUMBERS ================= */

function adminContactSection() {
  const s = DB.settings || {};
  const popupCfg = getPopupSettings();
  const phone = popupCfg.phone;
  const wa = popupCfg.whatsapp;
  const waClean = cleanWa(wa);

  return `
  <!-- Notice Banner -->
  <div class="admin-panel" style="background:linear-gradient(135deg,#0B1220 0%,#17264A 100%);color:#fff;border:none;box-shadow:0 10px 30px -10px rgba(11,18,32,.35);margin-bottom:24px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px">
      <div>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:24px">📱</span>
          <h3 style="margin:0;font-family:Poppins;font-size:18px;color:#fff">Website Contact &amp; Support Numbers</h3>
        </div>
        <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,.75);max-width:650px">
          Updating your Phone Number and WhatsApp Number here instantly updates all call buttons, WhatsApp widgets, website header, and footer across your entire website.
        </p>
      </div>
      <div>
        <span class="pill ${popupCfg.enabled ? 'badge-ok' : 'badge-danger'}" style="font-size:12px">
          ${popupCfg.enabled ? '🟢 Live on Website' : '🔴 Widget Disabled'}
        </span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px">
      <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:16px">
        <div style="font-size:11.5px;color:rgba(255,255,255,.65);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">📞 Direct Call Support</div>
        <div style="font-size:19px;font-weight:700;font-family:Poppins;color:#fff">${escapeHtml(phone)}</div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:12px;color:#93c5fd">Visitor Click to Call</span>
          <a href="tel:${phone}" class="quick-test-btn call" style="background:#eff6ff;color:#1e40af;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600">📞 Test Call ↗</a>
        </div>
      </div>

      <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:16px">
        <div style="font-size:11.5px;color:rgba(255,255,255,.65);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">💬 WhatsApp Support</div>
        <div style="font-size:19px;font-weight:700;font-family:Poppins;color:#25D366">${escapeHtml(wa)}</div>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:12px;color:#86efac">WhatsApp Chat Button</span>
          <a href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" class="quick-test-btn wa" style="background:#f0fdf4;color:#166534;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600">💬 Test WA ↗</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Form & Live Preview Grid -->
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:24px;align-items:start" class="grid2">
    <!-- Left: Edit Phone & WhatsApp Form -->
    <div class="admin-panel">
      <div class="panel-title" style="display:flex;align-items:center;gap:8px">
        <span>✏️ Edit Phone &amp; WhatsApp Number</span>
      </div>
      <p class="small-note" style="margin-bottom:20px">
        Enter the active calling phone number and WhatsApp number for your shop.
      </p>

      <form onsubmit="saveContactSettings(event)">
        <div class="field">
          <label>📞 Direct Calling Phone Number (Users Call Button &amp; Header)</label>
          <input id="contact-phone-input" name="storePhone" value="${escapeHtml(phone)}" required placeholder="e.g. +91 9004245310" oninput="updateContactLivePreview()">
          <span class="small-note" style="margin-top:4px;display:block">Visitors will be prompted to call this number when clicking any Call button.</span>
        </div>

        <div class="field">
          <label>💬 WhatsApp Support Number</label>
          <input id="contact-wa-input" name="storeWhatsApp" value="${escapeHtml(wa)}" required placeholder="e.g. 9004245310 or +91 9004245310" oninput="updateContactLivePreview()">
          <span class="small-note" style="margin-top:4px;display:block">Visitors clicking WhatsApp chat will open a direct chat conversation with this number.</span>
        </div>

        <div class="field">
          <label>📝 Floating Popup Greeting / Message</label>
          <textarea id="contact-msg-input" name="popupMessage" rows="2" placeholder="e.g. 👋 Hi! Need help with your phone repair? Chat with us or call directly:" oninput="updateContactLivePreview()">${escapeHtml(popupCfg.message)}</textarea>
        </div>

        <div class="grid2">
          <div class="field">
            <label>🏷️ Popup Title</label>
            <input id="contact-title-input" name="popupTitle" value="${escapeHtml(popupCfg.title)}" placeholder="e.g. FixMyPhone Support" oninput="updateContactLivePreview()">
          </div>
          <div class="field">
            <label>💬 Pre-filled WhatsApp Text</label>
            <input id="contact-wamsg-input" name="popupWaText" value="${escapeHtml(popupCfg.waText)}" placeholder="e.g. Hi FixMyPhone, I need help with my phone" oninput="updateContactLivePreview()">
          </div>
        </div>

        <div class="panel-title" style="margin-top:24px;padding-top:18px;border-top:1px solid var(--gray-100);display:flex;align-items:center;gap:8px">
          <span>🌐 Social Media Profiles (Footer Links)</span>
        </div>
        <p class="small-note" style="margin-bottom:16px">
          Enter your Instagram, Facebook, YouTube, or LinkedIn usernames/links. These will update the social icons (f, in, ig, yt) in the website footer.
        </p>

        <div class="grid2">
          <div class="field">
            <label>📸 Instagram Username or Profile Link</label>
            <input id="contact-ig-input" name="instagram" value="${escapeHtml(s.instagram || '')}" placeholder="e.g. @fixmyphone or https://instagram.com/fixmyphone">
            <div style="margin-top:4px;display:flex;justify-content:flex-end">
              ${s.instagram ? `<a href="${formatSocialUrl('instagram', s.instagram)}" target="_blank" rel="noopener noreferrer" class="small-note" style="color:var(--blue);font-weight:600">📸 Test Instagram ↗</a>` : ''}
            </div>
          </div>

          <div class="field">
            <label>📘 Facebook Page / Profile Link</label>
            <input id="contact-fb-input" name="facebook" value="${escapeHtml(s.facebook || '')}" placeholder="e.g. fixmyphone or https://facebook.com/fixmyphone">
            <div style="margin-top:4px;display:flex;justify-content:flex-end">
              ${s.facebook ? `<a href="${formatSocialUrl('facebook', s.facebook)}" target="_blank" rel="noopener noreferrer" class="small-note" style="color:var(--blue);font-weight:600">📘 Test Facebook ↗</a>` : ''}
            </div>
          </div>
        </div>

        <div class="grid2">
          <div class="field">
            <label>📺 YouTube Channel or Handle</label>
            <input id="contact-yt-input" name="youtube" value="${escapeHtml(s.youtube || '')}" placeholder="e.g. @fixmyphone or https://youtube.com/@fixmyphone">
            <div style="margin-top:4px;display:flex;justify-content:flex-end">
              ${s.youtube ? `<a href="${formatSocialUrl('youtube', s.youtube)}" target="_blank" rel="noopener noreferrer" class="small-note" style="color:var(--blue);font-weight:600">📺 Test YouTube ↗</a>` : ''}
            </div>
          </div>

          <div class="field">
            <label>💼 LinkedIn Profile or Company Link</label>
            <input id="contact-li-input" name="linkedin" value="${escapeHtml(s.linkedin || '')}" placeholder="e.g. fixmyphone or https://linkedin.com/company/fixmyphone">
            <div style="margin-top:4px;display:flex;justify-content:flex-end">
              ${s.linkedin ? `<a href="${formatSocialUrl('linkedin', s.linkedin)}" target="_blank" rel="noopener noreferrer" class="small-note" style="color:var(--blue);font-weight:600">💼 Test LinkedIn ↗</a>` : ''}
            </div>
          </div>
        </div>

        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:10px">
          <button class="btn btn-primary" type="submit" style="flex:1;min-width:200px">💾 Save Phone, WhatsApp &amp; Social Links</button>
          <button class="btn btn-outline" type="button" onclick="resetContactDefaults()">🔄 Reset</button>
        </div>
      </form>
    </div>

    <!-- Right: Real-time Live Interactive Preview -->
    <div class="admin-panel" style="background:#f8fafc;border:1.5px solid var(--gray-100)">
      <div class="panel-title" style="display:flex;align-items:center;justify-content:space-between">
        <span>👁️ Live Visitor Preview</span>
        <span class="pill badge-blue" style="font-size:11px">Real-time</span>
      </div>
      <p class="small-note" style="margin-bottom:16px">This is how your contact widget appears to customers on the website:</p>

      <div id="admin-live-popup-box" class="card" style="padding:0;overflow:hidden;border:1px solid var(--gray-300);box-shadow:0 10px 25px rgba(0,0,0,.08);margin-bottom:16px">
        <div style="background:linear-gradient(135deg,#0b1220,#172442);padding:14px 16px;color:#fff;display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:10px;background:#25d366;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px">💬</div>
          <div>
            <div id="preview-popup-title" style="font-family:Poppins;font-size:14px;font-weight:700">${escapeHtml(popupCfg.title)}</div>
            <div style="font-size:11px;color:#86efac;display:flex;align-items:center;gap:4px">
              <span style="width:6px;height:6px;border-radius:50%;background:#25d366;display:inline-block"></span> Online • Instant Help
            </div>
          </div>
        </div>

        <div style="padding:16px">
          <div id="preview-popup-msg" style="background:#f1f5f9;border-left:3px solid #25D366;padding:10px 12px;border-radius:8px;font-size:12.5px;color:var(--navy);line-height:1.45;margin-bottom:14px">
            ${escapeHtml(popupCfg.message)}
          </div>

          <div style="display:flex;flex-direction:column;gap:8px">
            <a id="preview-wa-btn" href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;text-decoration:none">
              <span style="font-size:18px">💬</span>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:700">WhatsApp Chat</div>
                <div id="preview-wa-text" style="font-size:11.5px;opacity:.85">${escapeHtml(wa)} • Fast response</div>
              </div>
              <span>&rarr;</span>
            </a>

            <a id="preview-call-btn" href="tel:${phone}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:#eff6ff;border:1px solid #bfdbfe;color:#1e40af;text-decoration:none">
              <span style="font-size:18px">📞</span>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:700">Direct Call</div>
                <div id="preview-call-text" style="font-size:11.5px;opacity:.85">${escapeHtml(phone)} • Speak with technician</div>
              </div>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <div style="display:flex;justify-content:center;gap:10px">
        <a id="test-preview-call" href="tel:${phone}" class="btn btn-outline btn-sm" style="font-size:12px;background:#fff">📞 Test Call Link</a>
        <a id="test-preview-wa" href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size:12px;background:#fff;border-color:#25d366;color:#166534">💬 Test WhatsApp Link</a>
      </div>
    </div>
  </div>
  `;
}

function updateContactLivePreview() {
  const phone = (document.getElementById('contact-phone-input')?.value || '+91 9004245310').trim();
  const wa = (document.getElementById('contact-wa-input')?.value || '9004245310').trim();
  const title = (document.getElementById('contact-title-input')?.value || 'FixMyPhone Support').trim();
  const msg = (document.getElementById('contact-msg-input')?.value || '👋 Hi! Need help with your phone repair? Chat with us or call directly:').trim();
  const enabled = document.getElementById('contact-enabled-input')?.checked;

  const waClean = cleanWa(wa);

  const titleEl = document.getElementById('preview-popup-title');
  const msgEl = document.getElementById('preview-popup-msg');
  const waTextEl = document.getElementById('preview-wa-text');
  const callTextEl = document.getElementById('preview-call-text');
  const waBtn = document.getElementById('preview-wa-btn');
  const callBtn = document.getElementById('preview-call-btn');
  const testCall = document.getElementById('test-preview-call');
  const testWa = document.getElementById('test-preview-wa');
  const box = document.getElementById('admin-live-popup-box');

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = msg;
  if (waTextEl) waTextEl.textContent = `${wa} • Fast response`;
  if (callTextEl) callTextEl.textContent = `${phone} • Speak with technician`;
  if (waBtn) waBtn.href = `https://wa.me/${waClean}`;
  if (callBtn) callBtn.href = `tel:${phone}`;
  if (testCall) testCall.href = `tel:${phone}`;
  if (testWa) testWa.href = `https://wa.me/${waClean}`;
  if (box) box.style.opacity = enabled ? '1' : '0.5';
}

async function saveContactSettings(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const s = DB.settings = DB.settings || {};

  const phone = (f.get('storePhone') || '').trim();
  const wa = (f.get('storeWhatsApp') || '').trim();
  const msg = (f.get('popupMessage') || '').trim();
  const title = (f.get('popupTitle') || '').trim();
  const waText = (f.get('popupWaText') || '').trim();
  const enabled = f.get('popupEnabled') === 'on';

  const instagram = (f.get('instagram') || '').trim();
  const facebook = (f.get('facebook') || '').trim();
  const youtube = (f.get('youtube') || '').trim();
  const linkedin = (f.get('linkedin') || '').trim();

  s.storePhone = phone;
  s.popupPhone = phone;
  s.storeWhatsApp = wa;
  s.popupWhatsApp = wa;
  if (msg) s.popupMessage = msg;
  if (title) s.popupTitle = title;
  if (waText) s.popupWaText = waText;
  s.popupEnabled = enabled;

  s.instagram = instagram;
  s.facebook = facebook;
  s.youtube = youtube;
  s.linkedin = linkedin;

  // Sync to primary address if present
  if (Array.isArray(s.addresses) && s.addresses.length > 0) {
    const primary = s.addresses.find(a => a.isPrimary) || s.addresses[0];
    if (primary) {
      primary.phone = phone;
      primary.whatsapp = wa;
    }
  }

  try {
    await persist('settings');
    toast('✅ Phone number, WhatsApp & social links updated successfully!');
    render();
  } catch (err) {
    // Error toast is handled inside persist()
  }
}

async function resetContactDefaults() {
  if (!confirm('Reset contact numbers, widget settings and social links to default?')) return;
  const s = DB.settings = DB.settings || {};
  s.storePhone = '+91 9004245310';
  s.popupPhone = '+91 9004245310';
  s.storeWhatsApp = '9004245310';
  s.popupWhatsApp = '9004245310';
  s.popupMessage = '👋 Hi! Need help with your phone repair? Chat with us or call directly:';
  s.popupTitle = 'FixMyPhone Support';
  s.popupWaText = 'Hi FixMyPhone, I need help with my phone repair';
  s.popupEnabled = true;
  s.instagram = '';
  s.facebook = '';
  s.youtube = '';
  s.linkedin = '';

  await persist('settings');
  toast('Reset to default numbers and settings.');
  render();
}

/* ================= 2. ADDRESS & LOCATIONS ================= */

function adminAddressSection() {
  const s = DB.settings || {};
  const phone = getStorePhone();
  const wa = getStoreWhatsApp();
  const hours = s.hours || 'Mon–Sat: 10:00 AM – 8:00 PM, Sun: 11:00 AM – 5:00 PM';
  const mainAddress = s.storeAddress || 'Shop 14, Linking Road, Bandra West, Mumbai 400050';
  const addrs = (Array.isArray(s.addresses) && s.addresses.length > 0) ? s.addresses : [
    {
      id: 'addr_main',
      title: 'Main Service Centre (Bandra)',
      street: 'Shop 14, Linking Road',
      area: 'Bandra West',
      city: 'Mumbai',
      pincode: '400050',
      fullAddress: mainAddress,
      phone,
      whatsapp: wa,
      timing: hours,
      isPrimary: true
    }
  ];

  return `
  <div style="display:grid;grid-template-columns:1.1fr 1.2fr;gap:24px;align-items:start" class="grid2">
    <!-- Left: Primary Store Address Quick Editor -->
    <div class="admin-panel">
      <div class="panel-title" style="display:flex;align-items:center;gap:8px">
        <span>📍 Primary Store Address &amp; Location</span>
      </div>
      <p class="small-note" style="margin-bottom:18px">
        This is the main physical store address displayed on your website header, footer, invoices, and directions.
      </p>

      <form onsubmit="savePrimaryAddress(event)">
        <div class="field">
          <label>🏢 Full Store Address</label>
          <textarea name="storeAddress" rows="3" required placeholder="e.g. Shop 14, Linking Road, Bandra West, Mumbai 400050">${escapeHtml(mainAddress)}</textarea>
        </div>

        <div class="field">
          <label>⏰ Opening Timings / Business Hours</label>
          <input name="hours" value="${escapeHtml(hours)}" required placeholder="e.g. Mon–Sat: 10:00 AM – 8:00 PM, Sun: 11:00 AM – 5:00 PM">
        </div>

        <div class="field">
          <label>🗺️ Google Maps Search / Directions Link</label>
          <input name="mapEmbedUrl" value="${escapeHtml(s.mapEmbedUrl || 'https://maps.google.com/?q=' + encodeURIComponent(mainAddress))}" placeholder="e.g. https://maps.google.com/?q=Bandra+West+Mumbai">
          <div style="margin-top:6px;display:flex;justify-content:flex-end">
            <a href="https://maps.google.com/?q=${encodeURIComponent(mainAddress)}" target="_blank" rel="noopener noreferrer" class="small-note" style="color:var(--blue);font-weight:600">Open in Google Maps ↗</a>
          </div>
        </div>

        <button class="btn btn-primary" style="width:100%;margin-top:10px" type="submit">💾 Save Primary Store Address</button>
      </form>
    </div>

    <!-- Right: Store Branches & Locations Manager -->
    <div class="admin-panel">
      <div class="panel-title" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <span>📍 All Store Locations &amp; Branches (${addrs.length})</span>
        <button class="btn btn-primary btn-sm" onclick="openAddressModal()">+ Add New Location</button>
      </div>
      <p class="small-note" style="margin-bottom:18px">
        Manage all physical repair centres and drop-off points shown on your website's contact section.
      </p>

      <div style="display:flex;flex-direction:column;gap:14px">
        ${addrs.map(a => {
          const aPhone = a.phone || phone;
          const aWa = a.whatsapp || wa;
          const fullAddr = a.fullAddress || `${a.street || ''}, ${a.area || ''}, ${a.city || ''} ${a.pincode || ''}`.replace(/^, | ,/g, '');
          return `
          <div class="card" style="padding:16px 18px;border:1.5px solid ${a.isPrimary ? 'var(--blue)' : 'var(--gray-100)'};background:${a.isPrimary ? 'var(--ice)' : '#fff'}">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px">
              <div>
                <strong style="font-size:15px;color:var(--navy)">${escapeHtml(a.title || 'Service Location')}</strong>
                ${a.isPrimary ? '<span class="pill badge-blue" style="margin-left:8px;font-size:11px">⭐ Primary Store</span>' : ''}
              </div>
              <div style="display:flex;gap:6px">
                <button class="btn btn-outline btn-sm" style="padding:4px 10px;font-size:12px;background:#fff" onclick="openAddressModal('${a.id}')">Edit</button>
                ${!a.isPrimary ? `<button class="btn btn-danger btn-sm" style="padding:4px 10px;font-size:12px" onclick="deleteAddress('${a.id}')">Delete</button>` : ''}
              </div>
            </div>

            <p style="font-size:13.5px;color:var(--gray-700);line-height:1.5;margin:0 0 8px">
              🏢 ${escapeHtml(fullAddr)}
            </p>

            <div style="display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--gray-500);margin-bottom:10px">
              ${a.timing ? `<span>⏰ ${escapeHtml(a.timing)}</span>` : ''}
              ${aPhone ? `<span>📞 ${escapeHtml(aPhone)}</span>` : ''}
              ${aWa ? `<span>💬 WA: ${escapeHtml(aWa)}</span>` : ''}
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid rgba(0,0,0,.06)">
              ${!a.isPrimary ? `
                <button class="btn btn-outline btn-sm" style="font-size:11.5px;padding:3px 8px;background:#fff" onclick="setPrimaryAddress('${a.id}')">⭐ Set as Primary</button>
              ` : `
                <span class="small-note" style="color:var(--blue);font-weight:600">Default for website header &amp; footer</span>
              `}
              <a href="https://maps.google.com/?q=${encodeURIComponent(fullAddr)}" target="_blank" rel="noopener noreferrer" class="small-note" style="color:var(--navy);font-weight:600">View Map ↗</a>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    </div>
  </div>
  `;
}

async function savePrimaryAddress(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const s = DB.settings = DB.settings || {};

  const addr = (f.get('storeAddress') || '').trim();
  const hours = (f.get('hours') || '').trim();
  const mapUrl = (f.get('mapEmbedUrl') || '').trim();

  s.storeAddress = addr;
  s.hours = hours;
  s.mapEmbedUrl = mapUrl;

  if (Array.isArray(s.addresses) && s.addresses.length > 0) {
    const primary = s.addresses.find(a => a.isPrimary) || s.addresses[0];
    if (primary) {
      primary.fullAddress = addr;
      primary.timing = hours;
    }
  }

  try {
    await persist('settings');
    toast('✅ Primary store address and timings updated successfully!');
    render();
  } catch (err) {
    // Error toast is handled inside persist()
  }
}

function openAddressModal(addrId) {
  const s = DB.settings || {};
  const addrs = s.addresses || [];
  const existing = addrId ? addrs.find(x => x.id === addrId) : null;
  adminState.modal = {
    type: 'addressModal',
    addrId: addrId || null,
    data: existing ? { ...existing } : {
      title: '',
      street: '',
      area: '',
      city: '',
      pincode: '',
      fullAddress: '',
      phone: s.storePhone || '',
      whatsapp: s.storeWhatsApp || '',
      timing: s.hours || 'Mon–Sat: 10:00 AM – 8:00 PM',
      isPrimary: addrs.length === 0
    }
  };
  render();
}

function addressModalHtml() {
  const m = adminState.modal || {};
  const d = m.data || {};
  const isEdit = !!m.addrId;
  return `
  <div class="modal-bg" onclick="if(event.target===this)closeModal()">
    <div class="modal-box" style="max-width:540px">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <h3 style="margin:0 0 6px">${isEdit ? 'Edit Store Address' : 'Add New Store Address'}</h3>
      <p class="small-note" style="margin-bottom:18px">Add branch or store location details for customer drop-off and pickup.</p>
      
      <form onsubmit="return submitAddressForm(event)">
        <div class="field">
          <label>Branch / Location Title</label>
          <input name="title" required value="${escapeHtml(d.title || '')}" placeholder="e.g. Bandra Service Centre or Andheri Express Point">
        </div>
        <div class="grid2">
          <div class="field">
            <label>Shop / Building / Street</label>
            <input name="street" required value="${escapeHtml(d.street || '')}" placeholder="e.g. Shop 14, Linking Road">
          </div>
          <div class="field">
            <label>Area / Landmark</label>
            <input name="area" required value="${escapeHtml(d.area || '')}" placeholder="e.g. Bandra West">
          </div>
        </div>
        <div class="grid2">
          <div class="field">
            <label>City</label>
            <input name="city" required value="${escapeHtml(d.city || '')}" placeholder="e.g. Mumbai">
          </div>
          <div class="field">
            <label>Pincode</label>
            <input name="pincode" required value="${escapeHtml(d.pincode || '')}" placeholder="e.g. 400050">
          </div>
        </div>
        <div class="grid2">
          <div class="field">
            <label>Branch Phone (Optional)</label>
            <input name="phone" value="${escapeHtml(d.phone || '')}" placeholder="e.g. +91 9004245310">
          </div>
          <div class="field">
            <label>Branch WhatsApp (Optional)</label>
            <input name="whatsapp" value="${escapeHtml(d.whatsapp || '')}" placeholder="e.g. 9004245310">
          </div>
        </div>
        <div class="field">
          <label>Opening Timings for this Branch</label>
          <input name="timing" value="${escapeHtml(d.timing || '')}" placeholder="e.g. Mon–Sat: 10:00 AM – 8:00 PM">
        </div>
        <div class="field" style="display:flex;align-items:center;gap:10px;margin-top:10px">
          <input type="checkbox" id="isPrimaryAddr" name="isPrimary" ${d.isPrimary ? 'checked' : ''} style="width:auto;margin:0">
          <label for="isPrimaryAddr" style="margin:0;cursor:pointer">⭐ Set as Primary Store Address</label>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:14px" type="submit">${isEdit ? 'Update Address' : 'Add Store Address'}</button>
      </form>
    </div>
  </div>`;
}

async function submitAddressForm(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const m = adminState.modal || {};
  const s = DB.settings = DB.settings || {};
  s.addresses = s.addresses || [];

  const title = f.get('title').trim();
  const street = f.get('street').trim();
  const area = f.get('area').trim();
  const city = f.get('city').trim();
  const pincode = f.get('pincode').trim();
  const phone = f.get('phone').trim() || s.storePhone;
  const whatsapp = f.get('whatsapp').trim() || s.storeWhatsApp;
  const timing = f.get('timing').trim() || s.hours;
  const isPrimary = f.get('isPrimary') === 'on' || s.addresses.length === 0;

  const fullAddress = `${street}, ${area}, ${city} ${pincode}`.replace(/^, | ,/g, '');

  if (isPrimary) {
    s.addresses.forEach(a => { a.isPrimary = false; });
    s.storeAddress = fullAddress;
  }

  if (m.addrId) {
    const idx = s.addresses.findIndex(x => x.id === m.addrId);
    if (idx !== -1) {
      s.addresses[idx] = { ...s.addresses[idx], title, street, area, city, pincode, fullAddress, phone, whatsapp, timing, isPrimary };
    }
  } else {
    s.addresses.push({
      id: 'addr_' + uid(6),
      title, street, area, city, pincode, fullAddress, phone, whatsapp, timing, isPrimary
    });
  }

  if (!s.addresses.some(a => a.isPrimary) && s.addresses.length > 0) {
    s.addresses[0].isPrimary = true;
    s.storeAddress = s.addresses[0].fullAddress;
  }

  await persist('settings');
  toast(m.addrId ? '✅ Store address updated.' : '✅ New store address added.');
  closeModal();
  return false;
}

async function setPrimaryAddress(addrId) {
  const s = DB.settings;
  if (!s || !s.addresses) return;
  s.addresses.forEach(a => {
    if (a.id === addrId) {
      a.isPrimary = true;
      s.storeAddress = a.fullAddress;
    } else {
      a.isPrimary = false;
    }
  });
  await persist('settings');
  toast('⭐ Primary store location updated.');
  render();
}

async function deleteAddress(addrId) {
  const s = DB.settings;
  if (!s || !s.addresses) return;
  if (s.addresses.length <= 1) {
    toast('Cannot delete the only store address.');
    return;
  }
  if (!confirm('Are you sure you want to delete this store address?')) return;
  const target = s.addresses.find(x => x.id === addrId);
  s.addresses = s.addresses.filter(x => x.id !== addrId);
  if (target && target.isPrimary && s.addresses.length > 0) {
    s.addresses[0].isPrimary = true;
    s.storeAddress = s.addresses[0].fullAddress;
  }
  await persist('settings');
  toast('Store address deleted.');
  render();
}

/* ================= 3. PHONE BRANDS ================= */

function adminBrandsSection() {
  const brands = DB.brands || [];

  return `
  <div class="admin-panel">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px">
      <div>
        <h3 style="margin:0;font-family:Poppins;font-size:18px;color:var(--navy)">Phone Brands Database (${brands.length} Brands)</h3>
        <p class="small-note" style="margin:2px 0 0">Add and manage phone brands and models supported for repair on your website.</p>
      </div>
      <button class="btn btn-primary" onclick="openAddBrand()">+ Add Phone Brand</button>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:16px">
      ${brands.map(b => {
        const totalModels = b.series ? b.series.reduce((sum, s) => sum + (s.models ? s.models.length : 0), 0) : 0;
        return `
        <div class="card" style="padding:18px;border:1.5px solid var(--gray-100);display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
              <div>
                <h4 style="margin:0;font-size:17px;color:var(--navy);font-family:Poppins">${escapeHtml(b.name)}</h4>
                <div style="display:flex;gap:6px;align-items:center;margin-top:4px">
                  <span class="pill badge-gray" style="font-size:11px;text-transform:capitalize">${escapeHtml(b.tier || 'mid-range')}</span>
                  ${!b.enabled ? '<span class="pill badge-danger" style="font-size:11px">Disabled</span>' : '<span class="pill badge-ok" style="font-size:11px">Active</span>'}
                  <span class="small-note">${totalModels} models</span>
                </div>
              </div>

              <div style="display:flex;gap:4px">
                <button class="btn btn-outline btn-sm" style="padding:4px 8px;font-size:11.5px" onclick="toggleBrandEnabled('${b.id}')" title="Toggle Brand Active Status">
                  ${b.enabled ? 'Disable' : 'Enable'}
                </button>
                <button class="btn btn-danger btn-sm" style="padding:4px 8px;font-size:11.5px" onclick="deleteBrand('${b.id}')" title="Delete Brand">
                  ✕
                </button>
              </div>
            </div>

            <!-- Series & Models preview -->
            <div style="background:var(--gray-50);border-radius:10px;padding:10px;margin:10px 0;max-height:160px;overflow-y:auto">
              ${b.series && b.series.length > 0 ? b.series.map(s => `
                <div style="margin-bottom:8px">
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700;color:var(--gray-700)">
                    <span>📁 ${escapeHtml(s.name)}</span>
                    <button class="btn btn-outline btn-sm" style="padding:2px 6px;font-size:10.5px" onclick="openAddModel('${b.id}','${s.id}')">+ Model</button>
                  </div>
                  <div class="model-chip-row" style="margin-top:4px">
                    ${s.models && s.models.length > 0 ? s.models.slice(0, 8).map(m => `
                      <span class="model-chip" style="font-size:11.5px;padding:3px 8px">
                        ${escapeHtml(m.name)}
                        <a href="javascript:void(0)" onclick="deleteModel('${b.id}','${s.id}','${m.id}')" style="margin-left:4px;color:var(--danger)">✕</a>
                      </span>
                    `).join('') : '<span class="small-note">No models added yet</span>'}
                    ${s.models && s.models.length > 8 ? `<span class="small-note" style="align-self:center">+${s.models.length - 8} more</span>` : ''}
                  </div>
                </div>
              `).join('') : '<span class="small-note">No series added yet</span>'}
            </div>
          </div>

          <div style="display:flex;gap:6px;margin-top:8px">
            <button class="btn btn-outline btn-sm" style="flex:1;font-size:12px" onclick="openAddSeries('${b.id}')">+ Add Series</button>
          </div>
        </div>
        `;
      }).join('')}
    </div>
  </div>
  `;
}

function openAddBrand() {
  adminState.modal = { type: 'addBrand' };
  render();
}

function addBrandModalHtml() {
  return `
  <div class="modal-bg" onclick="if(event.target===this)closeModal()">
    <div class="modal-box" style="max-width:500px">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <span style="font-size:24px">📱</span>
        <h3 style="margin:0;font-family:Poppins;font-size:18px">Add New Phone Brand</h3>
      </div>
      <p class="small-note" style="margin-bottom:18px">
        Add a new smartphone brand to your repair database. Repair prices will be auto-generated based on the brand's pricing tier.
      </p>

      <form onsubmit="return submitAddBrand(event)">
        <div class="field">
          <label>Brand Name</label>
          <input name="name" required placeholder="e.g. Nothing, Google Pixel, Asus, Honor, etc.">
        </div>

        <div class="field">
          <label>Brand Tier</label>
          <select name="tier">
            <option value="premium">Premium (e.g. Apple, Samsung Flagships, Google Pixel)</option>
            <option value="mid" selected>Mid-range (e.g. OnePlus, Xiaomi, Vivo, Oppo, Realme)</option>
            <option value="budget">Budget (e.g. Infinix, Tecno, Lava, Nokia, Micromax)</option>
          </select>
        </div>

        <div class="field">
          <label>Initial Series Name (Optional)</label>
          <input name="seriesName" placeholder="e.g. Phone Series or Flagship Series">
        </div>

        <div class="field">
          <label>Initial Model Name (Optional)</label>
          <input name="modelName" placeholder="e.g. Nothing Phone 2">
        </div>

        <button class="btn btn-primary" style="width:100%;margin-top:10px" type="submit">➕ Add Brand to Catalogue</button>
      </form>
    </div>
  </div>
  `;
}

async function submitAddBrand(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const name = f.get('name').trim();
  if (!name) return false;

  const tier = f.get('tier') || 'mid';
  const brandId = slug(name) + '-' + uid(4);
  const seriesName = (f.get('seriesName') || 'Smartphones').trim();
  const modelName = (f.get('modelName') || '').trim();

  const seriesId = brandId + '__' + slug(seriesName) + '-' + uid(4);
  const seriesObj = {
    id: seriesId,
    name: seriesName,
    enabled: true,
    models: []
  };

  if (modelName) {
    const modelId = seriesId + '__' + slug(modelName) + '-' + uid(4);
    seriesObj.models.push({ id: modelId, name: modelName, enabled: true });

    // Auto-generate pricing across repair types for this model
    if (Array.isArray(SERVICES_SEED)) {
      DB.prices = DB.prices || [];
      SERVICES_SEED.forEach(svc => {
        const rnd = seededRand(brandId + '|' + modelId + '|' + svc.id)();
        const [lo, hi] = (svc.range && svc.range[tier]) ? svc.range[tier] : [1000, 3000];
        const price = Math.round((lo + rnd * (hi - lo)) / 10) * 10;
        DB.prices.push({
          id: uid(10),
          brandId,
          seriesId,
          modelId,
          serviceId: svc.id,
          price,
          time: svc.time,
          warrantyDays: svc.warrantyDays,
          enabled: true
        });
      });
      await persist('prices');
    }
  }

  DB.brands = DB.brands || [];
  DB.brands.push({
    id: brandId,
    name,
    tier,
    enabled: true,
    series: [seriesObj]
  });

  await persist('brands');
  toast(`✅ Brand "${name}" added successfully!`);
  closeModal();
  return false;
}

function openAddSeries(brandId) {
  adminState.modal = { type: 'addSeries', brandId };
  render();
}

function addSeriesModalHtml() {
  return `
  <div class="modal-bg" onclick="if(event.target===this)closeModal()">
    <div class="modal-box" style="max-width:460px">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <h3 style="margin:0 0 14px">Add Phone Series</h3>
      <form onsubmit="return submitAddSeries(event)">
        <div class="field">
          <label>Series Name</label>
          <input name="name" required placeholder="e.g. Galaxy S Series or Nord Series">
        </div>
        <button class="btn btn-primary" style="width:100%">Add Series</button>
      </form>
    </div>
  </div>`;
}

async function submitAddSeries(e) {
  e.preventDefault();
  const name = new FormData(e.target).get('name').trim();
  if (!name) return false;
  const b = DB.brands.find(x => x.id === adminState.modal.brandId);
  if (!b) return false;
  b.series = b.series || [];
  b.series.push({ id: b.id + '__' + slug(name) + '-' + uid(4), name, enabled: true, models: [] });
  await persist('brands');
  toast('Series added.');
  closeModal();
  return false;
}

function openAddModel(brandId, seriesId) {
  adminState.modal = { type: 'addModel', brandId, seriesId };
  render();
}

function addModelModalHtml() {
  return `
  <div class="modal-bg" onclick="if(event.target===this)closeModal()">
    <div class="modal-box" style="max-width:460px">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <h3 style="margin:0 0 14px">Add Phone Model</h3>
      <form onsubmit="return submitAddModel(event)">
        <div class="field">
          <label>Model Name</label>
          <input name="name" required placeholder="e.g. iPhone 17 Pro Max or Pixel 9 Pro">
        </div>
        <p class="small-note">Repair pricing for all 12 services will be generated automatically based on the brand tier.</p>
        <button class="btn btn-primary" style="width:100%">Add Model</button>
      </form>
    </div>
  </div>`;
}

async function submitAddModel(e) {
  e.preventDefault();
  const name = new FormData(e.target).get('name').trim();
  if (!name) return false;
  const b = DB.brands.find(x => x.id === adminState.modal.brandId);
  if (!b) return false;
  const s = b.series.find(x => x.id === adminState.modal.seriesId);
  if (!s) return false;
  const modelId = s.id + '__' + slug(name) + '-' + uid(4);
  s.models = s.models || [];
  s.models.push({ id: modelId, name, enabled: true });
  await persist('brands');

  if (Array.isArray(SERVICES_SEED)) {
    DB.prices = DB.prices || [];
    SERVICES_SEED.forEach(svc => {
      const rnd = seededRand(b.id + '|' + modelId + '|' + svc.id)();
      const [lo, hi] = (svc.range && svc.range[b.tier]) ? svc.range[b.tier] : [1000, 3000];
      const price = Math.round((lo + rnd * (hi - lo)) / 10) * 10;
      DB.prices.push({
        id: uid(10),
        brandId: b.id,
        seriesId: s.id,
        modelId,
        serviceId: svc.id,
        price,
        time: svc.time,
        warrantyDays: svc.warrantyDays,
        enabled: true
      });
    });
    await persist('prices');
  }

  toast(`Model "${name}" added.`);
  closeModal();
  return false;
}

async function toggleBrandEnabled(id) {
  const b = DB.brands.find(x => x.id === id);
  if (!b) return;
  b.enabled = !b.enabled;
  await persist('brands');
  render();
}

async function deleteBrand(id) {
  if (!confirm('Are you sure you want to delete this brand and all its models?')) return;
  DB.brands = DB.brands.filter(x => x.id !== id);
  if (Array.isArray(DB.prices)) {
    DB.prices = DB.prices.filter(p => p.brandId !== id);
    await persist('prices');
  }
  await persist('brands');
  toast('Brand deleted.');
  render();
}

async function deleteModel(bid, sid, mid) {
  if (!confirm('Delete this phone model?')) return;
  const b = DB.brands.find(x => x.id === bid);
  if (!b) return;
  const s = b.series.find(x => x.id === sid);
  if (!s) return;
  s.models = s.models.filter(x => x.id !== mid);
  if (Array.isArray(DB.prices)) {
    DB.prices = DB.prices.filter(p => p.modelId !== mid);
    await persist('prices');
  }
  await persist('brands');
  toast('Model deleted.');
  render();
}

/* ================= INVOICE VIEW (COMPATIBILITY) ================= */

function invoiceView(bookingId) {
  const b = (DB.bookings || []).find(x => x.id === bookingId);
  if (!b) return `<div class="wrap container-section" style="text-align:center;padding:60px 20px"><h3>Invoice not found.</h3><a href="#home" class="btn btn-outline" style="margin-top:14px">Back to Home</a></div>`;
  const labour = Math.round(b.price * 0.35), parts = b.price - labour;
  const warrantyEnd = b.warrantyDays > 0 ? addDays((b.statusHistory?.find(h => h.status === 'Completed') || { at: b.createdAt }).at, b.warrantyDays) : null;
  return `
  <section class="container-section">
    <div class="wrap" style="max-width:760px">
      <div id="invoice-actions" style="display:flex;justify-content:flex-end;gap:10px;margin-bottom:16px">
        <button class="btn btn-outline" onclick="history.back()">Back</button>
        <button class="btn btn-primary" onclick="window.print()">Print / Download</button>
      </div>
      <div class="invoice-sheet">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px">
          <div>
            <div class="logo" style="color:var(--navy);font-size:20px"><span class="mark">&#9881;&#65039;</span> FixMyPhone</div>
            <p class="small-note" style="margin-top:6px">
              ${escapeHtml(getStoreAddress())}<br>
              📞 ${escapeHtml(getStorePhone())} • 💬 WA: ${escapeHtml(getStoreWhatsApp())}
            </p>
          </div>
          <div style="text-align:right"><h2 style="margin:0">INVOICE</h2><p class="small-note">${b.repairId}<br>${fmtDate(todayISO())}</p></div>
        </div>
        <div class="grid2" style="margin-bottom:22px">
          <div><strong>Billed To</strong><p class="small-note">${escapeHtml(b.customer.name)}<br>${escapeHtml(b.customer.address || '')}, ${escapeHtml(b.customer.city || '')} ${escapeHtml(b.customer.pincode || '')}<br>${b.customer.mobile}</p></div>
          <div><strong>Device</strong><p class="small-note">${b.device.brandName} ${b.device.modelName}${b.device.variant ? (' • ' + escapeHtml(b.device.variant)) : ''}<br>${b.device.imei ? ('IMEI: ' + escapeHtml(b.device.imei)) : ''}</p></div>
        </div>
        <table class="data-table" style="margin-bottom:20px">
          <thead><tr><th>Description</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td data-label="Description">${b.serviceName} — Parts</td><td data-label="Amount">${fmtINR(parts)}</td></tr>
            <tr><td data-label="Description">${b.serviceName} — Labour</td><td data-label="Amount">${fmtINR(labour)}</td></tr>
            <tr><td data-label="Description"><strong>Total</strong></td><td data-label="Amount"><strong>${fmtINR(b.price)}</strong></td></tr>
          </tbody>
        </table>
        <div class="grid2">
          <div class="sum-row"><span class="k">Payment Status</span><span class="v">${b.payment.status}</span></div>
          <div class="sum-row"><span class="k">Payment Method</span><span class="v">${b.payment.method}</span></div>
          <div class="sum-row"><span class="k">Warranty</span><span class="v">${b.warrantyDays > 0 ? (b.warrantyDays + ' days') : 'Not applicable'}</span></div>
          ${warrantyEnd ? `<div class="sum-row"><span class="k">Warranty Valid Until</span><span class="v">${fmtDate(warrantyEnd)}</span></div>` : ''}
        </div>
        <p class="small-note" style="margin-top:24px">Thank you for choosing FixMyPhone. This is a system-generated invoice.</p>
      </div>
    </div>
  </section>`;
}
