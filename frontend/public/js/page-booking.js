/* ================= BOOKING ================= */
const bookingState = {
  step:1,
  customer:{name:'',mobile:'',email:'',address:'',city:'',pincode:''},
  device:{brandId:null,modelId:null,variant:'',imei:''},
  serviceId:null,
  problemDesc:'',
  images:[],
  appointment:{type:'store',date:todayISO(),time:'11:00 AM'},
  lastBooking:null
};
function bookingView(){
  if(bookingState.lastBooking) return bookingConfirmation(bookingState.lastBooking);
  const steps=['Device','Repair','Details','Appointment','Confirm'];
  return `
  <section class="page-hero"><div class="wrap"><div class="breadcrumb">Home / Book Repair</div><h1>Book a Repair</h1><p>Tell us about your device and the issue — get an instant price and pick a time that suits you.</p></div></section>
  <section class="container-section" style="padding-top:44px">
    <div class="wrap book-shell">
      <div>
        <div class="progress-row">
          ${steps.map((s,i)=>`<div class="progress-dot ${bookingState.step===i+1?'active':(bookingState.step>i+1?'done':'')}"><div class="c">${bookingState.step>i+1?'&#10003;':i+1}</div><div class="l">${s}</div></div>`).join('')}
        </div>
        <div class="card" style="padding:28px">${bookingStepContent()}</div>
      </div>
      <div class="summary-card card" style="padding:22px">
        <h4 style="margin:0 0 14px;font-size:15px">Booking Summary</h4>
        ${bookingSummaryRows()}
      </div>
    </div>
  </section>`;
}
function bookingSummaryRows(){
  const b = bookingState.device.brandId ? findBrand(DB.brands,bookingState.device.brandId) : null;
  const m = bookingState.device.modelId ? findModel(DB.brands,bookingState.device.modelId) : null;
  const svc = bookingState.serviceId ? SERVICES_SEED.find(s=>s.id===bookingState.serviceId) : null;
  const price = (b&&m&&svc) ? getPrice(DB.prices,b.id,m.model.id,svc.id) : null;
  const rows=[
    ['Customer', bookingState.customer.name||'—'],
    ['Phone', b&&m ? (b.name+' '+m.model.name) : '—'],
    ['Repair', svc?svc.name:'—'],
    ['Estimated Price', price?fmtINR(price.price):'—'],
    ['Repair Time', price?price.time:'—'],
    ['Appointment', bookingState.appointment.date ? (fmtDate(bookingState.appointment.date)+' • '+bookingState.appointment.time) : '—'],
    ['Service Type', bookingState.appointment.type==='store'?'Store Visit':'Pickup & Delivery']
  ];
  return rows.map(r=>`<div class="sum-row"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('');
}
function bookingStepContent(){
  if(bookingState.step===1) return bookingStepDevice();
  if(bookingState.step===2) return bookingStepRepair();
  if(bookingState.step===3) return bookingStepDetails();
  if(bookingState.step===4) return bookingStepAppointment();
  return bookingStepConfirm();
}
function bookingStepDevice(){
  const b = bookingState.device.brandId ? findBrand(DB.brands,bookingState.device.brandId) : null;
  return `
  <h3 style="margin:0 0 18px">Select your device</h3>
  <div class="field"><label>Brand</label>
    <select onchange="bookingState.device.brandId=this.value;bookingState.device.modelId=null;render();">
      <option value="">Choose brand…</option>
      ${DB.brands.filter(x=>x.enabled).map(x=>`<option value="${x.id}" ${b&&b.id===x.id?'selected':''}>${x.name}</option>`).join('')}
    </select>
  </div>
  ${b?`
  <div class="field"><label>Model</label>
    <select onchange="bookingState.device.modelId=this.value;render();">
      <option value="">Choose model…</option>
      ${b.series.filter(s=>s.enabled).map(s=>`<optgroup label="${s.name}">${s.models.filter(m=>m.enabled).map(m=>`<option value="${m.id}" ${bookingState.device.modelId===m.id?'selected':''}>${m.name}</option>`).join('')}</optgroup>`).join('')}
    </select>
  </div>`:''}
  <div class="grid2">
    <div class="field"><label>Storage / Variant</label><input placeholder="e.g. 128GB" value="${escapeHtml(bookingState.device.variant)}" oninput="bookingState.device.variant=this.value"></div>
    <div class="field"><label>IMEI Number (optional)</label><input placeholder="15-digit IMEI" value="${escapeHtml(bookingState.device.imei)}" oninput="bookingState.device.imei=this.value"></div>
  </div>
  <button class="btn btn-primary" ${!bookingState.device.modelId?'disabled style="opacity:.5"':''} onclick="bookingNext()">Continue</button>`;
}
function bookingStepRepair(){
  const b = findBrand(DB.brands,bookingState.device.brandId);
  const m = findModel(DB.brands,bookingState.device.modelId);
  return `
  <h3 style="margin:0 0 4px">What needs repair?</h3>
  <p class="small-note" style="margin:0 0 18px">${b.name} ${m.model.name}</p>
  <div class="opt-grid">
    ${SERVICES_SEED.map(s=>{
      const pr=getPrice(DB.prices,b.id,m.model.id,s.id);
      return `<button class="opt-btn ${bookingState.serviceId===s.id?'sel':''}" onclick="bookingState.serviceId='${s.id}';render();"><div>${s.icon} ${s.name}</div><div style="font-size:11.5px;color:var(--gray-500);margin-top:4px;font-weight:500">${pr&&pr.enabled?fmtINR(pr.price):'Get quote'}</div></button>`;
    }).join('')}
  </div>
  <div class="field" style="margin-top:16px"><label>Describe the problem</label><textarea rows="3" placeholder="e.g. Screen cracked after a drop, touch not responding in corners" oninput="bookingState.problemDesc=this.value">${escapeHtml(bookingState.problemDesc)}</textarea></div>
  <div class="field"><label>Upload phone images (optional)</label>
    <div class="upload-box" onclick="document.getElementById('img-input').click()">Click to upload photos of the damage</div>
    <input id="img-input" type="file" accept="image/*" multiple style="display:none" onchange="handleImageUpload(event)">
    <div class="thumb-row">${bookingState.images.map(src=>`<img src="${src}">`).join('')}</div>
  </div>
  <div style="display:flex;gap:10px">
    <button class="btn btn-outline" onclick="bookingState.step=1;render();">Back</button>
    <button class="btn btn-primary" ${!bookingState.serviceId?'disabled style="opacity:.5"':''} onclick="bookingNext()">Continue</button>
  </div>`;
}
function handleImageUpload(e){
  const files=Array.from(e.target.files||[]).slice(0,4);
  files.forEach(f=>{
    const reader=new FileReader();
    reader.onload=()=>{ bookingState.images.push(reader.result); render(); };
    reader.readAsDataURL(f);
  });
}
function bookingStepDetails(){
  const c=bookingState.customer;
  return `
  <h3 style="margin:0 0 18px">Your details</h3>
  <div class="grid2">
    <div class="field"><label>Full Name</label><input value="${escapeHtml(c.name)}" oninput="bookingState.customer.name=this.value"></div>
    <div class="field"><label>Mobile Number</label><input value="${escapeHtml(c.mobile)}" oninput="bookingState.customer.mobile=this.value"></div>
  </div>
  <div class="field"><label>Email</label><input type="email" value="${escapeHtml(c.email)}" oninput="bookingState.customer.email=this.value"></div>
  <div class="field"><label>Address</label><input value="${escapeHtml(c.address)}" oninput="bookingState.customer.address=this.value"></div>
  <div class="grid2">
    <div class="field"><label>City</label><input value="${escapeHtml(c.city)}" oninput="bookingState.customer.city=this.value"></div>
    <div class="field"><label>Pincode</label><input value="${escapeHtml(c.pincode)}" oninput="bookingState.customer.pincode=this.value"></div>
  </div>
  <div style="display:flex;gap:10px">
    <button class="btn btn-outline" onclick="bookingState.step=2;render();">Back</button>
    <button class="btn btn-primary" id="details-next" onclick="validateDetails()">Continue</button>
  </div>`;
}
function validateDetails(){
  const c=bookingState.customer;
  if(!c.name || !/^[6-9]\\d{9}$/.test(c.mobile) || !c.city || !c.pincode){
    toast('Please fill name, a valid 10-digit mobile number, city and pincode.'); return;
  }
  bookingNext();
}
function bookingStepAppointment(){
  const a=bookingState.appointment;
  return `
  <h3 style="margin:0 0 18px">Appointment</h3>
  <div class="opt-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
    <button class="opt-btn ${a.type==='store'?'sel':''}" onclick="bookingState.appointment.type='store';render();">&#127970; Store Visit</button>
    <button class="opt-btn ${a.type==='pickup'?'sel':''}" onclick="bookingState.appointment.type='pickup';render();">&#128666; Pickup &amp; Delivery</button>
  </div>
  <div class="grid2">
    <div class="field"><label>Select Date</label><input type="date" min="${todayISO()}" value="${a.date}" onchange="bookingState.appointment.date=this.value"></div>
    <div class="field"><label>Select Time</label>
      <select onchange="bookingState.appointment.time=this.value">
        ${['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t=>`<option ${a.time===t?'selected':''}>${t}</option>`).join('')}
      </select>
    </div>
  </div>
  <div style="display:flex;gap:10px">
    <button class="btn btn-outline" onclick="bookingState.step=3;render();">Back</button>
    <button class="btn btn-primary" onclick="bookingNext()">Continue</button>
  </div>`;
}
function bookingStepConfirm(){
  const b=findBrand(DB.brands,bookingState.device.brandId);
  const m=findModel(DB.brands,bookingState.device.modelId);
  const svc=SERVICES_SEED.find(s=>s.id===bookingState.serviceId);
  const pr=getPrice(DB.prices,b.id,m.model.id,svc.id);
  return `
  <h3 style="margin:0 0 18px">Review &amp; confirm</h3>
  <div class="sum-row"><span class="k">Customer</span><span class="v">${escapeHtml(bookingState.customer.name)} • ${escapeHtml(bookingState.customer.mobile)}</span></div>
  <div class="sum-row"><span class="k">Phone</span><span class="v">${b.name} ${m.model.name} ${bookingState.device.variant?('• '+escapeHtml(bookingState.device.variant)):''}</span></div>
  <div class="sum-row"><span class="k">Repair</span><span class="v">${svc.name}</span></div>
  <div class="sum-row"><span class="k">Problem</span><span class="v">${escapeHtml(bookingState.problemDesc)||'—'}</span></div>
  <div class="sum-row"><span class="k">Estimated Price</span><span class="v">${pr&&pr.enabled?fmtINR(pr.price):'To be quoted'}</span></div>
  <div class="sum-row"><span class="k">Appointment</span><span class="v">${fmtDate(bookingState.appointment.date)} • ${bookingState.appointment.time}</span></div>
  <div class="sum-row"><span class="k">Service Type</span><span class="v">${bookingState.appointment.type==='store'?'Store Visit':'Pickup & Delivery'}</span></div>
  <div style="display:flex;gap:10px;margin-top:20px">
    <button class="btn btn-outline" onclick="bookingState.step=4;render();">Back</button>
    <button class="btn btn-primary" onclick="confirmBooking()">Confirm Repair Booking</button>
  </div>`;
}
function bookingNext(){ bookingState.step++; render(); }

async function confirmBooking(){
  const b=findBrand(DB.brands,bookingState.device.brandId);
  const m=findModel(DB.brands,bookingState.device.modelId);
  const svc=SERVICES_SEED.find(s=>s.id===bookingState.serviceId);
  const pr=getPrice(DB.prices,b.id,m.model.id,svc.id);
  const yr=new Date().getFullYear();
  const repairId='MR-'+yr+'-'+(DB.settings.nextSeq++);
  await persist('settings');
  const createdAt=todayISO();
  const booking={
    id:uid(10), repairId, createdAt,
    customer:{...bookingState.customer},
    device:{brandId:b.id,brandName:b.name,seriesId:m.series.id,seriesName:m.series.name,modelId:m.model.id,modelName:m.model.name,variant:bookingState.device.variant,imei:bookingState.device.imei},
    serviceId:svc.id, serviceName:svc.name,
    problemDesc:bookingState.problemDesc,
    images:bookingState.images.slice(),
    appointment:{...bookingState.appointment},
    price: pr?pr.price:0, estRepairTime: pr?pr.time:svc.time, warrantyDays: pr?pr.warrantyDays:svc.warrantyDays,
    technicianId:null, technicianName:'Not yet assigned',
    status:'Booked',
    statusHistory:[{status:'Booked',at:createdAt,note:'Booking received online.'}],
    payment:{method:'—',status:'Pending',amountPaid:0},
    notes:[], cancelled:false
  };
  DB.bookings.unshift(booking);
  await persist('bookings');
  bookingState.lastBooking=booking;
  render();
}
function bookingConfirmation(bk){
  return `
  <section class="container-section">
    <div class="wrap" style="max-width:600px">
      <div class="card center" style="padding:44px;text-align:center">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--ok-bg);color:var(--ok);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 18px">&#10003;</div>
        <h2 style="margin:0 0 8px">Booking confirmed!</h2>
        <p style="color:var(--gray-500);margin:0 0 22px">Your repair has been booked. Save your Repair ID to track progress.</p>
        <div style="background:var(--navy);color:#fff;border-radius:14px;padding:20px;margin-bottom:24px">
          <div style="font-size:12px;color:rgba(255,255,255,.6)">Repair ID</div>
          <div style="font-family:Poppins;font-size:26px;font-weight:800;letter-spacing:1px">${bk.repairId}</div>
        </div>
        <div style="text-align:left">
          <div class="sum-row"><span class="k">Phone</span><span class="v">${bk.device.brandName} ${bk.device.modelName}</span></div>
          <div class="sum-row"><span class="k">Repair</span><span class="v">${bk.serviceName}</span></div>
          <div class="sum-row"><span class="k">Estimated Price</span><span class="v">${bk.price?fmtINR(bk.price):'To be quoted'}</span></div>
          <div class="sum-row"><span class="k">Appointment</span><span class="v">${fmtDate(bk.appointment.date)} • ${bk.appointment.time}</span></div>
        </div>
        <div style="display:flex;gap:10px;margin-top:26px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="trackState.query='${bk.repairId}';bookingState.lastBooking=null;bookingState.step=1;nav('#track');setTimeout(doTrackSearch,50)">Track This Repair</button>
          <button class="btn btn-outline" onclick="resetBooking();nav('#home')">Back to Home</button>
        </div>
      </div>
    </div>
  </section>`;
}
function resetBooking(){
  bookingState.step=1; bookingState.lastBooking=null;
  bookingState.customer={name:'',mobile:'',email:'',address:'',city:'',pincode:''};
  bookingState.device={brandId:null,modelId:null,variant:'',imei:''};
  bookingState.serviceId=null; bookingState.problemDesc=''; bookingState.images=[];
  bookingState.appointment={type:'store',date:todayISO(),time:'11:00 AM'};
}
