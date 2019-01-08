// pages/choiceResult/choiceResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTitle: '很遗憾',
    topDes: '您没有进入下一轮',
    btmTitle: '感谢您对中北的支持与厚爱',
    wave: '一',
    people: 0,
    color: '',
    key: ''
  },
  backNav() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wave: options.wave,
      people: options.num,
      color: options.color,
      key: options.key
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

  }

})