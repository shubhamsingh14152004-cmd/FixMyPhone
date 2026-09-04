/* ================= CUSTOMER DASHBOARD ================= */
const dashState={mobile:'',loggedIn:false};
function dashboardView(){
  if(!dashState.loggedIn) return `
  <section class="page-hero"><div class="wrap"><div class="breadcrumb">Home / My Account</div><h1>My Repairs</h1><p>Enter the mobile number you booked with to view your repairs.</p></div></section>
  <section class="container-section"><div class="wrap" style="max-width:420px">
    <div class="card" style="padding:26px">
      <div class="field"><label>Mobile Number</label><input placeholder="9876543210" value="${escapeHtml(dashState.mobile)}" oninput="dashState.mobile=this.value"></div>
      <button class="btn btn-primary" style="width:100%" onclick="dashState.loggedIn=true;render();">View My Repairs</button>
    </div>
  </div></section>`;

  const list = DB.bookings.filter(b=>b.customer.mobile===dashState.mobile.trim());
  return `
  <section class="page-hero"><div class="wrap"><div class="breadcrumb">Home / My Account</div><h1>Welcome back${list[0]?', '+escapeHtml(list[0].customer.name):''}</h1><p>${list.length} repair${list.length===1?'':'s'} on file for ${escapeHtml(dashState.mobile)}</p></div></section>
  <section class="container-section">
    <div class="wrap">
      <div style="margin-bottom:18px"><button class="btn btn-outline btn-sm" onclick="dashState.loggedIn=false;render();">Switch account</button></div>
      ${list.length===0? `<div class="card" style="padding:26px;text-align:center;color:var(--gray-500)">No repairs found for this number. <a href="#book" style="color:var(--blue)">Book your first repair</a>.</div>`:''}
      <div style="display:grid;gap:16px">
      ${list.map(bk=>`
        <div class="card" style="padding:20px">
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px">
            <div><strong>${bk.repairId}</strong> <span class="small-note">• ${bk.device.brandName} ${bk.device.modelName}</span></div>
            <span class="pill ${bk.cancelled?'badge-danger':(bk.status==='Completed'?'badge-ok':'badge-blue')}">${bk.cancelled?'Cancelled':bk.status}</span>
          </div>
          <div class="small-note" style="margin-bottom:10px">${bk.serviceName} • Booked ${fmtDate(bk.createdAt)} • ${fmtINR(bk.price)} • Payment: ${bk.payment.status}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-outline btn-sm" onclick="trackState.query='${bk.repairId}';nav('#track');setTimeout(doTrackSearch,50)">View Status</button>
            ${bk.status==='Completed'?`<button class="btn btn-outline btn-sm" onclick="openInvoice('${bk.id}')">View Invoice</button>`:''}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}
