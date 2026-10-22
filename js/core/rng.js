// ===== 文件: js/core/rng.js =====
export function seedFrom(value) {
  let h=2166136261;
  for(const c of String(value)) {
    h^=c.charCodeAt(0);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
} // Mulberry32：仅修改可序列化状态 s.rng，保存/加载后继续同一随机序列。
export function random(s) {
  s.rng=(s.rng+0x6D2B79F5)>>>0;
  let t=s.rng;
  t=Math.imul(t^(t>>>15),t|1);
  t^=t+Math.imul(t^(t>>>7),t|61);
  return ((t^(t>>>14))>>>0)/4294967296;
}
export function between(s,a,b) {
  return a+(b-a)*random(s);
}
export function integer(s,a,b) {
  return Math.floor(between(s,a,b+1));
}
export function chance(s,p) {
  return random(s)<p;
}
export function choose(s,items) {
  return items[integer(s,0,items.length-1)];
}
// 只在新生涯向导点击“生成种子”时使用时钟作为初始熵；比赛中不调用。
export function generateSeed(){const source={rng:seedFrom(String(Date.now()))};return 'PIT-'+integer(source,10000000,99999999).toString(36).toUpperCase();}
