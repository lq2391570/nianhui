// pages/startPage/startPage.js
var util = require("../../utils/util.js")
var api = require("../../utils/api1.js")
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isEmpower:false,
    userMes: {},
  },
  onGotUserInfo(e){
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      //用户授权
      console.log("授权了进入中北年会")
      // 查看是否授权
      wx.getSetting({
        success(res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                console.log(res.userInfo)
                console.log("userMes=", userMes)
                app.globalData.userInfo = res.userInfo
                if (userMes.catalog == 2){
                  //显示首页界面
                  wx.redirectTo({
                    url: '../newFirstPage/newFirstPage',
                  })
                }else{
                  wx.redirectTo({
                    url: '../aEndSignPage/aEndSignPage',
                  })
                }

              }
            })
          } 
        }
      })

    } else {
      //用户未授权
      console.log("未授权")
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取登录信息
    util.getUserCode(code => {
      let that = this
      let param = {
        code: code,
        type: "weiapp"
      }
      console.log(code)
      api.userLogin(param, res => {
        console.log(res)
        app.globalData.userMes = res
        setTimeout(() => {
          //授权之后2S后进入首页
          if (res.catalog == 2){
            wx.redirectTo({
              url: '../newFirstPage/newFirstPage',
            })
          }else{
           wx.redirectTo({
             url: '../aEndSignPage/aEndSignPage',
           })
          }
        }, 1000)
        that.setData({
          userMes: app.globalData.userMes
        })
      }, fail => {
        wx.showToast({
          title: '服务器开小差了',
        })
      })
    })
    
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo
              // setTimeout(()=>{
              //   //授权之后2S后进入首页
              //   wx.redirectTo({
              //     url: '../newFirstPage/newFirstPage',
              //   })
              // },1000)
            }
          })
        } else {
          // setTimeout(() => {
          //   //授权之后2S后进入首页
          //   wx.redirectTo({
          //     url: '../newFirstPage/newFirstPage',
          //   })
          // }, 5000)
        }
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