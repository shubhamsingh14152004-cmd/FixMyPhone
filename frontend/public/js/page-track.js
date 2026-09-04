/* ================= TRACK REPAIR ================= */
const trackState={query:'',result:null,searched:false};
function trackView(){
  return `
  <section class="page-hero"><div class="wrap"><div class="breadcrumb">Home / Track Repair</div><h1>Track Your Repair</h1><p>Enter your Repair ID or mobile number to see live status.</p></div></section>
  <section class="container-section" style="padding-top:44px">
    <div class="wrap" style="max-width:640px">
      <div class="card" style="padding:26px;margin-bottom:24px">
        <div class="grid2" style="align-items:end">
          <div class="field" style="margin-bottom:0"><label>Repair ID or Mobile Number</label><input placeholder="e.g. MR-2026-10245 or 9876543210" value="${escapeHtml(trackState.query)}" oninput="trackState.query=this.value" onkeydown="if(event.key==='Enter')doTrackSearch()"></div>
          <button class="btn btn-primary" onclick="doTrackSearch()" style="height:44px">Track Repair</button>
        </div>
      </div>
      ${trackState.searched ? trackResultBlock() : ''}
    </div>
  </section>`;
}
function doTrackSearch(){
  const q=(trackState.query||'').trim().toLowerCase();
  trackState.searched=true;
  trackState.result = DB.bookings.find(b=> b.repairId.toLowerCase()===q || b.customer.mobile===q ) || null;
  render();
}
function trackResultBlock(){
  const bk=trackState.result;
  if(!bk) return `<div class="card" style="padding:26px;text-align:center;color:var(--gray-500)">No repair found for "${escapeHtml(trackState.query)}". Check your Repair ID or mobile number.</div>`;
  const warrantyEnd = (bk.status==='Completed' && bk.warrantyDays>0) ? addDays(bk.statusHistory.find(h=>h.status==='Completed').at, bk.warrantyDays) : null;
  return `
  <div class="card" style="padding:26px">
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:20px">
      <div>
        <div style="font-family:Poppins;font-weight:700;font-size:19px">${bk.repairId}</div>
        <div class="small-note">${bk.device.brandName} ${bk.device.modelName} • ${bk.serviceName}</div>
      </div>
      <span class="pill ${bk.cancelled?'badge-danger':(bk.status==='Completed'?'badge-ok':'badge-blue')}">${bk.cancelled?'Cancelled':bk.status}</span>
    </div>
    ${statusTimelineHtml(bk)}
    <div style="margin-top:22px;border-top:1px solid var(--gray-100);padding-top:18px">
      <div class="sum-row"><span class="k">Customer</span><span class="v">${escapeHtml(bk.customer.name)}</span></div>
      <div class="sum-row"><span class="k">Technician</span><span class="v">${bk.technicianName||'Not yet assigned'}</span></div>
      <div class="sum-row"><span class="k">Estimated Price</span><span class="v">${fmtINR(bk.price)}</span></div>
      <div class="sum-row"><span class="k">Payment Status</span><span class="v">${bk.payment.status}</span></div>
      <div class="sum-row"><span class="k">Expected Completion</span><span class="v">${fmtDate(addDays(bk.createdAt,3))}</span></div>
      ${warrantyEnd?`<div class="sum-row"><span class="k">Warranty Valid Until</span><span class="v">${fmtDate(warrantyEnd)}</span></div>`:''}
    </div>
  </div>`;
}
function statusTimelineHtml(bk){
  if(bk.cancelled){
    return `<div class="pill badge-danger">This repair booking was cancelled.</div>`;
  }
  const curIdx = STATUS_STAGES.indexOf(bk.status);
  return `<ul class="timeline">
    ${STATUS_STAGES.map((s,i)=>{
      const hist=bk.statusHistory.find(h=>h.status===s);
      const cls = i<curIdx?'done':(i===curIdx?'current':'');
      return `<li class="${cls}"><div class="dot">${i<curIdx?'&#10003;':(i===curIdx?'&#9679;':'&#9675;')}</div><div><div class="tt">${s}</div><div class="ts">${hist?fmtDate(hist.at):'Pending'}</div></div></li>`;
    }).join('')}
  </ul>`;
}
