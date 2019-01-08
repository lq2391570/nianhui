// var rootUrl = "https://2019.ccnc.cc/rest/member/";
var rootMemberUrl = "https://2019.maotouin.com/rest/member/"
var rootTopicUrl = "https://2019.maotouin.com/rest/topic/"
var rootGameUrl = "https://2019.ccnc.cc/rest/game/"
var rootProgramUrl = "https://2019.ccnc.cc/rest/program/"
var rootAwardUrl = "https://2019.ccnc.cc/rest/award/"
var url = {
  //通过第三方登陆
  userLoginUrl: rootMemberUrl + "loginoauth.htm",
  //发送弹幕
  postTalkUrl: rootTopicUrl + "post.htm",
  //嘉宾二次确认
  secondEnsureUrl: rootMemberUrl + "confirm.htm",
  //更新游戏分数
  updateScoreUrl: rootGameUrl + "score.htm",
  //获取节目信息
  programPageUrl: rootProgramUrl + "page.htm",
  //投票
  programAddVoteUrl: rootProgramUrl + "programAddVote.htm",
  //投票结果
  programVoteResultUrl: rootProgramUrl + "my.htm",
  //快速报名
  quickApplyUrl: rootMemberUrl + "fast.htm",
  //中奖信息
  awardMesUrl: rootAwardUrl + "award.htm",
  //快快速报名
  quickquickApplyUrl: rootMemberUrl + "quick.htm"
} 
module.exports = url