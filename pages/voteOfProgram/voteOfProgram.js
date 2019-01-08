// pages/voteOfProgram/voteOfProgram.js
var api = require("../../utils/api1.js")
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index.js'
//获取应用实例
const app = getApp()
var selectPrograms = []
var selectIndexArray = []
var selectStateArray = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    programs: [],
    selectStates:[],
    navTitle: "节目投票"
  },
  backNav: function () {
    console.log("返回")
    wx.navigateBack({
      delta: 3
    })
  },
  selectProgramClick(event){
    console.log(event)
    let that = this
    var proArray = this.data.programs
    let selectNum = event.currentTarget.dataset.index
    if (selectPrograms.indexOf(proArray[selectNum]) == -1){
      //不存在
      console.log("不存在")
      //数组个数不能大于3
      if (selectPrograms.length < 3){
        selectPrograms.push(proArray[selectNum])
        selectStateArray.splice(selectNum,1,true)
        that.setData({
          selectStates: selectStateArray
        })
      }else{
        $wuxToast().show({
          type: 'text',
          duration: 1500,
          color: '#fff',
          text: '只能选择3个节目哦',
          success: () => console.log('文本提示')
        })
      }
    }else{
      //存在
      console.log("存在")
      let selectIndex = selectPrograms.indexOf(proArray[selectNum])
      selectPrograms.splice(selectIndex,1)
      selectStateArray.splice(selectNum, 1, false)
      that.setData({
        selectStates: selectStateArray
      })
    }
      console.log(selectPrograms)
      
  },
  //获取节目信息
  getPrograms(){
    let that = this
    let param = {
      userToken: app.globalData.userMes.userToken,
      no:1,
      size:100
    }
    api.programMes(param,res=>{
      console.log(res)
      if (res.code == 0){
        //成功
        for (var i=0;i<res.list.length;i++){
          selectStateArray.push(false)
        }
        that.setData({
          programs:res.list
        })
      }
    })
  },
  //提交选择结果
  submitBtnClick(){
    console.log(selectPrograms)

    if (selectPrograms.length != 3){
      $wuxToast().show({
        type: 'text',
        duration: 1500,
        color: '#fff',
        text: '请选择3个节目',
        success: () => console.log('文本提示')
      })
    }else{
      let that = this
      //重新创建id数组
      var idArray = []
      selectPrograms.forEach(function(value,i){
        idArray.push(value.id)
      })
      console.log(idArray)
      let param = {
        userToken: app.globalData.userMes.userToken,
        votes:idArray
      }
      api.programAddVote(param,res=>{
        console.log(res)
        if (res.code == 0){
          //成功
          wx.navigateTo({
            url: '../voteOfProgramResult/voteOfProgramResult',
          })
        }else{
          $wuxToast().show({
            type: 'text',
            duration: 1500,
            color: '#fff',
            text: res.msg,
            success: () => console.log('文本提示')
          })
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getPrograms()
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