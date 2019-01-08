// pages/firstPage/firstPage.js
var api = require("../../utils/api1.js")
var util = require("../../utils/util.js")
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     btnList:["年会报名","年会祝福","XXX小游戏","分配桌位"],
     isOpenPopup:false,
     haveBackBtn:true,
     isOpenComeBackPopup:false,
     userMes:{},
     alreadyNum:0,
    isIphoneX:app.globalData.systemMes.model === "iPhone X" ? true:false,
    
  },
  //拨打电话
  callMe(){
    console.log("拨打电话")
    wx.makePhoneCall({
      phoneNumber: '029-88746889' //仅为示例，并非真实的电话号码
    })
  },
  openNotice(){
    this.setData({
      isOpenPopup:true
    })
    // this.setData({
    //   isOpenComeBackPopup: true
    // })
  },
  closePopup(){
    this.setData({
      isOpenPopup: false
    })
  },
  closeComeBackPopup(){
    this.setData({
      isOpenComeBackPopup: false
    })
  },
  //继续参会
  goOnAttend(){
     //根据cateloge判断是否报名
     if (this.data.userMes.catalog === -1){
       //未报名
       wx.navigateTo({
         url: '../applyPage/applyPage',
       })
     }else if (this.data.userMes.catalog === 0){
       //已报名
       wx.navigateTo({
         url: '../applyFinishPage/applyFinishPage',
       })
     }
  },
  //报名
  goToApply(){
    console.log(app.globalData.lat)
    console.log(app.globalData.lng)
    var memberType = this.data.userMes.memberType
    //根据cateloge判断是否报名
    if (this.data.userMes.catalog === -1) {
      //未报名
      // console.log(app.globalData.userMes)
      //用户类型 - 1为普通 3特色人员进入专属报名页面
      switch (memberType) {
        case -1:
          wx.navigateTo({
            url: '../applyPage/applyPage',
          })
          break;
        case 0:
          wx.navigateTo({
            url: '../applyPage/applyPage',
          })
          break;
        case 3:
          this.setData({
            isOpenComeBackPopup: true
          })
          break;
        default:
          // wx.navigateTo({
          //   url: '../applyPage/applyPage',
          // })
          wx.showToast({
            title: '数据有误，请退出程序重新进入',
          })
      }

    } else if (this.data.userMes.catalog === 0) {
      //已报名
      wx.navigateTo({
        url: '../applyFinishPage/applyFinishPage',
      })
    }
  },
//类型按钮点击
  typeBtnClick(event){
    console.log(event)
    switch(event.currentTarget.dataset.item){
      case 0:
      wx.navigateTo({
        url: '../applyPage/applyPage',
      })
      break;
    }
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.isIphoneX)
    // this.setData({
    //   systemBarHeight: app.globalData.systemMes.statusBarHeight
    // })
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000),
    //获取登录信息
    util.getUserCode(code=>{
      let that = this
      let param = {
        code: code,
        type: "weiapp"
      }
      api.userLogin(param, res => {
        console.log(res)
        if (res.memberType === 3){
          //已报名特色人员
          wx.hideLoading()
          if (res.catalog === 0){
            //已报名
            that.setData({
              isOpenComeBackPopup: false
            })
          }else{
            that.setData({
              isOpenComeBackPopup: true
            })
          } 
        }else{
         if (res.catalog === 0){
           that.setData({
             isOpenPopup: false
           })
         }else{
           that.setData({
             isOpenPopup: true
           })
         }
          

        }
        app.globalData.userMes = res
        that.setData({
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
    this.setData({
      userMes: app.globalData.userMes
    })
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

  // }, 
  

})