/* ---------------- toast ---------------- */
function toast(msg){
  const wrap=document.getElementById('toast-wrap');
  const el=document.createElement('div'); el.className='toast'; el.textContent=msg;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); },2800);
}

/* ---------------- routing ---------------- */
window.addEventListener('hashchange', function(){
  if (typeof render === 'function') render();
});
function nav(hash){ location.hash = hash; window.scrollTo({top:0,behavior:'auto'}); }

/* ---------------- calculator state ---------------- */
const calcState = { brandId:null, modelId:null, serviceId:null };

