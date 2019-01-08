// pages/choiceVictory/choiceVictory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: [
      '#000080',
      '#8D0D86',
      '#572B9D',
      '#F5C8B8',
      '#C23CFF'
    ]
  },
  backNav() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      const colors = wx.getStorageSync('colors')
      console.log(colors)
      this.setData({
        colors: colors
      })
    } catch(e) {
      wx.showToast({
        title: '出错了呦，稍后重试'
      })
      setTimeout(()=>{
        wx.navigateBack()
      },2000)
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

  }
})