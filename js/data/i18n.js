// ===== 文件: js/data/i18n.js =====
export const NAV = [['dashboard','总览','grid'],['car','车辆','car'],['rnd','研发','flask'],['staff','人员','users'],['drivers','车手','helmet'],['finance','财务','wallet'],['calendar','赛历','calendar'],['race','比赛指挥','flag'],['standings','积分档案','trophy'],['save','存档','save']];
export const SESSION_NAMES = {
  FP1:'第一节练习',FP2:'第二节练习',FP3:'第三节练习',Q:'正赛排位',SQ:'冲刺排位',SPRINT:'冲刺赛',RACE:'正赛',DONE:'周末结束'
};
export const DIFFICULTIES = {
  easy:{
    name:'简单',ai:0.82,mistake:0.8,tolerance:1.5,cap:1.06
  },standard:{
    name:'标准',ai:1,mistake:1,tolerance:1,cap:1
  },hard:{
    name:'硬核',ai:1.2,mistake:1.2,tolerance:0.75,cap:0.98
  }
};
