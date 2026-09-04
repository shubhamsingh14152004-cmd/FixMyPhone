/* ================= MASTER RENDER ================= */
function render(){
  const hash = location.hash || '#home';
  let html='';
  let showHeader=true, showFooter=true;

  if(hash.startsWith('#admin')){
    html = adminView(hash); showHeader=false; showFooter=false;
  } else if(hash.startsWith('#invoice/')){
    html = invoiceView(hash.split('/')[1]); showHeader=true; showFooter=false;
  } else if(hash==='#book'){
    html = bookingView();
  } else if(hash==='#track'){
    html = trackView();
  } else if(hash==='#dashboard'){
    html = dashboardView();
  } else if(hash==='#login'){
    html = loginView();
  } else if(hash==='#services' || hash==='#brands' || hash==='#about' || hash==='#contact' || hash==='#faq' || hash==='#home' || hash===''){
    html = homeView();
  } else {
    html = homeView();
  }

  const app=document.getElementById('app');
  app.innerHTML = (showHeader?headerHtml(navActiveKey(hash)):'') + html + (showFooter?footerHtml():'');
  document.getElementById('mobile-drawer').style.display='none';

  if(['#services','#brands','#about','#contact','#faq'].includes(hash)){
    setTimeout(()=>{ const el=document.getElementById(hash.slice(1)); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); },30);
  }
}
function navActiveKey(hash){
  if(hash.startsWith('#book'))return '#book';
  if(hash.startsWith('#track'))return '#track';
  if(['#services','#brands','#about','#contact'].includes(hash)) return hash;
  return '#home';
}

/* ================= INIT ================= */
(async function init(){
  try{
    await initData();
    document.getElementById('loading').style.display='none';
    document.getElementById('app').style.display='block';
    render();
  }catch(e){
    console.error('Initialization error:', e);
    const msg=document.getElementById('loading-msg');
    if (msg) {
      msg.innerHTML='Unable to load services database. Please verify the API server is running.<br><br><button onclick="location.reload()" class="btn btn-primary" style="margin-top:12px;padding:8px 20px;cursor:pointer;background:#2563eb;color:#fff;border:none;border-radius:6px;font-weight:600">Retry</button>';
      msg.style.opacity='1';
      msg.style.color='#ef4444';
    }
  }
})();
