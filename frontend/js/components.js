/* ================= HEADER / FOOTER ================= */
function headerHtml(active){
  const links=[['#home','Home'],['#services','Services'],['#brands','Brands'],['#about','About Us'],['#contact','Contact']];
  const phone = getStorePhone();
  const wa = getStoreWhatsApp();
  const waClean = cleanWa(wa);
  return `
  <header id="site-header">
    <div class="wrap nav-row">
      <a href="#home" class="logo"><span class="mark">&#9881;&#65039;</span> FixMyPhone</a>
      <nav class="nav-links">
        ${links.map(l=>`<a href="${l[0]}" class="${active===l[0]?'active':''}">${l[1]}</a>`).join('')}
      </nav>
      <div class="nav-cta">
        <a href="https://wa.me/${waClean}" target="_blank" rel="noopener noreferrer" class="btn-icon-wa" title="WhatsApp Support">💬 WhatsApp</a>
        <a href="tel:${phone}" class="btn-icon-call" title="Call Store">📞 Call</a>
        <a href="#contact" class="btn btn-primary btn-sm">Contact Us</a>
        <button class="hamburger" onclick="toggleDrawer(true)"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div id="mobile-drawer">
    <div class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <span class="logo">FixMyPhone</span>
        <button onclick="toggleDrawer(false)" style="background:none;border:none;color:#fff;font-size:22px">&times;</button>
      </div>
      ${links.map(l=>`<a href="${l[0]}" onclick="toggleDrawer(false)">${l[1]}</a>`).join('')}
      <div style="margin-top:14px;display:flex;flex-direction:column;gap:10px">
        <a href="tel:${phone}" onclick="toggleDrawer(false)" style="display:flex;align-items:center;gap:10px;color:#93c5fd;font-weight:600;border:none;padding:8px 6px">&#128222; Call ${escapeHtml(phone)}</a>
        <a href="https://wa.me/${waClean}" target="_blank" onclick="toggleDrawer(false)" style="display:flex;align-items:center;gap:10px;color:#25D366;font-weight:600;border:none;padding:8px 6px">💬 WhatsApp ${escapeHtml(wa)}</a>
      </div>
    </div>
  </div>`;
}
function toggleDrawer(open){ document.getElementById('mobile-drawer').style.display = open?'block':'none'; }

function footerHtml(){
  const phone = getStorePhone();
  const wa = getStoreWhatsApp();
  const waClean = cleanWa(wa);
  const addr = getStoreAddress();
  const social = getSocialLinks();
  return `
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="logo" style="margin-bottom:14px">${'<span class="mark">&#9881;&#65039;</span>'} FixMyPhone</div>
          <p style="font-size:13.5px;line-height:1.7;color:rgba(255,255,255,.55);max-width:280px">Trusted mobile phone repair for every major iOS and Android brand — transparent pricing, genuine parts and technicians who know your device.</p>
          <div class="social-row" style="margin-top:18px">
            <a href="${social.facebook}" target="_blank" rel="noopener noreferrer" title="${social.rawFacebook ? 'Facebook: ' + escapeHtml(social.rawFacebook) : 'Facebook'}" ${social.rawFacebook ? '' : 'style="opacity:.4"'}>f</a>
            <a href="${social.linkedin}" target="_blank" rel="noopener noreferrer" title="${social.rawLinkedin ? 'LinkedIn: ' + escapeHtml(social.rawLinkedin) : 'LinkedIn'}" ${social.rawLinkedin ? '' : 'style="opacity:.4"'}>in</a>
            <a href="${social.instagram}" target="_blank" rel="noopener noreferrer" title="${social.rawInstagram ? 'Instagram: ' + escapeHtml(social.rawInstagram) : 'Instagram'}" ${social.rawInstagram ? '' : 'style="opacity:.4"'}>ig</a>
            <a href="${social.youtube}" target="_blank" rel="noopener noreferrer" title="${social.rawYoutube ? 'YouTube: ' + escapeHtml(social.rawYoutube) : 'YouTube'}" ${social.rawYoutube ? '' : 'style="opacity:.4"'}>yt</a>
          </div>
        </div>
        <div><h5>Company</h5>
          <a href="#about">About Us</a><a href="#contact">Contact & Locations</a><a href="#faq">FAQ</a><a href="#login">Admin Login</a>
        </div>
        <div><h5>Services</h5>
          <a href="#services">Screen Replacement</a><a href="#services">Battery Replacement</a><a href="#services">Water Damage Repair</a><a href="#services">Camera & Hardware</a>
        </div>
        <div><h5>Get Help</h5>
          <a href="#services">Our Services</a><a href="#contact">Store Locations</a><a href="https://wa.me/${waClean}" target="_blank">WhatsApp Support</a><a href="tel:${phone}">${escapeHtml(phone)}</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} FixMyPhone. All rights reserved. • ${escapeHtml(addr)}</span>
        <span>Made for demonstration • Brand name and logo are placeholders</span>
      </div>
    </div>
  </footer>
  ${floatingContactWidget()}`;
}

