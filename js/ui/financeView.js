// ===== 文件: js/ui/financeView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  SPONSORS, SPONSOR_GOALS
}
from '../data/sponsors.js';
import {
  h, header, panel, money, stat, progress, badge, button, table, empty, icon, metric
}
from './uiKit.js';
export function financeView(s) {
  const t=teamOf(s),f=s.finance[t.id];
  return `${header('财务办公室','现金流与预算帽','现金是银行账户；预算帽是合规累计支出。设施建设、罚款和担保金不计入预算帽。')}
 <div class="stats-grid">${stat('银行现金',money(f.cash),'现金小于零会终止本次生涯',f.cash<15?'danger':'')}${stat('计入预算帽',money(f.capUsed),'年度累计支出')}${stat('预算帽上限',money(f.capLimit),'含难度调整 · 非官方平衡值')}${stat('合规状态',f.disqualified?'取消积分资格':f.audited?'已受调查':'正常',f.audited?'风洞 / CFD 额度已削减':'超支将在正赛后接受调查')}</div>
 <div class="grid-2">${panel('预算帽监测',`${progress(f.capUsed,f.capLimit,'已使用')}<p>剩余额度 <strong>${money(f.capLimit-f.capUsed)}</strong></p><p class="muted">研发、生产、更换、人员与车手薪资、运营（含引擎供应 / 自研维护）、专项培养和违约金计入；资金收入不会恢复预算帽额度。</p>${button('申请 $15m 紧急注资','rescue',{}, {disabled:f.rescue||f.cash>=20,reason:f.rescue?'本季已使用援助':f.cash>=20?'现金低于 $20m 时可申请':'',confirm:'获得 $15m 紧急注资，董事会信心 -15，声望 -5。确认？'})}`)}${panel('最近现金收支',`<div class="finance-legend"><span class="tone-success">${icon('up')}收入</span><span class="tone-danger">${icon('down')}支出</span></div><canvas data-chart="finance" data-height="200" aria-label="现金收支图"></canvas>`)}</div>
 ${panel('已签赞助',f.sponsors.length?`<div class="facility-grid">${f.sponsors.map(sp=>`<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><strong class="large-number">${money(sp.annual)} / 年</strong><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}</p><p>本年已付 ${money(sp.paid)}</p></article>`).join('')}</div>`:empty('没有赞助合同。'))}
 ${panel('赞助洽谈',`<div class="facility-grid">${SPONSORS.filter(sp=>!f.sponsors.some(x=>x.id===sp.id)).map(sp=>{const full=f.sponsors.filter(x=>x.kind===sp.kind).length>=(sp.kind==='主赞助'?1:3);return `<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><p>基础年收入 ${money(sp.base)}</p><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}<br>声望要求 ${sp.min}，营销与员工特质提高实际报价。</p>${button('签署赞助','sponsor',{id:sp.id},{disabled:t.reputation<sp.min||full,reason:full?'该类赞助席位已满':t.reputation<sp.min?'声望不足':'',confirm:'签署本年度赞助合同，收入按日分期发放。确认？'})}</article>`;}).join('')}</div>`)}
 ${panel('财务流水',table(['模拟日','交易说明','金额','计入预算帽'],f.ledger.slice(0,100).map(item=>[item.day,h(item.label),`<strong class="metric ${item.amount>=0?'positive':'negative'}">${icon(item.amount>=0?'up':'down')}${item.amount>=0?'+':''}${money(item.amount)}</strong>`,badge(item.cap?'计入':'不计入',item.cap?'info':'subtle',item.cap?'shield':'')]),'finance-ledger'))}`;
}
