/* ================= LOGIN (customer/admin chooser) ================= */
function loginView(){
  return `
  <section class="page-hero"><div class="wrap"><div class="breadcrumb">Home / Login</div><h1>Sign in</h1><p>Choose how you'd like to continue.</p></div></section>
  <section class="container-section"><div class="wrap" style="max-width:820px">
    <div class="grid2" style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div class="card" style="padding:26px">
        <h3 style="margin:0 0 8px">Customer</h3>
        <p class="small-note" style="margin:0 0 18px">View your bookings, status and invoices.</p>
        <a href="#dashboard" class="btn btn-primary" style="width:100%">Go to My Repairs</a>
      </div>
      <div class="card" style="padding:26px">
        <h3 style="margin:0 0 8px">Admin</h3>
        <p class="small-note" style="margin:0 0 18px">Edit phone numbers, WhatsApp, store address, locations, and add phone brands.</p>
        <form onsubmit="adminLogin(event)">
          <div class="field"><label>Email</label><input name="email" value="admin@fixmyphone.com"></div>
          <div class="field"><label>Password</label><input name="password" type="password" value="Admin@123"></div>
          <button class="btn btn-primary" style="width:100%" type="submit">Admin Login</button>
          <p class="small-note" style="margin-top:10px">Demo credentials are pre-filled (set in backend/.env). Signing in gets a real JWT from the API — it's just a single shared admin account rather than per-user accounts.</p>
        </form>
      </div>
    </div>
  </div></section>`;
}
async function adminLogin(e){
  e.preventDefault();
  const f=new FormData(e.target);
  try{
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email:f.get('email'), password:f.get('password') })
    });
    if(!res.ok){
      const err = await res.json().catch(()=>({error:'Invalid credentials.'}));
      toast(err.error || 'Invalid credentials.');
      return;
    }
    const data = await res.json();
    ADMIN_TOKEN = data.token;
    ADMIN_SESSION = true;
    if (typeof localStorage !== 'undefined') localStorage.setItem('fixmyphone_admin_token', data.token);
    toast('✅ Logged in successfully.');
    nav('#admin/contact');
  }catch(err){
    toast('Could not reach the server. Is the backend running?');
  }
}
function adminLogout(){
  ADMIN_SESSION = false;
  ADMIN_TOKEN = null;
  if (typeof localStorage !== 'undefined') localStorage.removeItem('fixmyphone_admin_token');
  toast('Logged out.');
  nav('#home');
}
