// ===== 文件: js/ui/uiKit.js =====
import {
  logo
}
from '../data/logos.js';
export const h=value=>String(value??'').replace(/[&<>"']/g,c=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}
[c]));
export const money=n=>'$'+Number(n||0).toFixed(2)+'m';
export const number=n=>Number(n||0).toFixed(1);
export function time(n) {
  if(!Number.isFinite(n)||n>=9000)return '—';
  const ms=Math.round(n*1000),m=Math.floor(ms/60000);
  return `${m}:${((ms-m*60000)/1000).toFixed(3).padStart(6,'0')}`;
}
export function icon(id) {
  return VISUAL_ICONS[id]?`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${VISUAL_ICONS[id]}</svg>`:`<svg class="icon" aria-hidden="true"><use href="#i-${h(id)}"></use></svg>`;
}
export function badge(text,type='',symbol='') {
  const glyph=symbol||TONE_ICONS[type]||'';
  return `<span class="badge ${h(type)}">${glyph?icon(glyph):''}${h(text)}</span>`;
}
export function button(label,action,payload={
},options={
}) {
  return `<button type="button" class="btn ${h(options.class||'')}" data-action="${h(action)}" data-payload="${h(JSON.stringify(payload))}" ${options.disabled?'disabled':''} ${options.reason?`title="${h(options.reason)}"`:''} ${options.confirm?`data-confirm="${h(options.confirm)}"`:''}>${h(label)}</button>${options.disabled&&options.reason?`<small class="disabled-reason">${h(options.reason)}</small>`:''}`;
}
export function link(label,route,cls='') {
  return `<a class="btn ${h(cls)}" href="#${h(route)}">${h(label)}</a>`;
}
export function header(eyebrow,title,subtitle='',actions='') {
  return `<div class="page-heading"><div><p class="eyebrow">${h(eyebrow)}</p><h1>${h(title)}</h1>${subtitle?`<p class="muted">${h(subtitle)}</p>`:''}</div><div class="actions">${actions}</div></div>`;
}
export function panel(title,body,extra='',cls='') {
  const visual=visualCategory(title);
  return `<section class="panel ${h(cls)}"><div class="panel-heading"><h2><span class="section-icon tone-${visual.tone}">${icon(visual.symbol)}</span>${h(title)}</h2>${extra}</div>${body}</section>`;
}
export function progress(value,max=100,label='',options={}) {
  const pct=Math.max(0,Math.min(100,Number(value)/Math.max(.001,Number(max))*100));
  const kind=options.kind||(/疲劳/.test(label)?'wear':/预算帽|已使用/.test(label)?'cap':/士气|信心/.test(label)?'confidence':'');
  const tone=kind?severity(kind==='cap'?pct:Number(value),kind):'accent';
  return `<div class="progress-block tone-${tone}">${label?`<div class="progress-label"><span>${h(label)}</span><strong>${pct.toFixed(0)}%</strong></div>`:''}<div class="progress" role="progressbar" aria-valuenow="${pct.toFixed(0)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>`;
}
export function stat(label,value,note='',cls='') {
  const visual=visualCategory(label);
  return `<div class="stat ${h(cls)}"><div class="stat-heading"><span class="label">${h(label)}</span><span class="stat-symbol tone-${cls==='danger'?'danger':visual.tone}">${icon(visual.symbol)}</span></div><strong>${h(value)}</strong><small>${h(note)}</small></div>`;
}
export function teamBadge(t) {
  return `<span class="team-badge">${logo(t.logo,t.color,t.secondary)}<span>${h(t.name)}</span></span>`;
}
export function tyre(c) {
  return `<span class="tyre tyre-${h(c)}" data-compound="${h(c)}" title="${h(TYRE_LABELS[c]||c)} ${h(c)}" aria-label="${h(TYRE_LABELS[c]||c)} ${h(c)}">${h(c)}</span>`;
}
export function empty(text) {
  return `<div class="empty">${icon('flag')}<p>${h(text)}</p></div>`;
}
export function table(headers,rows,id='',cls='') {
  return `<div class="table-scroll"><table ${id?`id="${h(id)}"`:''} class="${h(cls)}"><thead><tr>${headers.map((x,i)=>`<th><button class="sort" data-sort="${i}" aria-label="按${h(x)}排序">${h(x)} <span>↕</span></button></th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export function field(label,control,note='') {
  return `<label class="field"><span>${h(label)}</span>${control}${note?`<small>${h(note)}</small>`:''}</label>`;
}
export function select(name,items,value,attrs='') {
  return `<select name="${h(name)}" ${attrs}>${items.map(x=>{const [key,label,disabled]=Array.isArray(x)?x:[x,x,false];return `<option value="${h(key)}" ${String(key)===String(value)?'selected':''} ${disabled?'disabled':''}>${h(label)}</option>`;}).join('')}</select>`;
}
export function carArt(color='#68e8b5') {
  return `<svg class="car-art" viewBox="0 0 600 200" aria-label="赛车俯视示意图" role="img"><defs><linearGradient id="car-shade" x2="0" y2="1"><stop stop-color="${h(color)}"/><stop offset="1" stop-color="#183b35"/></linearGradient></defs><g fill="#121b27" stroke="#526171" stroke-width="2"><rect x="128" y="22" width="66" height="43" rx="10"/><rect x="128" y="135" width="66" height="43" rx="10"/><rect x="402" y="18" width="72" height="48" rx="11"/><rect x="402" y="134" width="72" height="48" rx="11"/></g><g stroke="${h(color)}" fill="none" opacity=".6"><path d="m165 63 85 22m-85 52 85-22m189-50-83 25m83 45-83-25"/></g><g fill="url(#car-shade)" stroke="${h(color)}"><path d="M90 92 220 84 258 60 370 55 422 78 490 82v36l-68 4-52 23-112-5-38-24L90 108Z"/><rect x="76" y="40" width="22" height="120" rx="5"/><rect x="486" y="33" width="24" height="134" rx="4"/><path d="M211 88h78v24h-78Z"/></g><ellipse cx="315" cy="100" rx="35" ry="23" fill="#0b0e13" stroke="#c1f9e8" stroke-width="4"/><ellipse cx="322" cy="100" rx="10" ry="14" fill="#e9eef5"/><path d="M354 83h48m-48 34h48" stroke="#d3fff0" opacity=".5"/><text x="375" y="105" fill="#e6fff7" font-family="system-ui" font-size="15" font-weight="800">F1</text></svg>`;
}
let toastTimer;
export function toast(text,type='info') {
  const el=document.querySelector('#toast');
  el.textContent=text;
  el.className='toast visible '+type;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('visible'),4500);
}
export function openDialog(title,content,onSubmit=null) {
  const d=document.querySelector('#modal');
  document.querySelector('#modal-title').textContent=title;
  document.querySelector('#modal-body').innerHTML=content;
  const form=d.querySelector('form');
  if(form&&onSubmit)form.addEventListener('submit',e=> {
    e.preventDefault(); onSubmit(new FormData(form));
  });
  d.showModal();
  const first=d.querySelector('input, select, button');
  first?.focus();
  return d;
}
export function confirmDialog(message,callback) {
  openDialog('确认操作',`<p class="dialog-copy">${h(message)}</p><div class="actions"><button class="btn" data-close>取消</button><button class="btn primary" id="confirm-yes">确认执行</button></div>`);
  document.querySelector('#confirm-yes').onclick=()=> {
    document.querySelector('#modal').close();
    callback();
  };
} // 所有图表均由原生 Canvas 绘制，尺寸根据 devicePixelRatio 匹配设备像素。
export function drawChart(canvas,{
  labels=[],values=[],series=[],colors=[],type='bar',color='#68e8b5'
}={
}) {
  const rect=canvas.getBoundingClientRect(),w=Math.max(240,rect.width),height=canvas.dataset.height?Number(canvas.dataset.height):220,dpr=window.devicePixelRatio||1;
  canvas.width=w*dpr;
  canvas.height=height*dpr;
  canvas.style.height=height+'px';
  const ctx=canvas.getContext('2d');
  ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,w,height);
  ctx.font='11px system-ui';
  ctx.lineWidth=1;
  ctx.strokeStyle='#283141';
  ctx.fillStyle='#8d9aaf';
  if(type==='radar') {
    const cx=w/2,cy=height/2,r=Math.min(w*.28,height*.34),n=labels.length;
    for(let ring=1; ring<=4; ring++) {
      ctx.beginPath();
      for(let i=0; i<n; i++) {
        const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*ring/4,y=cy+Math.sin(a)*r*ring/4;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.beginPath();
    for(let i=0; i<n; i++) {
      const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*(values[i]||0)/100,y=cy+Math.sin(a)*r*(values[i]||0)/100;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle=color+'30';
    ctx.fill();
    ctx.strokeStyle=color;
    ctx.stroke();
    ctx.fillStyle='#a9b6c8';
    ctx.textAlign='center';
    labels.forEach((l,i)=> {
      const a=i/n*Math.PI*2-Math.PI/2; ctx.fillText(l,cx+Math.cos(a)*(r+30),cy+Math.sin(a)*(r+23)+4);
    });
    return;
  }
  const left=36,bottom=height-30,top=14,right=w-12,max=Math.max(1,...values,...series.flatMap(s=>s.values));
  for(let i=0; i<=4; i++) {
    const y=bottom-(bottom-top)*i/4;
    ctx.beginPath();
    ctx.moveTo(left,y);
    ctx.lineTo(right,y);
    ctx.stroke();
    ctx.fillText((max*i/4).toFixed(0),2,y+4);
  }
  if(type==='line') {
    const lines=series.length?series:[{
      values,color
    }];
    for(const line of lines) {
      ctx.beginPath();
      line.values.forEach((v,i)=> {
        const x=left+i/Math.max(1,line.values.length-1)*(right-left),y=bottom-v/max*(bottom-top); i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      });
      ctx.strokeStyle=line.color||color;
      ctx.lineWidth=2;
      ctx.stroke();
    }
  }
  else values.forEach((v,i)=> {
    const width=(right-left)/Math.max(1,values.length),barHeight=v/max*(bottom-top); ctx.fillStyle=colors[i]||color; ctx.fillRect(left+i*width+5,bottom-barHeight,Math.max(2,width-10),barHeight);
  });
  ctx.fillStyle='#8d9aaf';
  ctx.textAlign='center';
  labels.forEach((l,i)=> {
    if(labels.length<16||i%Math.ceil(labels.length/8)===0)ctx.fillText(l,left+(type==='line'?i/Math.max(1,labels.length-1)*(right-left):(i+.5)/Math.max(1,labels.length)*(right-left)),height-9);
  });
}
// 图标均为项目内手绘 SVG；语义色不随车队主色变化。
const VISUAL_ICONS = {
  tyre:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m6 6 2 2m8 8 2 2M6 18l2-2m8-8 2-2"/>',
  stopwatch:'<circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m7-1 2 2m-9 3v5l3 2"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
  fuel:'<path d="M4 21V4h10v17M2 21h14M6 7h6v5H6m8-5 4 4v7a2 2 0 0 0 4 0v-7l-3-3m0 0v4h3"/>',
  thermometer:'<path d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Zm3-7v10"/><circle cx="12" cy="18" r="1"/>',
  rain:'<path d="M5 14a4 4 0 0 1 0-8 6 6 0 0 1 11-1 4.5 4.5 0 0 1 2 9M7 17l-1 3m6-3-1 3m6-3-1 3"/>',
  pit:'<path d="M3 21V8l9-6 9 6v13M7 21V11h10v10M9 15h6m-6 3h6"/>',
  warning:'<path d="M12 3 2 21h20ZM12 9v5m0 3v1"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  cross:'<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8m-8 0 8-8"/>',
  up:'<path d="M12 21V3m-7 7 7-7 7 7"/>',
  down:'<path d="M12 3v18m-7-7 7 7 7-7"/>',
  coins:'<ellipse cx="10" cy="6" rx="7" ry="3"/><path d="M3 6v5c0 4 14 4 14 0V6M3 11v5c0 4 14 4 14 0m3-5v7c0 2-4 3-7 3"/>',
  shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
  chart:'<path d="M3 3v18h18M7 16v-4m5 4V7m5 9v-7"/>',
  radio:'<path d="M4 8h16v13H4Zm3-5 12-2M8 12h8M7 17h2m6 0h2"/>',
  wrench:'<path d="M15 3a6 6 0 0 0-7 7l-6 7 5 5 7-7a6 6 0 0 0 7-7l-5 4-4-4Z"/>',
  wind:'<path d="M2 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M2 16h7a3 3 0 1 1-3 3"/>',
  heart:'<path d="M12 21 3 12a6 6 0 0 1 9-8 6 6 0 0 1 9 8Z"/>',
  battery:'<path d="M3 6h17v12H3Zm17 4h2v4h-2M7 9v6m-3-3h6m4 0h3"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8Zm-10 10 10 6 10-6M2 16l10 6 10-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v7l4 2"/>',
  star:'<path d="m12 2 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z"/>',
  play:'<path d="m7 3 14 9-14 9Z"/>',
  pause:'<path d="M6 3h4v18H6Zm8 0h4v18h-4Z"/>',
  forward:'<path d="m3 4 9 8-9 8Zm9 0 9 8-9 8Z"/>'
};
export const TYRE_CODES = ['S','M','H','I','W'];
const TYRE_LABELS = {S:'软胎',M:'中性胎',H:'硬胎',I:'半雨胎',W:'全雨胎'};
const TONE_ICONS = {success:'check',warning:'warning',danger:'cross',info:'radio',fastest:'stopwatch',pit:'pit'};
export function tyreTag(code,showName=true) {
  return `<span class="compound-tag" data-compound="${h(code)}">${tyre(code)}${showName?`<span>${h(TYRE_LABELS[code]||code)}</span>`:''}</span>`;
}
export function tyreLegend(codes=TYRE_CODES) {
  return `<div class="tyre-legend" aria-label="轮胎配方颜色图例">${codes.map(code=>tyreTag(code)).join('')}</div>`;
}
export function tyreInventory(stock) {
  return `<div class="tyre-inventory" aria-label="新胎库存">${TYRE_CODES.map(code=>`<span class="tyre-stock ${stock[code]>0?'':'depleted'}" data-compound="${code}" title="${TYRE_LABELS[code]}：${Number(stock[code]||0)} 套">${tyre(code)}<span><strong>${Number(stock[code]||0)}</strong><small>${stock[code]>0?'套新胎':'已用尽'}</small></span></span>`).join('')}</div>`;
}
export function tyreField(label,name,value,{codes=TYRE_CODES,compact=false}={}) {
  return `<fieldset class="tyre-field ${compact?'compact':''}"><legend>${h(label)}</legend><div class="tyre-options">${codes.map(code=>`<label class="tyre-choice" data-compound="${code}"><input type="radio" name="${h(name)}" value="${code}" ${code===value?'checked':''} aria-label="${h(label+'：'+TYRE_LABELS[code]+' '+code)}" required><span class="tyre-choice-body">${tyre(code)}<span>${TYRE_LABELS[code]}</span>${icon('check')}</span></label>`).join('')}</div></fieldset>`;
}
export function severity(value,kind='wear') {
  if(!Number.isFinite(Number(value)))return 'neutral';
  if(kind==='rating')return value>=85?'success':value>=70?'info':value>=55?'warning':'danger';
  if(kind==='confidence')return value<30?'danger':value<55?'warning':'success';
  if(kind==='cap')return value>=100?'danger':value>=85?'warning':'info';
  return value>=85?'danger':value>=65?'warning':'success';
}
export function metric(text,tone='neutral',symbol='') {
  return `<span class="metric tone-${h(tone)}">${symbol?icon(symbol):''}<span>${h(text)}</span></span>`;
}
export function wearMeter(value) {
  const tone=severity(value);
  return `<div class="wear-meter tone-${tone}">${progress(value,100,'',{kind:'wear'})}<strong>${number(value)}%</strong>${value>=65?icon('warning'):''}</div>`;
}
export function lapDisplay(value,{fastest=false,personal=false,label=false}={}) {
  const valid=Number.isFinite(value)&&value>0&&value<9000;
  const tone=valid&&fastest?'fastest':valid&&personal?'success':'neutral';
  return `<span class="lap-value tone-${tone}" ${valid&&fastest?'title="本场全场最快圈"':valid&&personal?'title="个人最佳单圈"':''}>${valid&&fastest?icon('stopwatch'):''}<span>${valid?time(value):'—'}</span>${label&&valid&&fastest?'<small>全场最快</small>':''}</span>`;
}
export function rankBadge(position) {
  return `<span class="rank-badge rank-${Number(position)}">${position<=3?icon('trophy'):''}<span>P${Number(position)}</span></span>`;
}
export function positionChange(grid,position) {
  const change=Number(grid)-Number(position);
  return Number.isFinite(change)&&change?metric((change>0?'+':'')+change,change>0?'success':'danger',change>0?'up':'down'):metric('持平','neutral');
}
export function raceStatus(car) {
  if(car.retired)return badge(car.reason||'已退赛','danger');
  if(car.pitRequest)return `<span class="badge pit">${icon('pit')}进站 ${tyre(car.pitRequest)}</span>`;
  if(car.drs)return badge('DRS 开启','info','bolt');
  if(car.dirty)return badge('脏空气','warning','wind');
  return badge('正常','subtle','check');
}
export function flagState(race) {
  const code=race.red?'RED':race.control;
  const names={GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'};
  return `<span class="flag-state flag-${h(code)}" data-race="control" data-control="${h(code)}">${icon('flag')}<span>${h(names[code]||code)}</span></span>`;
}
export function eventItem(event) {
  const types={weather:['rain','info','天气'],pit:['pit','pit','进站'],overtake:['up','success','超车'],radio:['radio','info','无线电'],danger:['cross','danger','事故 / 故障'],penalty:['warning','danger','处罚'],warning:['warning','warning','提醒'],info:['flag','neutral','赛况'],fastest:['stopwatch','fastest','最快圈']};
  const [symbol,tone,label]=types[event.type]||types.info;
  return `<div class="event-item tone-${tone}"><span class="event-symbol">${icon(symbol)}</span><div><div class="event-meta"><b>${event.at!==undefined?Math.floor(event.at/60)+':'+String(Math.floor(event.at%60)).padStart(2,'0'):'L'+h(event.lap)}</b><span>${label}</span></div><p>${h(event.text)}</p></div></div>`;
}
export function fastestSummary(s,record,attrs='') {
  const driver=s.drivers.find(d=>d.id===record?.driverId);
  return `<div class="fastest-summary" ${attrs}>${icon('stopwatch')}<div><small>全场最快圈</small><strong>${record?.time<9000?time(record.time):'—'}</strong></div><span>${h(driver?.name||'等待有效圈速')}</span></div>`;
}
function visualCategory(label) {
  const rules=[[/轮胎|配方/,'tyre','cyan'],[/最快|圈速/,'stopwatch','fastest'],[/预算帽|合规/,'shield','info'],[/现金|收支|财务|流水|赞助/,'coins','success'],[/信心|士气|目标/,'heart','warning'],[/研发|技术|项目/,'flask','cyan'],[/工厂|设施|制造|部件|车辆/,'wrench','info'],[/天气|气象|雨/,'rain','info'],[/人员|员工|阵容|车手|青训/,'users','info'],[/积分|冠军|荣誉|档案/,'trophy','warning'],[/通讯|新闻|无线电/,'radio','info'],[/比赛|赛历|下一站/,'flag','cyan'],[/存档|备份/,'save','info']];
  const rule=rules.find(([pattern])=>pattern.test(label));
  return rule?{symbol:rule[1],tone:rule[2]}:{symbol:'chart',tone:'neutral'};
}
