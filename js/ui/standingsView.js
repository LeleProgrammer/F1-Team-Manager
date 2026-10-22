// ===== 文件: js/ui/standingsView.js =====
import {
  teamOf, teamStandings, driverStandings
}
from '../core/helpers.js';
import {
  h, header, panel, table, badge, progress, time, empty, lapDisplay, rankBadge, icon
}
from './uiKit.js';
export function standingsView(s) {
  const teams=teamStandings(s),drivers=driverStandings(s),current=s.history.races.filter(r=>r.kind==='RACE'&&s.calendar.events.some(e=>e.result?.rows[0]?.driverId===r.rows[0]?.driverId&&e.result?.track===r.track));
  return `${header('锦标赛档案',s.season.year+' 赛季积分榜','同分按正赛最高名次次数逐级比较；同样成绩时按既有种子顺序排列。')}
 ${progress(s.calendar.round,s.calendar.events.length,'赛季进度 '+s.calendar.round+' / '+s.calendar.events.length)}
 <div class="grid-2">${panel('制造商积分',table(['名次','车队','积分','正赛冠军'],teams.map((t,i)=>[rankBadge(i+1)+(t.id===s.player.teamId?' '+badge('本队','info'):''),`<span class="team-line" style="--row-color:${h(t.color)}"></span>${h(t.name)}`,'<strong>'+t.points+'</strong>',t.wins]),'constructors','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}${panel('车手积分',table(['名次','车手','车队','积分','冠军','最快圈'],drivers.map((d,i)=>[rankBadge(i+1),h(d.name),h(s.teams.find(t=>t.id===d.teamId)?.abbr||'自由车手'),'<strong>'+d.points+'</strong>',d.wins,`<span class="metric tone-fastest">${icon('stopwatch')}${d.fastest}</span>`]),'drivers-standings','',drivers.map(d=>d.teamId===s.player.teamId?'player-row':'')))}</div>
 ${panel('车队积分走势',`<canvas data-chart="points" data-type="line" data-height="220" aria-label="本队积分走势"></canvas>`)}
 ${panel('每站积分明细',table(['车队',...s.calendar.events.map((e,i)=>'R'+(i+1))],teams.map(t=>[h(t.name),...s.calendar.events.map((e,i)=>t.results.filter(r=>r.round===i+1).reduce((a,r)=>a+r.points,0)||'—')]),'round-points','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}
 ${panel('分站档案',s.history.races.length?table(['站次','赛道','场次','冠军','最快圈','报告'],s.history.races.map((r,i)=>[r.round,h(r.track),r.kind==='SPRINT'?'冲刺':'正赛',h(r.rows[0]?.name||'无'),lapDisplay(r.fastest.time,{fastest:true}),`<button class="btn small" data-report="${i}">查看成绩</button>`]),'race-archive'):empty('比赛结束后，这里将保存分站冠军、最快圈与完整报告。'))}
 ${panel('荣誉室与历年记录',s.history.seasons.length?table(['赛季','制造商冠军','车手冠军','本队名次'],s.history.seasons.map(x=>[x.year,h(x.teams[0]?.name),h(x.drivers[0]?.name),'P'+x.playerRank])):empty('完成首个赛季后，年度排名与冠军将进入荣誉室。'))}`;
}
