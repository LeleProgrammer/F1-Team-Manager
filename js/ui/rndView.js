// ===== 文件: js/ui/rndView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  projectQuote, factoryCapacity, projectCapacity, researchUnlocked, facilityCost, departmentCost
}
from '../core/rnd.js';
import {
  PARTS, FACILITIES, DEPARTMENTS
}
from '../data/parts.js';
import {
  h, header, panel, stat, money, number, badge, progress, button, field, select, empty
}
from './uiKit.js';
export function rndView(s) {
  const t=teamOf(s),researchOpen=researchUnlocked(s);
  return `${header('技术中心','把想法变成圈速','研发 → 验证 → 制造 → 单车装配。只生产一套时，升级只能先用于一台车。')}
 <div class="stats-grid">${stat('风洞额度',t.wind.used+' / '+t.wind.limit,'按上赛季排名分配')}${stat('CFD 额度',t.cfd.used+' / '+t.cfd.limit,'研发立项时扣除')}${stat('制造能力',factoryCapacity(t)+' 产能日 / 天','零件按队列依次生产')}${stat('下季研究',researchOpen?'已开放':'尚未开放','赛季进度达到 55% 后开放')}</div>
 <div class="actions test-overrun">${button('违规增加试验额度','overrun',{}, {disabled:!!t.wind.overrun,reason:t.wind.overrun?'本季已被处罚':'',confirm:'违规增加风洞 45 / CFD 60 额度，立即罚款 $5m（不计入预算帽），董事会信心 -10。确认承担处罚？'})}</div><div class="grid-2">${panel('研发项目库',`<form data-form="project" class="form-grid">${field('目标部件',select('part',PARTS.map(p=>[p.id,p.name+(t.type==='customer'&&p.department==='power'?' · 客户不可研制':''),t.type==='customer'&&p.department==='power'||s.season.year>=2026&&p.id==='mguh']),'floor'))}${field('项目方向',select('kind',[['development','本季升级'],['research','下赛季前期研究',!researchOpen]],'development'))}${field('生产套数',select('copies',[[2,'两套 · 双车装配'],[1,'一套 · 单车优先']],2))}<div class="field"><span>立项说明</span><p class="muted">同时运行 ${projectCapacity(t)} 项。费用包含制造预付，失败退还制造部分。</p></div><button class="btn primary" type="submit">核对报价并立项</button></form><div class="project-library">${PARTS.filter(p=>!(t.type==='customer'&&p.department==='power')&&!(s.season.year>=2026&&p.id==='mguh')).map(p=>{const q=projectQuote(s,t,p.id);return `<div class="project-row"><div><strong>${h(p.name)}</strong><small>${h(DEPARTMENTS[p.department])} · V${q.level}</small></div><span>${money(q.cost+q.manufacturing)}</span><span>${q.days} 天</span><span>+${number(q.gain)}</span></div>`;}).join('')}</div>`)}
 ${panel('进行中的项目',t.projects.length?t.projects.slice().reverse().slice(0,16).map(p=>`<article class="project-card"><div class="split"><h3>${h(PARTS.find(x=>x.id===p.part).name)} · V${p.level}</h3>${badge({researching:'研发中',complete:'完成',failed:'失败',cancelled:'已叫停'}[p.status],p.status==='complete'?'success':'')}</div><p class="muted">${p.kind==='research'?'下季研究':'本季升级'} · ${p.copies} 套 · 失败风险 ${number(p.risk*100)}%</p>${progress(p.progress)}<p>剩余 ${Math.max(0,p.remaining).toFixed(1)} 天</p>${p.status==='researching'?`<div class="actions">${button('追加投入','projectChange',{id:p.id,operation:'boost'},{disabled:p.boosted,confirm:'花费原研发费用的 30%，缩短剩余工期 30%，增加失败风险。确认？'})}${button('风险审查','projectChange',{id:p.id,operation:'safe'},{disabled:p.safer,confirm:'花费原研发费用的 15%，降低风险并延长剩余工期。确认？'})}${button('叫停','projectChange',{id:p.id,operation:'cancel'},{class:'danger',confirm:'终止该项目，只退回制造预付，研发支出不退。确认？'})}</div>`:''}</article>`).join(''):empty('选择一个部件，启动第一项研发。'))}</div>
 ${panel('工厂设施',`<div class="facility-grid">${Object.entries(FACILITIES).map(([id,def])=>{const f=t.facilities[id];return `<article class="facility"><div class="split"><h3>${h(def.name)}</h3>${badge('Lv.'+f.level)}</div><p class="muted">${h(def.effect)}</p><p>${money(facilityCost(t,id))} · 不计入预算帽</p>${f.building?`${progress(f.building.total-f.building.remaining,f.building.total)}<p>建造剩余 ${f.building.remaining} 天</p>`:button(f.level>=6?'已满级':'升级设施','facility',{id},{disabled:f.level>=6,confirm:`升级 ${def.name}，支出 ${money(facilityCost(t,id))}，不计入预算帽。确认？`})}</article>`;}).join('')}</div>`)}
 ${panel('研发部门',`<div class="facility-grid">${Object.entries(DEPARTMENTS).map(([id,label])=>{const d=t.departments[id];return `<article class="facility"><h3>${h(id==='power'&&t.type==='customer'?'引擎供应商支持':label)}</h3><p>等级 ${d.level} · ${d.people} 人 · ${h(d.supervisor)}</p>${button('扩编 '+money(departmentCost(t,id)),'department',{id},{disabled:d.level>=6,confirm:'部门扩编计入预算帽。确认支出？'})}</article>`;}).join('')}</div>`)}`;
}
