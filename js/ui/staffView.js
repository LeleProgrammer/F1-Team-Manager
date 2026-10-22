// ===== 文件: js/ui/staffView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  ROLES, TRAITS
}
from '../data/staff-data.js';
import {
  staffAbility
}
from '../core/staff.js';
import {
  h, header, panel, table, money, number, badge, progress, button
}
from './uiKit.js';
function contract(e,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(e.id)}">${kind==='hireStaff'?'谈判签约':'续约'}</button>`;
}
export function staffView(s) {
  const t=teamOf(s),own=s.staff.filter(e=>e.teamId===t.id),market=s.staff.filter(e=>e.teamId!==t.id);
  return `${header('组织与合同','人员管理','所有员工均为虚构人物；岗位能力与特质实际参与研发、设定、进站及成长计算。')}
 <div class="stats-grid">${[['technical','研发主管'],['engineer','比赛工程'],['mechanics','维修区'],['academy','青训']].map(([role,label])=>`<div class="stat"><span class="label">${label}</span><strong>${number(staffAbility(s,t.id,role))}</strong><small>缺编时以 45 能力应急运作</small></div>`).join('')}</div>
 ${panel('现任员工',table(['姓名 / 岗位','能力 / 士气','特质','年薪','合同','忠诚','操作'],own.map(e=>[`<strong>${h(e.name)}</strong><small>${h(ROLES[e.role])}</small>`,`<strong>${number(e.ability)}</strong><small>士气 ${number(e.morale)}</small>`,`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span><small>${h(TRAITS[e.trait].description)}</small>`,money(e.salary),e.years+' 年',number(e.loyalty),contract(e,'renewStaff')+' '+button('解约','fireStaff',{id:e.id},{class:'small danger',confirm:`解约 ${e.name}，支付剩余薪资 50% 的补偿。缺编会降低对应效率。确认？`})]),'own-staff'))}
 ${panel('员工市场与挖角',`<div class="filter-row"><input type="search" data-filter="staff-market" aria-label="搜索员工" placeholder="搜索姓名、岗位、特质或所在车队"><span class="muted">有合同员工需支付 60% 剩余薪资作为违约金</span></div>${table(['姓名','岗位','能力','特质','现任车队','年薪','操作'],market.map(e=>[h(e.name),h(ROLES[e.role]),number(e.ability),`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span>`,h(s.teams.find(t=>t.id===e.teamId)?.name||'自由员工'),money(e.salary),contract(e,'hireStaff')]),'staff-market')}`)}`;
}
