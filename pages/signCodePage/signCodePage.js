// pages/signCodePage/signCodePage.js
var api = require("../../utils/api1.js")
//获取应用实例
const app = getApp()
// var interval1 = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    interval1:""
  },
  //开启一个定时器刷新状态
  reflashSignState() {
    this.data.interval1 = setInterval(() => {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          let param = {
            code: res.code,
            type: "weiapp"
          }
          api.userLogin(param, res => {
            console.log(res)
            if (res.catalog == 2){
              //已签到（跳转座位界面）
                wx.redirectTo({
                  url: '../succeedSignIn/succeedSignIn',
                })
              clearInterval(this.data.interval1)
            }
          })
        }
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reflashSignState()
   this.setData({
     signCodeImageUrl: app.globalData.userMes.signCode
   })
  },
  backNav: function () {
    console.log("返回")
    
    // wx.redirectTo({
    //   url: '../newFirstPage/newFirstPage',
    // })
    wx.reLaunch({
      url: '../aEndSignPage/aEndSignPage',
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
    clearInterval(this.data.interval1)
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
  onShareAppMessage: function () {

  }
})