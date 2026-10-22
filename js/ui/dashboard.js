// ===== 文件: js/ui/dashboard.js =====
import {
  teamOf, driverOf, teamStandings
}
from '../core/helpers.js';
import {
  currentEvent, currentTrack
}
from '../core/calendar.js';
import {
  SESSION_NAMES
}
from '../data/i18n.js';
import {
  h, header, panel, stat, money, badge, progress, link, button, carArt, number
}
from './uiKit.js';
export function dashboard(s) {
  const t=teamOf(s),f=s.finance[t.id],event=currentEvent(s),track=currentTrack(s),rank=teamStandings(s).findIndex(x=>x.id===t.id)+1,w=s.calendar.weekend;
  const active=t.projects.filter(p=>p.status==='researching');
  const objectives=t.objectives;
  return `${header('指挥中心 / '+s.season.year,'车队控制中心','从工厂到终点线，每一次决策都算数。',link(w?'进入比赛周末':'准备下一站','calendar','primary'))}
 <section class="hero"><div class="hero-copy"><p class="eyebrow">${h(t.abbr)} / ${h(t.type==='factory'?'厂商车队':'客户车队')}</p><h2>${h(t.name)}</h2><p>${h(t.hq)}</p><div class="hero-badges">${badge('制造商第 '+rank+' 名','accent')}${badge(t.points+' 积分')}${badge('声望 '+number(t.reputation))}</div></div><div class="hero-visual"><div class="telemetry-grid"></div>${carArt(t.color)}<span class="visual-label">本季赛车 · 规格 ${Math.max(...Object.values(s.parts[t.id].cars[0]).map(x=>x.level))}</span></div></section>
 <div class="stats-grid">${stat('可用现金',money(f.cash),'现金流决定车队生存')}${stat('预算帽余额',money(f.capLimit-f.capUsed),'支出与现金独立核算',f.capUsed>f.capLimit?'danger':'')}${stat('董事会信心',number(t.confidence)+' / 100',t.confidence<30?'董事会要求立即改善':'管理层持续评估赛季表现')}${stat('研发运行中',active.length+' 项',s.parts[t.id].stock.length+' 件新规格待装车')}</div>
 <div class="grid-2"><div>${panel('下一站',event?`<div class="next-race"><span class="round-mark">${String(event.round).padStart(2,'0')}</span><div><p class="eyebrow">${h(event.date)} ${event.sprint?' · 冲刺周末':''}</p><h3>${h(track.name)}大奖赛</h3><p class="muted">${h(track.city)} · ${track.length} km · ${track.laps} 圈</p></div></div><p class="muted">${h(track.notes)}</p><div class="actions">${badge(w?SESSION_NAMES[w.sessions[w.index]]||'等待结算':'赛前工厂阶段','accent')}${link('赛历与策略','calendar')}</div>`:`<p>本赛季已经结束。${h(s.season.nextRules)}</p>${link('前往转会窗','drivers','primary')}`)}
 ${panel('赛季目标',`<div class="objective"><span>制造商前 ${objectives.target}</span>${badge('当前 P'+rank,rank<=objectives.target?'success':'')}</div>${progress(objectives.points, t.custom?1:Math.max(10,150-rank*10),'赛季积分 '+objectives.points)}${progress(objectives.finish,s.calendar.events.length*2,'双车完赛记录 '+objectives.finish)}<p class="muted">${t.custom?'首季优先完成全年运营，争取首个积分。':'持续获得积分、控制现金与预算帽，保持董事会信任。'}</p>`)}
 ${panel('待办提醒',`<ul class="todo"><li>${active.length<2?'研发有空槽，技术中心可以启动新项目。':'研发部门正在执行项目。'}</li><li>${s.parts[t.id].stock.length?'有新规格部件可装车。':'当前没有等待装车的新规格。'}</li><li>${t.drivers.some(id=>driverOf(s,id).contract.years<=1)?'主力车手合同将到期，请安排续约。':'主力车手合同稳定。'}</li><li>${f.cash<20?'现金低于 $20m，可向董事会申请一次紧急注资。':'现金流维持正常。'}</li></ul>`)}</div>
 <div>${panel('性能轮廓',`<canvas data-chart="performance" data-type="radar" data-height="245" aria-label="赛车性能雷达图"></canvas><p class="chart-note">0—100 · 当前一号车装车性能 · 非官方评分</p>`)}${panel('主力阵容',t.drivers.map((id,i)=>{const d=driverOf(s,id);return `<article class="driver-mini"><span class="driver-number">${h(d.number)}</span><div><h3>${h(d.name)}</h3><p class="muted">${h(d.nationality)} · ${d.age} 岁 · 合同 ${d.contract.years} 年</p></div><strong>${number(d.attributes.pace)}</strong><div class="full">${progress(d.morale,100,'士气')}</div></article>`;}).join(''))}${panel('预算帽使用',`<div class="split"><strong>${money(f.capUsed)}</strong><span class="muted">/ ${money(f.capLimit)}</span></div>${progress(f.capUsed,f.capLimit)}<p class="muted">研发、制造、薪资、运营计入；设施与担保金不计入。</p>`)}</div></div>
 ${panel('车队通讯',`<div class="news-list">${s.news.slice(0,8).map(n=>`<div class="news-item"><span class="news-dot ${h(n.type)}"></span><time>${h(n.date)}</time><p>${h(n.text)}</p></div>`).join('')}</div>`,badge('最近 '+Math.min(8,s.news.length)+' 条'))}`;
}
