//app.js

var api = require("./utils/api1.js")

import './utils/wxPromise.min.js'
App({
  onLaunch: function () {
    let that = this
   //检查版本更新
   this.updataVersions()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //定位
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     if (res.latitude) {
    //       that.globalData.lat = res.latitude
    //     } else {
    //       that.globalData.lat = 34.33422273578077
    //     }
    //     if (res.longitude) {
    //       that.globalData.lng = res.longitude
    //     } else {
    //       that.globalData.lng = 108.9480471611023
    //     }
    //   }
    // })
    //获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.globalData.systemMes = res
      },
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let param = {
          code:res.code,
          type: "weiapp"
        }
        api.userLogin(param,res=>{
          console.log("appjs",res)
          this.globalData.userMes = res
        }, fail => {
          wx.showToast({
            title: '服务器开小差了',
          })
        })
       
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //强制更新
  updataVersions(){
    const updateManager = wx.getUpdateManager()
       updateManager.onCheckForUpdate(function (res) {
         // 请求完新版本信息的回调
         console.log(res.hasUpdate)
       })
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
      // wx.showModal({
      //   title: '更新提示',
      //   content: '新版本已经准备好，是否重启应用？',
      //   success: function (res) {
      //     if (res.confirm) {
      //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      //       updateManager.applyUpdate()
      //     }
           
      //   }
      // })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      console.log("新版本下载失败")
    })
  },

  globalData: {
    userInfo: null,
    userMes:null,
    lat:0,
    lng:0,
    systemMes:null,
  }
})