// pages/recharge/recharge.js
import regeneratorRuntime from '../../utils/wxPromise.min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider: {},
    dynamic: [],
    numerical: '0',
    multiple: 3,
    swiperHeight: 150,
    autoplay: true,
    isIphoneX: app.globalData.systemMes.model === "iPhone X" ? true : false,
    navTitle: '中北能量池'
  },
  slider(e) {
    var slider = this.data.slider
    slider.value = e.detail.value
    this.setData({slider: slider})
  },
  async recharge() {
    wx.showLoading({
      mask: true
    })
    var data = {
      userToken: app.globalData.userMes.userToken,
      handle: 'activityBillHandle',
      payType: 'weiapp',
      money: this.data.slider.value
    }
    let res = await wx.pro.request({
      url: 'https://2019.ccnc.cc/rest/rechargecard/recharge_money.htm',
      data: data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    if (res.data.code === 0) {
      wx.hideLoading()
      var pay = res.data.pay
      wx.requestPayment({
        timeStamp: pay.timestamp,
        nonceStr: pay.noncestr,
        package: pay.packageInfo,
        signType: pay.signType,
        paySign: pay.sign,
        success(res) {
          console.log(res)
        },
        fail(res) {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  backNav: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      mask: true
    })
    var data = {
      userToken: app.globalData.userMes.userToken
    }
    let res = await wx.pro.request({
      url: 'https://2019.ccnc.cc/rest/order/list.htm',
      data: data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    if (res.data.code === 0) {
      console.log(res)
      wx.hideLoading()
      this.setData({
        dynamic: res.data.list,
        numerical: res.data.money,
        multiple: res.data.list.length < 3 ? 1 : 3,
        swiperHeight: res.data.list.length < 3 ? 50 : 150,
        slider: res.data.slider
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
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
  // onShareAppMessage: function () {

  // }
})