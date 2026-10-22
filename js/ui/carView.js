// ===== 文件: js/ui/carView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  performance, replacementCost
}
from '../core/car.js';
import {
  DIMENSIONS, PARTS, partQuota
}
from '../data/parts.js';
import {
  h, header, panel, number, progress, badge, table, money, button, empty, tyreLegend, wearMeter, icon, metric, severity
}
from './uiKit.js';
export function carView(s) {
  const t=teamOf(s),p=s.parts[t.id],blocked=!!s.calendar.weekend;
  return `${header('赛车工程','车辆与部件','磨损不会随新规格重置；部件配额按赛季累计。')}
 <div class="grid-2">${[0,1].map(slot=>{const v=performance(s,t,slot);return panel((slot+1)+' 号车 · '+s.drivers.find(d=>d.id===t.drivers[slot]).name,Object.entries(DIMENSIONS).map(([key,label])=>`<div class="attribute-row"><span>${icon({downforce:'wind',aero:'wind',grip:'tyre',suspension:'wrench',brakes:'shield',power:'bolt',ers:'battery',reliability:'shield',tyres:'tyre',weight:'layers'}[key])}${h(label)}</span>${progress(v[key])}<strong class="tone-${severity(v[key],'rating')}">${number(v[key])}</strong></div>`).join(''));}).join('')}</div>
 ${panel('轮胎磨损预测 · S / M / H',`${tyreLegend(['S','M','H'])}<canvas data-chart="tyres" data-height="220" aria-label="三种干胎的磨损预测曲线"></canvas><p class="muted">横轴：圈数；纵轴：磨损百分比。红 S / 黄 M / 白 H；正常驾驶、干地、当前赛道预测，不影响真实轮胎库存。</p>`)}${[0,1].map(slot=>panel((slot+1)+' 号车部件',table(['部件','规格','磨损','使用 / 配额','更换成本','操作'],PARTS.map(part=>{const item=p.cars[slot][part.id],quota=partQuota(part,s.season.year);return [h(part.name)+(s.season.year>=2026&&part.id==='mguh'?badge('已停用'):''),badge('V'+item.level),wearMeter(item.wear),item.used>quota?badge(item.used+' / '+quota+' · 超额','danger'):item.used===quota?badge(item.used+' / '+quota+' · 已满','warning'):item.used+' / '+(quota===99?'不限':quota),money(replacementCost(part)),button('更换', 'replace',{slot,id:part.id},{disabled:blocked,reason:blocked?'比赛周末内不可更换':'',confirm:`支付更换费用并启用新部件；超配额将使下站罚退 10 位。确认？`})];}),'car-parts-'+slot))).join('')}
 ${panel('升级库存与分配',p.stock.length?table(['部件','规格','性能增益','分配'],p.stock.map(item=>[h(PARTS.find(x=>x.id===item.part).name),badge('V'+item.level),metric('+'+number(item.gain),'success','up'),[0,1].map(slot=>button('装到 '+(slot+1)+' 号车','fit',{id:item.id,slot},{disabled:blocked||p.cars[slot][item.part].level>=item.level,reason:blocked?'请在周末之外装车':p.cars[slot][item.part].level>=item.level?'已装同级或更高规格':''})).join(' ')])):empty('完成研发与制造后，新规格将在这里出现。'))}
 ${panel('制造队列',p.production.length?table(['部件','规格','剩余产能日'],p.production.map(x=>[h(PARTS.find(p=>p.id===x.part).name),'V'+x.level,x.remaining.toFixed(1)+' 天'])):empty('没有生产中的部件。'))}`;
}
