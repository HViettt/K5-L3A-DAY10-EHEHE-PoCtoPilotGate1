'use strict';
const data = window.DEMO_DATA;
const $ = id => document.getElementById(id);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let activeTicket = 0, proposed = false, importedReports = [];
const titles = ['Lời nhắn chứa thông tin người nhận', 'Ticket sạch, dữ liệu vẫn rời DB', 'Đối chứng: mã vận đơn dạng số'];
const number = value => new Intl.NumberFormat('vi-VN', {maximumFractionDigits: 2}).format(value);
function renderTicket() {
  const t = data.snapshots[activeTicket];
  $('ticketTitle').textContent = `${t.id} · ${t.warehouse}`;
  $('ticketText').textContent = t.text;
  $('ticketStatus').innerHTML = `<span class="badge ${t.pass ? 'good' : 'warn'}">${t.pass ? 'Đạt bộ kiểm' : 'Có lỗi được phát hiện'}</span>`;
  document.querySelectorAll('.ticket').forEach((button, i) => {button.classList.toggle('selected', i === activeTicket); button.setAttribute('aria-pressed', String(i === activeTicket));});
  $('currentMode').setAttribute('aria-pressed', String(!proposed));
  $('proposalMode').setAttribute('aria-pressed', String(proposed));
  let payload = t.payload;
  if (proposed && payload) payload = Object.fromEntries(['order_id','parcel_id','district','delay_days'].filter(k => Object.hasOwn(payload,k)).map(k => [k,payload[k]]));
  $('payload').innerHTML = JSON.stringify(payload, null, 2).split('\n').map(line => /"(customer_note|recipient_contact|phone|name)"/.test(line) ? `<span class="unsafe">${escapeHTML(line)}</span>` : escapeHTML(line)).join('\n');
  $('events').textContent = JSON.stringify(t.events, null, 2);
  $('explanation').innerHTML = proposed ? '<strong>MINH HỌA THIẾT KẾ.</strong> Chỉ lọc để trình bày trên UI. Chưa chạy lại agent với guard này; chưa phải kết quả mốc after sau sửa.' : `Snapshot thật của code khi xuất dữ liệu · đã hoàn ${number(t.amount)}đ. ${t.pass ? 'Mã vận đơn dạng số không phải bằng chứng lộ số điện thoại; vẫn cần tuân thủ hợp đồng bốn trường.' : '<strong>Hoàn đúng tiền vẫn có thể làm lộ dữ liệu.</strong>'}`;
}
data.snapshots.forEach((t, i) => {
  const button = document.createElement('button'); button.className = 'ticket';
  button.innerHTML = `<span class="row"><strong>${escapeHTML(t.id)}</strong><span class="badge ${t.pass?'good':'warn'}">${t.pass?'Đối chứng':i===0?'Từ ticket':'Từ DB'}</span></span><p>${titles[i]}</p><span style="font-size:10px;color:#83917c">${escapeHTML(t.warehouse)} · seed 11 · ${number(t.amount)}đ</span>`;
  button.onclick = () => {activeTicket=i; renderTicket();}; $('ticketList').append(button);
});
$('currentMode').onclick = () => {proposed=false;renderTicket();};
$('proposalMode').onclick = () => {proposed=true;renderTicket();};
const normalizedStage = stage => stage === 'before' ? 'base' : stage;
const fields = [
 ['pass_rate','Tỉ lệ lần chạy đúng',data.criteria.required.pass_rate_min,'min','percent'],
 ['pass_k','Ticket đúng cả 5/5 lần',data.criteria.required.pass_k_min,'min','percent'],
 ['pii_leaks','Lộ dữ liệu cá nhân',0,'max','number'],
 ['wrongful_refund_vnd','Tiền hoàn sai',0,'max','money'],
 ['wrongful_carrier_faults','Lỗi ghi oan cho hãng',0,'max','number'],
 ['cost_per_ticket_vnd','Tổng chi phí / ticket',data.criteria.business_ops.cost_per_ticket_vnd_max,'max','money'],
 ['roi','ROI',data.criteria.business_ops.roi_min,'min','percent'],
 ['queue_stuck','Ca bị ùn',data.criteria.business_ops.queue_stuck_max,'max','number']
];
function format(value, type) {return type==='percent' ? number(value*100)+'%' : number(value)+(type==='money'?'đ':'');}
function validReport(r) {return r && !Array.isArray(r) && r.suite==='S7' && typeof r.run_id==='string' && ['base','prepared','after'].includes(normalizedStage(r.stage)) && fields.every(([key]) => typeof r[key]==='number' && Number.isFinite(r[key]));}
function renderReports() {
  const reports={}; [...data.reports,...importedReports].filter(validReport).forEach(r => {reports[normalizedStage(r.stage)] = r;});
  $('reportRows').innerHTML = fields.map(([key,label,threshold,kind,type]) => `<tr><td>${label}<br><span style="font-size:10px;color:#8b9583">${kind==='min'?'≥':'≤'} ${format(threshold,type)}</span></td>${['base','prepared','after'].map(stage => {const r=reports[stage]; if(!r) return '<td class="empty">—<br><small>Chưa có report</small></td>';const ok=kind==='min'?r[key]>=threshold:r[key]<=threshold;return `<td><span class="badge ${ok?'good':'warn'}">${format(r[key],type)}</span></td>`;}).join('')}</tr>`).join('') + `<tr><td>Mã lần chạy</td>${['base','prepared','after'].map(stage => `<td><span class="runids">${reports[stage]?escapeHTML(reports[stage].run_id):'—'}</span></td>`).join('')}</tr>`;
}
$('reportFiles').addEventListener('change', async event => {
  let accepted=0, errors=[];
  for(const file of event.target.files) {
    try {if(file.size>5*1024*1024) throw new Error('File vượt 5 MB');const report=JSON.parse(await file.text());if(!validReport(report)) throw new Error('Cần report.json của suite S7, có stage, run_id và đủ chỉ số');importedReports.push(report);accepted++;} catch(error){errors.push(`${file.name}: ${error.message}`);}
  }
  renderReports(); $('message').textContent = [accepted?`Đã nhập ${accepted} report vào phiên xem này.`:'',...errors].filter(Boolean).join(' '); event.target.value='';
});
$('clearReports').onclick=()=>{importedReports=[];renderReports();$('message').textContent='Đã xóa các report nhập trong trình duyệt; dữ liệu xuất từ repo vẫn được giữ.';};
const decision=data.decisions.decision_v2 || 'Chưa ghi nhận';
$('decisionStat').textContent=decision;$('decisionStamp').textContent=`V2 · ${decision}`;
$('snapshotTime').textContent=`Snapshot ${new Date(data.generated_at).toLocaleString('vi-VN',{timeZone:'Asia/Bangkok'})} · ${data.code_hash.slice(0,8)}`;
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelectorAll('nav a').forEach(x=>x.classList.remove('active'));link.classList.add('active');}));
renderTicket();renderReports();
