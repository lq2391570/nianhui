// pages/succeedSignIn/succeedSignIn.js
//获取应用实例
const app = getApp()
var pages = null
// //行
// var seatRow = 0
// //列
// var seatLine = 0
// //座位号
// var seatNum = 0
//座位号数组
var seatNumArray = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    singInPeoples: [],
    numOfDesk:null,
    defaultDeskImage:"http://videoss.cdn.bcebos.com/defaultTable.png",
    selectDeskImage:"http://videoss.cdn.bcebos.com/selectTable.png",
    //行
    numOfSeatRow:0,
    //列
    numOfSeatLine:0,
    //座位号数组
    numberOfSeatArray:[]
  },
  //座位
  rowTheSeats(num){
    var seatRow = Math.ceil(num / 8) 
   console.log("seatRow,",seatRow)
   var seatLine = num % 8
   if (seatLine == 0){
     seatLine = 8
   }
   console.log("seatLine",seatLine)
   var seatNum = 0
    if (seatLine <= 4 && seatLine >= 1){
      seatNum = 8 * seatRow - 2 * seatLine + 1
    }else if (seatLine > 4 && seatLine <= 8){
      seatNum = 8 * seatRow + 2 * seatLine - 16
    }
    console.log(seatNum)
    seatNumArray.push(seatNum) 
  },
  //排座位
  getSeatNum(num){
    for (var i = 1;i < num;i++){
       this.rowTheSeats(i) 
    }
    this.setData({
      numberOfSeatArray: seatNumArray
    })
  },
  backNav: function () {
    console.log("返回")
    // if (pages.length == 2){
    //   //从首页进来
    //  wx.navigateBack({
    //   delta: 3
    // })
    // }else{
      // wx.redirectTo({
      //   url: '../newFirstPage/newFirstPage',
      // })
      wx.reLaunch({
        url: '../newFirstPage/newFirstPage',
      })
    // }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pages = getCurrentPages()
    console.log(pages)
    seatNumArray = []
    this.getSeatNum(89)
    this.setData({
      singInPeoples: app.globalData.userMes.desks,
      numOfDesk:app.globalData.userMes.deskNo
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