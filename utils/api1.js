import url from "./url1.js";
import http from "./http1.js";

var api = {
  //用户登录
  userLogin:function(param,success,fail){
    return http.post(url.userLoginUrl,param,success,fail);
  },
  //发送弹幕
  postTalk:function(param,success,fail){
    return http.post(url.postTalkUrl,param,success,fail);
  },
  //二次确认
  secondEnsure:function(param,success,fail){
    return http.post(url.secondEnsureUrl,param,success,fail);
  },
  //更新游戏分数
  updateScore:function(param,success,fail){
    return http.post(url.updateScoreUrl,param,success,fail);
  },
  //节目信息
  programMes:function(param,success,fail){
    return http.post(url.programPageUrl,param,success,fail)
  },
  //节目投票
  programAddVote:function(param,success,fail){
    // return http.post(url.programAddVoteUrl,param,success,fail)
    return http.post_json(url.programAddVoteUrl, param, success, fail)
  },
  //节目投票结果
  programVoteResult:function(param,success,fail){
    return http.post(url.programVoteResultUrl,param,success,fail)
  },
  //快速报名
  quickApply:function(param,success,fail){
    return http.post(url.quickApplyUrl,param,success,fail)
  },
  //奖品信息
  awardMes:function(param,success,fail){
    return http.post(url.awardMesUrl, param, success, fail)
  },
  //快快速报名
  quickquickApply:function(param,success,fail){
    return http.post(url.quickquickApplyUrl, param, success, fail)
  }
}
module.exports = api;