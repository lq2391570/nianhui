// pages/myLottery/myLottery.js
var util = require("../../utils/util.js")
var api = require("../../utils/api1.js")
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:"我的抽奖",
    awardMes:{},
    titleArray:[]
  },
  backNav: function () {
    console.log("返回")
    wx.navigateBack({
      delta: 3
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getMyAwardMes()
  },
  //获得我的抽奖信息
  getMyAwardMes(){
     let that = this
     let param = {
       userToken: app.globalData.userMes.userToken
     }
    api.awardMes(param,res=>{
      console.log(res)
      if (res.code == 0){
        that.setData({
          awardMes:res,
          titleArray:res.levels
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})