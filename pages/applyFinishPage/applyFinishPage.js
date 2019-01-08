// pages/applyFinishPage/applyFinishPage.js
var api = require("../../utils/api1.js")
var util = require("../../utils/util.js")
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index.js'
import { $wuxBackdrop } from '../../miniprogram_npm/wux-weapp/index.js'
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    peoples:[],
    phoneNum: '029-88746889',
    isIphoneX: app.globalData.systemMes.model === "iPhone X" ? true : false,
    isGroup:true,
    isAlreadySignIn:true,
    userMes:{},
    isShowCanNotSignView:false
  },
  
  backNav: function () {
    console.log("返回")
    wx.navigateBack({
      
    })
  },
  //确认不能出席
  ensureCanNotSignClick(){
    let that = this
    let param = {
      userToken: this.data.userMes.userToken,
      type: "unconfirm",
      name: this.data.userMes.name,
      avatar: this.data.userMes.avatar
    }
    api.secondEnsure(param, res => {
       console.log(res)
      if (res.code == 0) {
        wx.navigateTo({
          url: '../canNotSignPage/canNotSignPage',
        })
      } else {
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          color: '#fff',
          text: res.msg,
          success: () => console.log('文本提示')
        })
      }
    })

  },
  //很遗憾不能出席
  canNotSignClick(){
    this.$wuxBackdrop.retain()
    this.setData({
      isShowCanNotSignView: true
    })
  },
  release() {
    this.$wuxBackdrop.release()
    this.setData({
      isShowCanNotSignView: false
    })
  },
  //领取签到码
  ensureSign(){
    
    let that = this
    let param = {
      userToken:this.data.userMes.userToken,
      type:"confirm",
      name: this.data.userMes.name,
      avatar: this.data.userMes.avatar
    }
    console.log(param)
    api.secondEnsure(param,res=>{
      console.log(res)
      if (res.code == 0){
        wx.navigateTo({
          url: '../signCodePage/signCodePage',
        })
      }else{
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          color: '#fff',
          text: res.msg,
          success: () => console.log('文本提示')
        })
      }
    })
  },
  phoneCall () {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.$wuxBackdrop = $wuxBackdrop()
    util.getUserCode(code => {
      let that = this
      let param = {
        code: code,
        type: "weiapp"
      }
      api.userLogin(param, res => {
        console.log(res)
        app.globalData.userMes = res
        this.setData({
          userName: app.globalData.userMes.name,
          peoples: app.globalData.userMes.members,
          isGroup: app.globalData.userMes.group,
          userMes: app.globalData.userMes
        })
      })
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

  }  
})