// ===== 文件: js/core/helpers.js =====
export const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
export const copy=x=>JSON.parse(JSON.stringify(x));
export function uid(s,prefix) {
  s.nextId=(s.nextId||0)+1;
  return prefix+'-'+s.nextId;
}
export function news(s,text,type='info') {
  s.news.unshift({
    id:uid(s,'news'),day:s.calendar?.day||0,date:s.calendar?.date||'',text,type
  });
  s.news.length=Math.min(120,s.news.length);
}
export function teamOf(s,id=s.player.teamId) {
  const t=s.teams.find(t=>t.id===id);
  if(!t)throw new Error('车队不存在');
  return t;
}
export function driverOf(s,id) {
  const d=s.drivers.find(d=>d.id===id);
  if(!d)throw new Error('车手不存在');
  return d;
}
export function requireCondition(ok,message) {
  if(!ok)throw new Error(message);
}
export function mutable(s) {
  requireCondition(!s.race||s.race.finished,'比赛进行中：请先完成比赛');
  requireCondition(!s.season.gameOver,'本次生涯已结束，可读取存档或重新开局');
}
export function rosterMutable(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend||s.season.offseason,'比赛周末已登记阵容，请在周末结算后签约');
}
export function ties(a,b) {
  const n=Math.max(a.results?.length||0,b.results?.length||0,30);
  for(let p=1; p<=n; p++) {
    const ca=(a.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    const cb=(b.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    if(ca!==cb)return cb-ca;
  }
  return (a.previousRank||99)-(b.previousRank||99)||String(a.id).localeCompare(String(b.id));
}
export function teamStandings(s) {
  return s.teams.slice().sort((a,b)=>b.points-a.points||ties(a,b));
}
export function driverStandings(s) {
  return s.drivers.filter(d=>d.teamId||d.points||d.results.length).slice().sort((a,b)=>b.points-a.points||ties(a,b));
}
