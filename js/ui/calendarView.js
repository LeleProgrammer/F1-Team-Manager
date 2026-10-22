// ===== 文件: js/ui/calendarView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  currentEvent, currentTrack
}
from '../core/calendar.js';
import {
  trackForYear
}
from '../data/tracks.js';
import {
  SESSION_NAMES
}
from '../data/i18n.js';
import {
  h, header, panel, badge, button, field, select, link, table, number, empty, tyreField, tyreInventory, tyreLegend, icon
}
from './uiKit.js';
export function calendarView(s) {
  const t=teamOf(s),event=currentEvent(s),track=currentTrack(s),w=s.calendar.weekend;
  let body='';
  if(s.season.offseason) {
    body=panel('转会窗与技术规则',`<p>${h(s.season.nextRules)}</p><p>请续约车手与领队，或签入替代人选。现金及研发技术储备延续，部件配额和预算帽在新赛季重置。</p><div class="actions">${link('车手转会','drivers')}${link('员工合同','staff')}${button('进入下一赛季','nextSeason',{}, {class:'primary',confirm:'确认阵容后进入下一赛季。未交付的本季项目将取消，不退回费用。确认？'})}</div>`);
  }
  else if(event) {
    body=panel('R'+String(event.round).padStart(2,'0')+' · '+track.name,`<div class="stats-grid compact"><div><small>比赛日期</small><strong>${h(event.date)}</strong></div><div><small>距离</small><strong>${track.length} km × ${track.laps} 圈</strong></div><div><small>维修区</small><strong>${track.pitSpeed} km/h · ${track.pitLength}m</strong></div><div><small>进站通行损失</small><strong>${track.pitLoss} 秒 + 停站</strong></div></div><p class="muted">${w?'发车路面积水预估 '+number((w.weatherStart||0)*100)+'% · ':''}${h(track.notes)} · DRS ${track.drs} 区 · 轮胎磨耗 ×${track.wear} · 降雨倾向 ${number(track.rain*100)}%</p>${w?`<div class="session-strip">${w.sessions.map((x,i)=>`<span class="${i<w.index?'done':i===w.index?'current':''}">${i<w.index?'✓ ':''}${h(SESSION_NAMES[x])}</span>`).join('')}</div><div class="actions">${w.index>=w.sessions.length?button('完成本站结算','closeWeekend',{}, {class:'primary'}):link('进入比赛指挥','race','primary')}</div>`:`<div class="actions">${button('进入比赛周末','enterWeekend',{}, {class:'primary'})}${button('推进工厂 7 天','wait',{days:7})}</div><p class="muted">进入周末会自动推进至赛前两天，并结算工厂、训练、薪资和赞助。期间阵容与新部件登记将锁定。</p>`}`);
    if(w) {
      const current=w.sessions[w.index];
      if(current?.startsWith('FP'))body+=panel('练习与设定采集',`<div class="grid-2">${t.drivers.map((id,slot)=>`<form data-form="setup" class="setup-form"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><input type="hidden" name="slot" value="${slot}">${['前翼角度','尾翼角度','悬挂软硬','胎压 / 能量倾向'].map((label,i)=>{const c=w.confidence[t.id][slot][i];return field(label,`<div class="range-row"><input type="range" name="v${i}" min="0" max="100" value="${w.setups[t.id][slot][i]}" aria-label="${h(label)}"><output>${Math.round(w.setups[t.id][slot][i])}</output></div>`,`采集置信区间 ${number(c.low)}—${number(c.high)}，非精确最优值`);}).join('')}<button type="submit" class="btn">保存设定</button></form>`).join('')}</div><div class="actions">${button('执行 '+SESSION_NAMES[current],'practice',{}, {class:'primary'})}</div>`);
      body+=panel('策略工作台',`${tyreLegend()}<div class="grid-2">${t.drivers.map(id=>{const p=w.strategy[id];return `<form data-form="strategy" class="setup-form"><input type="hidden" name="id" value="${h(id)}"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><div class="form-grid">${tyreField('起步轮胎','start',p.start)}${field('计划首停',`<input name="pitLap" type="number" min="1" max="${track.laps}" value="${p.pitLap}" required>`)}${field('第二次进站（0 为取消）',`<input name="secondLap" type="number" min="0" max="${track.laps}" value="${p.secondLap}" required>`)}${tyreField('进站新胎','next',p.next)}${field('备选方案',select('backup',[['A','A · 严格执行窗口'],['B','B · 安全车低价停站'],['C','C · 自动应对降雨']],p.backup))}${tyreField('雨胎预案','rain',p.rain,{codes:['I','W']})}</div><label class="check"><input type="checkbox" name="auto" ${p.auto?'checked':''}>工程师自动管理比赛策略</label><p class="muted">${s.season.year>=2025&&track.id==='monaco'?'摩纳哥要求至少两次停站。':'干燥正赛必须使用至少两种干胎；雨战豁免。'}</p><div class="inventory-heading">${icon('tyre')}新胎库存</div>${tyreInventory(w.tyres[id])}<button type="submit" class="btn">保存策略</button></form>`;}).join('')}</div>`);
    }
  }
  return `${header('赛历与准备','比赛周末',s.season.year>2025?'架空生涯使用 2025 赛历，技术规则在 2026 进入游戏化新规模型。':'按历史实际举行的赛历：2022 / 2023 共 22 站，2024 / 2025 共 24 站。')}${body}${panel('完整赛历',table(['站次','大奖赛','城市','日期','赛制','状态 / 冠军'],s.calendar.events.map((e,i)=>{const tr=trackForYear(e.track,Math.min(s.season.year,2025));return [String(i+1).padStart(2,'0'),h(tr.name),h(tr.city),h(e.date),badge(e.sprint?'冲刺':'标准',e.sprint?'accent':''),e.completed?'✓ '+h(e.result?.rows[0]?.name||'完成'):badge(i===s.calendar.round?'下一站':'待举行',i===s.calendar.round?'accent':'')];}),'season-calendar'))}`;
}