function floatingContactWidget(){
  const cfg = getPopupSettings();
  if(!cfg.enabled) return '';
  const phone = cfg.phone;
  const wa = cfg.whatsapp;
  const waClean = cleanWa(wa);
  const waEncodedMsg = encodeURIComponent(cfg.waText || 'Hi FixMyPhone, I need help with my phone repair');
  return `
  <div id="floating-contact-container">
    <!-- Popup Card -->
    <div id="floating-contact-popup" class="floating-contact-popup" style="display:none">
      <div class="fcp-header">
        <div class="fcp-header-info">
          <div class="fcp-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.477-.15-.678.15-.201.3-.777.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.783-1.674-2.084-.175-.3-.019-.462.132-.612.135-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.678-1.636-.928-2.24-.244-.588-.492-.508-.678-.518l-.578-.01c-.201 0-.527.075-.802.376s-1.054 1.029-1.054 2.508c0 1.48 1.079 2.909 1.23 3.109.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.723.23 1.38.197 1.9.12.58-.086 1.781-.728 2.032-1.431.25-.702.25-1.304.175-1.43-.075-.126-.276-.201-.577-.352zM12.04 2c-5.522 0-10 4.478-10 10 0 1.77.463 3.498 1.343 5.025l-1.423 5.2 5.333-1.398c1.474.803 3.136 1.228 4.747 1.228 5.522 0 10-4.478 10-10s-4.478-10-10-10zm0 18.275c-1.503 0-2.977-.404-4.264-1.168l-.305-.181-3.167.831.846-3.088-.198-.316c-.84-1.336-1.287-2.887-1.287-4.478 0-4.562 3.713-8.275 8.275-8.275 4.563 0 8.275 3.713 8.275 8.275 0 4.563-3.712 8.275-8.275 8.275z"/></svg>
          </div>
          <div>
            <div class="fcp-title">${escapeHtml(cfg.title)}</div>
            <div class="fcp-status"><span class="fcp-status-dot"></span> ${escapeHtml(cfg.status)}</div>
          </div>
        </div>
        <button class="fcp-close-btn" onclick="toggleContactPopup(false)" title="Close">&times;</button>
      </div>
      <div class="fcp-body">
        <div class="fcp-msg">
          ${escapeHtml(cfg.message)}
        </div>
        <div class="fcp-actions">
          <a href="https://wa.me/${waClean}?text=${waEncodedMsg}" target="_blank" rel="noopener noreferrer" class="fcp-action-btn fcp-wa">
            <div class="fcp-action-icon fcp-icon-wa">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.477-.15-.678.15-.201.3-.777.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.783-1.674-2.084-.175-.3-.019-.462.132-.612.135-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.678-1.636-.928-2.24-.244-.588-.492-.508-.678-.518l-.578-.01c-.201 0-.527.075-.802.376s-1.054 1.029-1.054 2.508c0 1.48 1.079 2.909 1.23 3.109.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.723.23 1.38.197 1.9.12.58-.086 1.781-.728 2.032-1.431.25-.702.25-1.304.175-1.43-.075-.126-.276-.201-.577-.352zM12.04 2c-5.522 0-10 4.478-10 10 0 1.77.463 3.498 1.343 5.025l-1.423 5.2 5.333-1.398c1.474.803 3.136 1.228 4.747 1.228 5.522 0 10-4.478 10-10s-4.478-10-10-10zm0 18.275c-1.503 0-2.977-.404-4.264-1.168l-.305-.181-3.167.831.846-3.088-.198-.316c-.84-1.336-1.287-2.887-1.287-4.478 0-4.562 3.713-8.275 8.275-8.275 4.563 0 8.275 3.713 8.275 8.275 0 4.563-3.712 8.275-8.275 8.275z"/></svg>
            </div>
            <div class="fcp-action-text">
              <div class="fcp-action-name">WhatsApp Chat</div>
              <div class="fcp-action-desc">${escapeHtml(wa)} &bull; Fast response</div>
            </div>
            <div class="fcp-action-arrow">&rarr;</div>
          </a>
          <a href="tel:${phone}" class="fcp-action-btn fcp-call">
            <div class="fcp-action-icon fcp-icon-call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div class="fcp-action-text">
              <div class="fcp-action-name">Direct Call</div>
              <div class="fcp-action-desc">${escapeHtml(phone)} &bull; Speak to technician</div>
            </div>
            <div class="fcp-action-arrow">&rarr;</div>
          </a>
        </div>
        <div class="fcp-footer-note">
          <span>Have questions?</span>
          <a href="#contact" onclick="toggleContactPopup(false)">Store Address &rarr;</a>
        </div>
      </div>
    </div>

    <!-- Floating Launcher Button -->
    <div class="fcp-trigger-wrapper">
      <div class="fcp-pill-badge" id="fcp-pill-badge" onclick="toggleContactPopup()">
        <span>${escapeHtml(cfg.badgeText)}</span>
      </div>
      <button id="fcp-trigger-btn" class="fcp-trigger-btn" onclick="toggleContactPopup()" title="Contact & WhatsApp" aria-label="Contact and WhatsApp Support">
        <div class="fcp-btn-pulse"></div>
        <div class="fcp-icon-wrap fcp-icon-chat">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.477-.15-.678.15-.201.3-.777.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.783-1.674-2.084-.175-.3-.019-.462.132-.612.135-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.678-1.636-.928-2.24-.244-.588-.492-.508-.678-.518l-.578-.01c-.201 0-.527.075-.802.376s-1.054 1.029-1.054 2.508c0 1.48 1.079 2.909 1.23 3.109.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.723.23 1.38.197 1.9.12.58-.086 1.781-.728 2.032-1.431.25-.702.25-1.304.175-1.43-.075-.126-.276-.201-.577-.352zM12.04 2c-5.522 0-10 4.478-10 10 0 1.77.463 3.498 1.343 5.025l-1.423 5.2 5.333-1.398c1.474.803 3.136 1.228 4.747 1.228 5.522 0 10-4.478 10-10s-4.478-10-10-10zm0 18.275c-1.503 0-2.977-.404-4.264-1.168l-.305-.181-3.167.831.846-3.088-.198-.316c-.84-1.336-1.287-2.887-1.287-4.478 0-4.562 3.713-8.275 8.275-8.275 4.563 0 8.275 3.713 8.275 8.275 0 4.563-3.712 8.275-8.275 8.275z"/></svg>
        </div>
        <div class="fcp-icon-wrap fcp-icon-close" style="display:none">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <span class="fcp-unread-dot"></span>
      </button>
    </div>
  </div>`;
}

function toggleContactPopup(open){
  const popup = document.getElementById('floating-contact-popup');
  const chatIcon = document.querySelector('.fcp-icon-chat');
  const closeIcon = document.querySelector('.fcp-icon-close');
  const badge = document.getElementById('fcp-pill-badge');
  if(!popup) return;
  const isCurrentlyOpen = popup.style.display !== 'none' && popup.classList.contains('active');
  const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;
  
  if(shouldOpen){
    popup.style.display = 'block';
    void popup.offsetWidth;
    popup.classList.add('active');
    if(chatIcon) chatIcon.style.display = 'none';
    if(closeIcon) closeIcon.style.display = 'flex';
    if(badge) badge.style.display = 'none';
  } else {
    popup.classList.remove('active');
    setTimeout(() => {
      if(!popup.classList.contains('active')) popup.style.display = 'none';
    }, 220);
    if(chatIcon) chatIcon.style.display = 'flex';
    if(closeIcon) closeIcon.style.display = 'none';
  }
}
