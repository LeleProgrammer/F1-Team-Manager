// ===== 文件: js/data/sponsors.js =====
// 赞助商均为虚构品牌；金额单位：百万美元。
export const SPONSORS = [ {
  id:'apex',name:'APEX 科技',kind:'主赞助',min:75,base:15,goal:'podium',bonus:2
}, {
  id:'orbit',name:'ORBIT 云计算',kind:'主赞助',min:55,base:11,goal:'points',bonus:0.7
}, {
  id:'nova',name:'NOVA 能源',kind:'主赞助',min:0,base:8,goal:'finish',bonus:0.15
}, {
  id:'vector',name:'VECTOR 工程',kind:'技术伙伴',min:0,base:3,goal:'q3',bonus:0.5
}, {
  id:'pulse',name:'PULSE 通讯',kind:'技术伙伴',min:55,base:4,goal:'points',bonus:0.5
}, {
  id:'zenith',name:'ZENITH 精密',kind:'技术伙伴',min:70,base:5,goal:'win',bonus:3
}, {
  id:'arc',name:'ARC 出行',kind:'技术伙伴',min:0,base:2.5,goal:'finish',bonus:0.12
} ];
export const SPONSOR_GOALS = {
  podium:'正赛登上领奖台',points:'正赛获得积分',finish:'正赛至少一车完赛',q3:'进入 Q3',win:'赢得正赛'
};
