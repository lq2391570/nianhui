// pages/applyPage/applyPage.js
import regeneratorRuntime from '../../utils/wxPromise.min.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    identity: 1,// 1 集团 2 嘉宾
    stay: 0,// 1 需要住宿
    meeting: 0,// 1 高峰论坛
    art: 0,// 1 文艺汇演
    eat: 0,// 1 晚宴
    companys: [], // 根据定位获取的公司
    companies: [],// 组合上面公司的名称
    companyIndex: 0,// 当前选中的公司index
    enroll: {},//已携带信息
    showEmail: false,
    isIphoneX: app.globalData.systemMes.model === "iPhone X" ? true : false
  },
  changeIdentity () {
    var identity = this.data.identity === 1 ? 2 : 1
    this.setData({ identity: identity })
  },
  chooseStay () {
    var stay = this.data.stay === 0 ? 1 : 0
    this.setData({ stay: stay })
  },
  chooseMeeting () {
    var meeting = this.data.meeting === 0 ? 1 : 0
    this.setData({ meeting: meeting })
  },
  chooseArt() {
    var art = this.data.art === 0 ? 1 : 0
    this.setData({ art: art })
  },
  chooseEat() {
    var eat = this.data.eat === 0 ? 1 : 0
    this.setData({ eat: eat })
  },
  chooseCompany (e) {
    var index = e.detail.value
    var showEmail = this.data.companys[index].id === 2 ? true : false
    this.setData({ companyIndex: index, showEmail: showEmail})
    console.log(this.data.companys[index])
  },
  apply (e) {
    console.log(e.detail.value)
    var enroll = e.detail.value
    if (enroll.name === '') {
      wx.showToast({
        title: '请填写姓名！',
        icon: 'none'
      })
      return
    }
    if (enroll.phone === '') {
      wx.showToast({
        title: '请填写手机号！',
        icon: 'none'
      })
      return
    }
    var myreg = /^1(3|4|5|7|8)\d{9}$/
    if (!myreg.test(enroll.phone)) {
      wx.showToast({
        title: '手机号不正确！',
        icon: 'none'
      })
      return
    }
    if (this.data.identity === 1 && enroll.job === '') {
      wx.showToast({
        title: '请填写职位！',
        icon: 'none'
      })
      return
    }
    if (this.data.identity === 1) {
      enroll.companyId = this.data.companys[this.data.companyIndex].id
      if (enroll.email === '') {
        wx.showToast({
          title: '请填写集团邮箱！',
          icon: 'none'
        })
        return
      }
    } else {
      if (this.data.identity === 1 && enroll.company === '') {
        wx.showToast({
          title: '请填写公司！',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.stay === 1 && enroll.no === '') {
      wx.showToast({
        title: '请填写身份证号！',
        icon: 'none'
      })
      return
    }
    if (this.data.meeting === 0 && this.data.art === 0 && this.data.eat === 0) {
      wx.showToast({
        title: '请至少选择参加一个环节，可多选！',
        icon: 'none'
      })
      return
    }
    var arr = []
    if (this.data.meeting === 1) { arr.push(1) }
    if (this.data.art === 1) { arr.push(2) }
    if (this.data.eat === 1) { arr.push(3) }
    enroll.items = arr
    enroll.userToken = this.data.user.userToken
    enroll.stay = this.data.stay
    enroll.catalog = this.data.identity
    enroll.formId = e.detail.formId
    enroll.lat = app.globalData.lat
    enroll.lng = app.globalData.lng
    console.log(e.detail.formId)
    wx.showLoading()
    wx.pro.request({
      url: 'https://2019.maotouin.com/rest/member/enroll.htm',
      data: enroll,
      method: 'POST',
      header: { 'content-type': 'application/json' }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.data.code === 0) {
        app.globalData.userMes.catalog = 0
        wx.redirectTo({
          url: '../applyFinishPage/applyFinishPage',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  backNav: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var d = app.globalData.userMes
    var lat = app.globalData.lat
    var lng = app.globalData.lng
    this.setData({user: d, enroll: d})
    wx.showLoading()
    let data = await wx.pro.request({
      url: 'https://2019.maotouin.com/rest/member/enrollinfo.htm',
      data: {
        userToken: d.userToken,
        lat: lat,
        lng: lng
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
    wx.hideLoading()
    console.log(data.data)
    if (data.data.code === 0) {
      var arr = data.data.companies
      var arr2 = arr.map(function (x) {
        return x.name
      })
      var showEmail = data.data.companies[0].id === 2 ? true : false
      this.setData({ companies: arr2, companys: data.data.companies, showEmail: showEmail })
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

  }
})