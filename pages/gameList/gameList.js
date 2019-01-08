// pages/gameList/gameList.js
const app = getApp()
import regeneratorRuntime from '../../utils/wxPromise.min.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toRedRain() {
    this.getGameList(res => {
      console.log(res)
      if (res.code === 0 && res.list[1].state === 1) {
        wx.reLaunch({
          url: '../redBacketRain/redBacketRain',
        })
      } else {
        wx.showToast({
          title: '游戏尚未开始',
        })
      }
    })
  },
  toChoiceGame() {
    this.getGameList(res => {
      console.log(res)
      if (res.code === 0 && res.list[0].state === 1) {
        console.log('进入以少胜多')
        wx.navigateTo({
          url: '../choiceIndex/choiceIndex',
        })
      } else {
        wx.showToast({
          title: '游戏尚未开始',
        })
      }
    })
  },
  backNav() {
    wx.reLaunch({
      url: '../newFirstPage/newFirstPage'
    })
  },
  async getGameList(back) {
    wx.showLoading({
      mask: true
    })
    var data = {
      userToken: app.globalData.userMes.userToken
    }
    let res = await wx.pro.request({
      url: 'https://2019.ccnc.cc/rest/game/list.htm',
      data: data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    if (res.data.code === 0) {
      wx.hideLoading()
      back(res.data)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})