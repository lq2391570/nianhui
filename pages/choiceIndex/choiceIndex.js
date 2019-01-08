// pages/choiceIndex/choiceIndex.js
import regeneratorRuntime from '../../utils/wxPromise.min.js'
const cax = require('../../component/cax/index.js')
import player from './player.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var width = app.globalData.systemMes.windowWidth
    var height = app.globalData.systemMes.windowHeight
    const stage = new cax.Stage(width, height, 'loading', this)
    const logo = new cax.Bitmap('../../assets/title.png', () => {
      stage.update()
    })
    logo.scale = 0.5
    logo.x = stage.width/5
    logo.y = stage.height/4
    stage.add(logo)

    const p = player
    p.x = 30
    p.y = height/2 - 30
    stage.add(p)
    
    const timer = cax.setInterval(() => {
      p.update(width,()=>{
      })
      stage.update()
    }, 16)
    var data = {
      userToken: app.globalData.userMes.userToken,
      id: 1,
      guest: app.globalData.userMes.guest
    }
    console.log("data=",data)
    //网络请求
    let res = await wx.pro.request({
      url: 'https://2019.ccnc.cc/rest/game/levels.htm',
      data: data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    console.log(res)
    if (res.data.code === 0) {
      const text = new cax.Text('第 ' + res.data.level + ' 轮',{
        font: '30px Arial',
        color: '#333'
      })
      console.log(text.getWidth())
      text.originX = text.getWidth()/2
      text.x = stage.width / 2
      text.y = stage.height / 2.5
      stage.add(text)
      stage.update()
      setTimeout(() => {
        wx.setStorageSync('gameList', res.data.list)
        wx.redirectTo({
          url: '../choiceGame/choiceGame?id=' + res.data.level + '&piao=' + res.data.piao + '&vote=' + res.data.vote + '&num=' + res.data.num + '&time=' + res.data.time
        })
        cax.clearInterval(timer)
        p.reset()
      }, 4000)
    } else if (res.data.code === 505) {
      //失败
      setTimeout(()=>{
        var fail = res.data.failLevel
        var vote = res.data.vote
        var failColor, failKey
        if (vote === 0) {
          failColor = '#333'
          failKey = ''
        } else {
          failColor = vote === 1 ? fail.leftColor : fail.rightColor
          failKey = vote === 1 ? fail.leftKey : fail.rightKey
        }
        wx.redirectTo({
          url: '../choiceResult/choiceResult?wave=' + fail.wave + '&color=' + failColor + '&key=' + failKey + '&num=' + fail.people
        })
        cax.clearInterval(timer)
        p.reset()
      },4000)
    } else if (res.data.code === 506) {
      //弃权
      wx.showModal({
        title: '您来晚了',
        content: '由于您未能及时参与游戏，系统视您为弃权，您可以参与其他游戏',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack()
            cax.clearInterval(timer)
            p.reset()
          }
        }
      })
    } else if (res.data.code === 508) {
      //晋级
      setTimeout(()=>{
        var colors = res.data.colors
        wx.setStorageSync('colors', colors)
        wx.redirectTo({
          url: '../choiceVictory/choiceVictory'
        })
      },4000)
    } else {
      wx.showToast({
        title: res.data.msg,
      })
      setTimeout(()=>{
        wx.navigateBack()
        cax.clearInterval(timer)
        p.reset()
      },2000)
    }
  }
})