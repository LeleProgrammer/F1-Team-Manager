// ===== 文件: js/data/staff-data.js =====
export const ROLES = {
  principal:'车队领队',technical:'技术总监',aero:'空气动力主管',performance:'性能主管',reliability:'可靠性主管',engineer:'比赛工程师',analyst:'性能工程师',strategy:'策略主管',mechanics:'维修区机械师',sporting:'运动总监',academy:'青训主管',marketing:'市场赞助主管'
};
export const TRAITS = {
  pit:{
    name:'进站大师',description:'停站时间减少 0.15 秒'
  },aggressive:{
    name:'激进研发',description:'研发速度 +10%，失败风险 +5%'
  },tyre:{
    name:'轮胎低语者',description:'轮胎磨损 -5%'
  },money:{
    name:'摇钱树',description:'赞助收入 +8%'
  },calm:{
    name:'沉稳',description:'车手失误概率 -10%'
  },mentor:{
    name:'育成专家',description:'青训成长 +20%'
  },precise:{
    name:'数据专家',description:'练习采集误差 -15%'
  }
};
// 虚构员工，避免对真实工程师合同与能力作伪精确推断。
const names=['林远','Elias Weber','Sofia Rossi','陈翊','Amelia Clarke','Hugo Martin','Marco Bellini','Anna Fischer','Lucas Moreau','松田 凛','James Reed','Eva Laurent','Noah Silva','周宁','Luca Bianchi','Mia Evans','Daniel König','Oliver Walsh','Elena Costa','Leo Park','高桥 悠','Isabel Santos','Max Keller','许知行'];
export const STAFF_POOL = names.map((name,i)=>({
  id:'market-'+i,name,role:Object.keys(ROLES)[i%12],ability:65+(i*7)%31,trait:Object.keys(TRAITS)[i%7],salary:0.45+(i*7%31)*0.045,loyalty:55+i%30,morale:75,years:2
}));
