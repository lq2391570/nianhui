// pages/choiceGame/choiceGame.js
import regeneratorRuntime from '../../utils/wxPromise.min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentWave: 1,//当前第几轮
    list: [],
    leftWidth: '50vw',
    leftLevel: 99,
    rightWidth: '50vw',
    rightLevel: 99,
    selectedKey: '',
    submitPre: false,
    submit: false,
    piao: 1,
    vote: 0,
    people: 0
  },

  leftChoose () {
    if (this.data.submit) { return }
    this.getGameList((res)=>{
      var rawData = this.data
      this.setData({ 
        leftWidth: '75vw', 
        rightWidth: '25vw',
        selectedKey : rawData.list[rawData.currentWave-1].leftKey
      })
      setTimeout(() => {
        this.setData({
          submitPre: true
        })
      },1000)
    })
  },
  rightChoose() {
    if (this.data.submit) { return }
    this.getGameList((res)=>{
      var rawData = this.data
      this.setData({ 
        leftWidth: '25vw', 
        rightWidth: '75vw',
        selectedKey: rawData.list[rawData.currentWave-1].rightKey,
      })
      setTimeout(() => {
        this.setData({
          submitPre: true
        })
      }, 1000)
    })
  },
  cancel() {
    console.log('取消')
    this.setData({
      leftWidth: '50vw',
      rightWidth: '50vw',
      selectedKey: '',
      submitPre: false
    })
  },
  determine() {
    console.log('确定')
    this.vote(res => {
      var rawData = this.data
      var d = rawData.selectedKey === rawData.list[rawData.currentWave-1].leftKey
      var l = d ? '100vw' : '0vw'
      var r = d ? '0vw' : '100vw'
      var rightL = d ? 98 : 99
      this.setData({
        leftWidth: l,
        rightWidth: r,
        submitPre: false,
        submit: true,
        rightLevel: rightL
      })
      // this.setData({
      //   leftWidth: '50vw',
      //   rightWidth: '50vw',
      //   submit: false,
      //   currentWave: rawData.currentWave
      // })
    })
  },
  backNav() {
    wx.navigateBack()
  },
  //游戏状态
  async getGameList(back) {
    var data = {
      userToken: app.globalData.userMes.userToken,
      id: 1,
      guest: app.globalData.userMes.guest
    }
    //网络请求
    let res = await wx.pro.request({
      url: 'https://2019.ccnc.cc/rest/game/levels.htm',
      data: data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    console.log(res)
    if (res.data.code === 0) {
      back(res.data)
    } else {
      wx.showToast({
        title: res.data.msg,
      })
    }
  },
  //投票
  async vote(back) {
    var state = this.data.selectedKey === this.data.list[this.data.currentWave-1].leftKey ? 'left' : 'right'
    var data = {
      userToken: app.globalData.userMes.userToken,
      id: this.data.piao,
      state: state
    }
    //网络请求
    let res = await wx.pro.request({
      url: 'https://2019.ccnc.cc/rest/game/vote.htm',
      data: data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    console.log(res)
    if (res.data.code === 0) {
      back(res.data)
    } else {
      wx.showToast({
        title: res.data.msg,
      })
      this.cancel()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      const gameList = wx.getStorageSync('gameList')
      if (gameList) {
        console.log(gameList)
        this.setData({
          currentWave: parseInt(options.id),
          list: gameList,
          piao: parseInt(options.piao),
          vote: parseInt(options.vote),
          people: parseInt(options.num),
          time: parseInt(options.time)
        })
        if (this.data.vote === 0) {
          return
        }
        var d = this.data.vote === 1 ? true : false
        var l = d ? '100vw' : '0vw'
        var r = d ? '0vw' : '100vw'
        var rightL = d ? 98 : 99
        this.setData({
          leftWidth: l,
          rightWidth: r,
          submitPre: false,
          submit: true,
          rightLevel: rightL
        })
      }
    } catch (e) {
      wx.showToast({
        title: e,
      })
      setTimeout(()=>{
        wx.navigateBack()
      })
    }
  },
  backHome() {
    wx.reLaunch({
      url: '../newFirstPage/newFirstPage'
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