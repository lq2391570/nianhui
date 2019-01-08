// pages/quickApply/quickApply.js
var util = require("../../utils/util.js")
var api = require("../../utils/api1.js")
//获取应用实例
const app = getApp()
//用户登录信息
var userLoginMes = {}
//用户授权信息
var userInfoMes = {}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTitle:"快速报名",
    haveBackBtn:true,
    headImage:"",
    name:"微信昵称",
    nameStr:"",
    phoneStr:"",
  },
  nameInput(event){
     console.log(event)
     let eventValueStr = event.detail.value
     this.setData({
       nameStr:eventValueStr
     })
  },
  phoneNumInput(event){
     console.log(event)
    let eventValueStr = event.detail.value
    this.setData({
      phoneStr: eventValueStr
    })
  },
  submitClick(){
     //提交
     console.log("提交")
    if(this.data.phoneStr == "" || this.data.phoneStr == null){
      wx.showToast({
        title: '手机号不能为空',
      })
    } else if (this.data.phoneStr.length != 11) {
      wx.showToast({
        title: '请填写正确的手机号',
      })
    } else if(this.data.nameStr == "" || this.data.nameStr == null){
      wx.showToast({
        title: '名字不能为空',
      })
    }else{
      wx.showLoading({
        title: '',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 3000)
      let that = this
      let param = {
        userToken: userLoginMes.userToken,
        name:that.data.nameStr,
        avatar: userInfoMes.detail.userInfo.avatarUrl,
        nickName: userInfoMes.detail.userInfo.nickName,
        phone:that.data.phoneStr
      }
      console.log(userInfoMes.detail.userInfo.avatarUrl)
      console.log(userInfoMes.detail.userInfo.nickName)
      api.quickApply(param,res=>{
        console.log(res)
        wx.hideLoading()
        if (res.code == 0){
          //报名成功
          
          wx.redirectTo({
            url: '../aEndSignPage/aEndSignPage',
          })
        }else if (res.code == 502){
          //报名成功
          wx.showToast({
            title: res.msg,
          })
          setTimeout(()=>{
            wx.redirectTo({
              url: '../aEndSignPage/aEndSignPage',
            })
          },2000)
        } 
        else{
          wx.showToast({
            title: res.msg,
          })
        }
      })
    }
     console.log(this.data.nameStr)
     console.log(this.data.phoneStr)

  },
  onGotUserInfo(e){
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok"){
      //用户授权
      console.log("授权了")
      userInfoMes = e
      this.submitClick()
    }else {
      //用户未授权
      console.log("未授权")
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }else{
          //若没有授权用户信息则去授权
          // wx.authorize({
          //   scope: 'scope.userInfo',
          //   success(){
          //     wx.getUserInfo({
          //       success(res) {
          //         console.log(res.userInfo)
          //       }
          //     })
          //   }
          // })
        }
      }
    })
   
    //获取登录信息
    util.getUserCode(code => {
      let that = this
      let param = {
        code: code,
        type: "weiapp"
      }
      console.log(code)
      api.userLogin(param, res => {
        console.log("qqq+",res)
        userLoginMes = res
        
        if (res.catalog == 0 || res.catalog == 1 || res.catalog == 2 || res.catalog == 4){
          //已报名
          wx.showModal({
            title: '提示',
            content: '您已经报名',
            showCancel:false,
            success(res){
              if (res.confirm){
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../startPage/startPage',
                })
              }
            }
          })
        }else{
          
        }
      })
    })
  },
//判断是否授权
 isHaveUserInfo(){
   wx.getSetting({
     success(res) {
       console.log(res)
       if (res.authSetting['scope.userInfo']) {
         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
         wx.getUserInfo({
           success(res) {
             console.log(res.userInfo)
           }
         })
       } else {
         //若没有授权用户信息则去授权
         // wx.authorize({
         //   scope: 'scope.userInfo',
         //   success(){
         //     wx.getUserInfo({
         //       success(res) {
         //         console.log(res.userInfo)
         //       }
         //     })
         //   }
         // })
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