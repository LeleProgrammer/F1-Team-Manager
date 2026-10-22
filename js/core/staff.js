// ===== 文件: js/core/staff.js =====
import {
  ROLES, TRAITS, STAFF_POOL
}
from '../data/staff-data.js';
import {
  between, chance, choose
}
from './rng.js';
import {
  uid, clamp, news, teamOf, requireCondition, rosterMutable
}
from './helpers.js';
import {
  spend, income
}
from './finance.js';
export function staffAbility(s,teamId,role) {
  const group=s.staff.filter(x=>x.teamId===teamId&&x.role===role);
  return group.length?group.reduce((a,x)=>a+x.ability*(.8+x.morale*.002),0)/group.length:45;
}
export function seedStaff(s,t) {
  for(const [i,role]of Object.keys(ROLES).entries())s.staff.push({
    id:uid(s,'staff'),name:STAFF_POOL[(i+t.logo)%STAFF_POOL.length].name,role,teamId:t.id,ability:clamp(t.performance+between(s,-10,2),50,95),trait:Object.keys(TRAITS)[i%7],salary:.45+(t.performance-60)*.035,years:2,morale:78,loyalty:between(s,55,90)
  });
}
export function hireStaff(s,id,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),candidate=s.staff.find(x=>x.id===id);
  requireCondition(candidate&&candidate.teamId!==t.id,'员工不可签约');
  requireCondition(Number.isFinite(salary)&&salary>=.1&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const occupied=s.staff.filter(x=>x.teamId===t.id&&x.role===candidate.role).length;
  requireCondition(occupied<2,'同一岗位最多两位员工，请先解约');
  const willing=clamp(.35+(salary/candidate.salary-1)*.55+(t.reputation-candidate.ability)*.012, .08,.98);
  if(!chance(s,willing)) {
    news(s,`${candidate.name} 拒绝了报价；提高薪资或提升车队声望后可再次谈判`,'warning');
    return '谈判未达成';
  }
  const fee=candidate.teamId?candidate.salary*candidate.years*.6:0;
  spend(s,t,fee,'员工签约违约金',true);
  if(candidate.teamId)income(s,teamOf(s,candidate.teamId),fee,'员工转会补偿');
  Object.assign(candidate,{
    teamId:t.id,salary,years,morale:85,loyalty:65
  });
  news(s,`${candidate.name} 加盟 ${t.name}，担任${ROLES[candidate.role]}`);
  return '签约成功';
}
export function renewStaff(s,id,salary,years) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  requireCondition(Number.isFinite(salary)&&salary>=e.salary*.95&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价需至少为原薪资的 95%，年限 1—5 年');
  e.salary=salary;
  e.years=years;
  e.morale=clamp(e.morale+7);
  e.loyalty=clamp(e.loyalty+10);
  return '员工已续约';
}
export function fireStaff(s,id) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  spend(s,teamOf(s),e.salary*e.years*.5,'员工解约补偿',true);
  e.teamId=null;
  e.morale=55;
  return '员工合同已解除';
}
export function staffEvents(s) {
  for(const e of s.staff.filter(x=>x.teamId)) {
    e.morale=clamp(e.morale+between(s,-2,2));
    if(e.loyalty<65&&chance(s,.003)) {
      const buyer=choose(s,s.teams.filter(t=>t.id!==e.teamId));
      if(s.finance[buyer.id].cash>e.salary*3) {
        const old=teamOf(s,e.teamId);
        spend(s,buyer,e.salary,'员工挖角补偿',true);
        income(s,old,e.salary,'员工离职补偿');
        e.teamId=buyer.id;
        e.salary*=1.2;
        e.loyalty=80;
        news(s,`${e.name} 接受 ${buyer.name} 报价，离开 ${old.name}`,'warning');
      }
    }
  }
}
