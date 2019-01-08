// pages/aEndSignPage/aEndSignPage.js
import { $wuxCountDown } from "../../miniprogram_npm/wux-weapp/index.js"
import { $wuxBackdrop } from '../../miniprogram_npm/wux-weapp/index.js'
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index.js'
var api = require("../../utils/api1.js")
var util = require("../../utils/util.js")
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    haveBackBtn:true,
    pool: 0,
    userMes: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userMes = app.globalData.userMes
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
    //获取登录信息
    util.getUserCode(code => {
      let that = this
      var myAvatar = ""
      var mynickName = ""
      if (app.globalData.userInfo) {
        myAvatar = app.globalData.userInfo.avatarUrl
        mynickName = app.globalData.userInfo.nickName
      }
      let param = {
        code: code,
        type: "weiapp",
        avatar: myAvatar,
        nickName: mynickName
      }
      console.log("code=", code)
      api.userLogin(param, res => {
        console.log("newMsgOnload", res)
        if (res.code == 0){
          app.globalData.userMes = res
          that.setData({
            userMes: app.globalData.userMes,
            pool: res.money
          })
        }else{
          wx.showToast({
            title: res.msg,
          })
        }
      }, fail => {
        wx.showToast({
          title: '服务器开小差了',
        })
      })
    })
  },
  inject() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  signBtnClick(){
     console.log("签到点击")
     //当前状态 -1未报名，0已报名，1已确认，2已签到，3活动中 4确认不
    if (this.data.userMes.catalog == -1){
      wx.showToast({
        title: '未报名',
      })
    }else if (this.data.userMes.catalog == 0 || this.data.userMes.catalog == 1){
      //跳转二维码界面
      // wx.navigateTo({
      //   url: '../signCodePage/signCodePage',
      // })
      wx.redirectTo({
        url: '../signCodePage/signCodePage',
      })
    } else if (this.data.userMes.catalog == 4){
      wx.showToast({
        title: "您确定不来",
      })
    } else if (this.data.userMes.catalog == 2){
      //已签到（进入座位界面）
      // wx.navigateTo({
      //   url: '../succeedSignIn/succeedSignIn',
      // })
      wx.redirectTo({
        url: '../newFirstPage/newFirstPage',
      })
    }

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
  onShareAppMessage: function () {
    return {
      title: '中北年会小程序',
      path: 'pages/startPage/startPage'
    }
  }
})