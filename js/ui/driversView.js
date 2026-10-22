// ===== 文件: js/ui/driversView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  ATTRS
}
from '../data/drivers-data.js';
import {
  h, header, panel, number, money, badge, progress, button, table, select, field, empty
}
from './uiKit.js';
function contract(d,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(d.id)}">${kind==='signDriver'?'接洽 / 签约':'续约谈判'}</button>`;
}
function card(s,d) {
  return `<article class="driver-card"><div class="driver-top"><span class="driver-number">${h(d.number)}</span><div><p class="eyebrow">${h(d.nationality)} · ${d.age} 岁 ${d.academy?'· 青训':''}</p><h2>${h(d.name)} <small class="tone-info">${h(d.code)}</small></h2></div><span class="rating">${number(d.attributes.pace)}</span></div><form data-form="driverCode" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('三字母缩写',`<input name="value" value="${h(d.code)}" pattern="[A-Za-z]{3}" minlength="3" maxlength="3" required aria-label="车手三字母缩写">`)}<button class="btn small" type="submit">保存缩写</button></form><div class="driver-attributes">${Object.entries(ATTRS).map(([key,label])=>`<div><span>${h(label)}</span><strong>${number(d.attributes[key])}</strong></div>`).join('')}</div><div class="stats-grid compact"><div><small>年薪</small><strong>${money(d.contract.salary)}</strong></div><div><small>剩余合同</small><strong>${d.contract.years} 年</strong></div><div><small>本季积分</small><strong>${d.points}</strong></div></div>${progress(d.morale,100,'士气')}${progress(d.fatigue,100,'疲劳')}<form data-form="train" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('发展计划',select('plan',[['balanced','均衡发展'],['pace','单圈专项'],['tyres','轮胎管理'],['wet','湿地训练'],['rest','恢复体能']],d.plan))}<button class="btn small" type="submit">应用计划</button></form><p class="muted">专项训练 $0.008m/天，计入预算帽。绩效奖金 ${money(d.contract.bonus)}，转会条款 ${(d.contract.buyout*100).toFixed(0)}%。</p><div class="actions">${d.academy?contract(d,'signDriver')+button('出售青训','sellYouth',{id:d.id},{confirm:'出售培养权并让车手进入自由市场，确认？'}):contract(d,'renewDriver')+button('解约','releaseDriver',{id:d.id},{class:'small danger',confirm:'支付剩余合同薪资 50% 解约，由最佳自由替补接替席位。确认？'})}${d.retired?badge('已宣布退役','danger'):''}</div></article>`;
}
export function driversView(s) {
  const t=teamOf(s),own=t.drivers.map(id=>s.drivers.find(d=>d.id===id)),youth=s.drivers.filter(d=>d.academy===t.id),market=s.drivers.filter(d=>d.teamId!==t.id&&!d.academy&&!d.retired);
  return `${header('阵容与转会','车手阵容',s.season.offseason?'转会窗已开启：进入下一赛季之前，请确保两位主力拥有有效合同。':'年轻车手通过比赛与训练成长，30 岁后逐步老化。')}
 <div class="grid-2">${own.map(d=>card(s,d)).join('')}</div>
 ${panel('青训学院',youth.length?`<div class="grid-2">${youth.map(d=>card(s,d)).join('')}</div>`:empty('从 F2 / F3 招募年轻车手，发展后提拔或出售。'),button('招募青训 · $1.00m','youth',{}, {disabled:youth.length>=4,reason:youth.length>=4?'青训名额已满':'',confirm:'花费 $1m 招募年轻车手，计入预算帽。确认？'}))}
 ${panel('车手市场',`<div class="filter-row"><input type="search" data-filter="driver-market" placeholder="搜索姓名、国籍或现任车队" aria-label="搜索车手"><span class="muted">有合同车手可挖角；薪资、声望与赛车竞争力影响意愿。</span></div>${table(['车手','国籍 / 年龄','速度','潜力','现任车队','年薪 / 合同','操作'],market.map(d=>[h(d.name),h(d.nationality)+' · '+d.age,number(d.attributes.pace),number(d.attributes.potential),h(s.teams.find(t=>t.id===d.teamId)?.name||'自由车手'),money(d.contract.salary)+' / '+d.contract.years+' 年',contract(d,'signDriver')]),'driver-market')}`)}`;
}
