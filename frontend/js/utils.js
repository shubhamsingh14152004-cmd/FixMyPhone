function uid(n){n=n||8;return Array.from({length:n},()=>'abcdefghjkmnpqrstuvwxyz0123456789'[Math.floor(Math.random()*33)]).join('');}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}
function fmtINR(n){return '₹'+Math.round(n).toLocaleString('en-IN');}
function todayISO(){return new Date().toISOString().slice(0,10);}
function addDays(iso,d){const dt=new Date(iso);dt.setDate(dt.getDate()+d);return dt.toISOString().slice(0,10);}
function fmtDate(iso){if(!iso)return '—';const d=new Date(iso);return d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});}
function hashStr(s){let h=0;for(let i=0;i<s.length;i++){h=(h<<5)-h+s.charCodeAt(i);h|=0;}return Math.abs(h);}
function seededRand(seedStr){let seed=hashStr(seedStr)||1;return function(){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;seed|=0;return ((seed>>>0)%10000)/10000;};}
function escapeHtml(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function cleanWa(num){
  if(!num) return '919004245310';
  let cleaned = String(num).replace(/[^0-9]/g, '');
  if(cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = '91' + cleaned.slice(1);
  } else if(cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned || '919004245310';
}
function getStoreSettings(){
  if (typeof DB !== 'undefined' && DB && DB.settings) return DB.settings;
  if (typeof window !== 'undefined' && window.DB && window.DB.settings) return window.DB.settings;
  return {};
}
function getStorePhone(){
  const s = getStoreSettings();
  return (s && (s.storePhone || s.popupPhone)) || '+91 9004245310';
}
function getStoreWhatsApp(){
  const s = getStoreSettings();
  return (s && (s.storeWhatsApp || s.popupWhatsApp)) || '9004245310';
}
function getStoreAddress(){
  const s = getStoreSettings();
  return (s && s.storeAddress) || 'Shop 14, Linking Road, Bandra West, Mumbai 400050';
}
function getPopupSettings(){
  const s = getStoreSettings();
  return {
    enabled: s.popupEnabled !== false,
    phone: s.storePhone || s.popupPhone || '+91 9004245310',
    whatsapp: s.storeWhatsApp || s.popupWhatsApp || '9004245310',
    title: s.popupTitle || (s.storeName ? `${s.storeName} Support` : 'FixMyPhone Support'),
    status: s.popupStatus || 'Online • Instant Help',
    message: s.popupMessage || '👋 Hi! Need help with your phone repair? Chat with us or call directly:',
    waText: s.popupWaText || 'Hi FixMyPhone, I need help with my phone repair',
    badgeText: s.popupBadgeText || '💬 Need help? Chat or Call'
  };
}
function formatSocialUrl(platform, input) {
  if (!input) return '#';
  const val = String(input).trim();
  if (!val) return '#';
  if (val.startsWith('http://') || val.startsWith('https://')) return val;
  if (platform === 'facebook') return `https://facebook.com/${val.replace(/^@/, '')}`;
  if (platform === 'instagram') return `https://instagram.com/${val.replace(/^@/, '')}`;
  if (platform === 'youtube') return `https://youtube.com/${val.startsWith('@') ? val : '@' + val}`;
  if (platform === 'linkedin') return `https://linkedin.com/in/${val.replace(/^@/, '')}`;
  return val;
}
function getSocialLinks() {
  const s = getStoreSettings();
  return {
    facebook: formatSocialUrl('facebook', s.facebook),
    instagram: formatSocialUrl('instagram', s.instagram),
    youtube: formatSocialUrl('youtube', s.youtube),
    linkedin: formatSocialUrl('linkedin', s.linkedin),
    rawFacebook: s.facebook || '',
    rawInstagram: s.instagram || '',
    rawYoutube: s.youtube || '',
    rawLinkedin: s.linkedin || ''
  };
}

