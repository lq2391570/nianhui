 // pages/newFirstPage/newFirstPage.js
import { $wuxCountDown } from "../../miniprogram_npm/wux-weapp/index.js"
import { $wuxBackdrop } from '../../miniprogram_npm/wux-weapp/index.js'
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index.js'
var api = require("../../utils/api1.js")
var util = require("../../utils/util.js")
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    haveBackBtn: true,
    isIphoneX: app.globalData.systemMes.model === "iPhone X" ? true : false,
    c1:null,
    c2:null,
    c3:null,
    c4:null,
    isOpenPopup: false,
    isOpenComeBackPopup: false,
    userMes: {},
    animationData: {},
    isOpenTextarea:false,
    myTalkStr:"",
    isShowCanNotSignView: false,
    pool: 0,
    isfinishSign:false
  },
  //查看桌号
  lookOverTable(){
    console.log("this.data.userMes=", this.data.userMes)
    if (this.data.userMes.catalog === -1) {
      //未报名
      // console.log(app.globalData.userMes)
      //用户类型 - 1为普通 3特色人员进入专属报名页面
      wx.showToast({
        title: '未报名',
      })
    } else if (this.data.userMes.catalog === 0) {
      //已报名
      // wx.navigateTo({
      //   url: '../applyFinishPage/applyFinishPage',
      // })
      wx.showToast({
        title: '已报名',
      })
    } else if (this.data.userMes.catalog === 1) {
      //已确认（直接进入二维码界面）
      // wx.navigateTo({
      //   url: '../signCodePage/signCodePage',
      // })
      wx.showToast({
        title: "已确认",
      })
    } else if (this.data.userMes.catalog === 4) {
      //已确定不来（直接进入取消的页面）
      // wx.navigateTo({
      //   url: '../canNotSignPage/canNotSignPage',
      // })
      wx.showToast({
        title: '已确定不来',
      })
    } else if (this.data.userMes.catalog === 2) {
      //已签到（进入座位界面）
      wx.navigateTo({
        url: '../succeedSignIn/succeedSignIn',
      })
      // wx.redirectTo({
      //   url: '../succeedSignIn/succeedSignIn',
      // })
    } else {
      //可能是网络或服务器问题导致，刷新页面
      // wx.reLaunch({
      //   url: '../newFirstPage/newFirstPage'
      // })
      this.onLoad()
    }

  },
  //領取簽到碼
  getSignCode(){
     this.ensureSign()
  },
  //不能出席
  canNotSignClick(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定不能出席吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.ensureCanNotSignClick()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //领取签到码
  ensureSign() {

    let that = this
    let param = {
      userToken: this.data.userMes.userToken,
      type: "confirm",
      name: this.data.userMes.name,
      avatar: this.data.userMes.avatar
    }
    console.log(param)
    api.secondEnsure(param, res => {
      console.log(res)
      if (res.code == 0) {
        wx.navigateTo({
          url: '../signCodePage/signCodePage',
        })
      } else {
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          color: '#fff',
          text: res.msg,
          success: () => console.log('文本提示')
        })
      }
    })
  },
  //确认不能出席
  ensureCanNotSignClick() {
    let that = this
    let param = {
      userToken: this.data.userMes.userToken,
      type: "unconfirm",
      name: this.data.userMes.name,
      avatar: this.data.userMes.avatar
    }
    api.secondEnsure(param, res => {
      console.log(res)
      if (res.code == 0) {
        wx.navigateTo({
          url: '../canNotSignPage/canNotSignPage',
        })
      } else {
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          color: '#fff',
          text: res.msg,
          success: () => console.log('文本提示')
        })
      }
    })

  },
  talkInput(event){
    console.log(event.detail.value)
     this.setData({
       myTalkStr:event.detail.value
     })
  },
  submitTalk(mes){
    var talkStr = this.data.myTalkStr
    console.log(talkStr)
    if (talkStr == "" || talkStr==null){
      $wuxToast().show({
        type: 'text',
        duration: 1500,
        color: '#fff',
        text: '内容不能为空',
        success: () => console.log('文本提示')
      })
    }else{
      let that = this
      console.log(this.data.userMes.userToken)
      let param = {
        userToken: that.data.userMes.userToken,
        note: talkStr,
        channels: "2019中北年会"
      }
      wx.showLoading({
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 3000)
      api.postTalk(param, res => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 0){
          $wuxToast().show({
            type: 'success',
            duration: 1500,
            color: '#fff',
            text: "提交成功",
            success: () => console.log('已完成')
          })
        }else{
          $wuxToast().show({
            type: 'cancel',
            duration: 1500,
            color: '#fff',
            text: "网络故障提交失败",
            success: () => console.log('已完成')
          })
        }
        
        that.release()
      })
    }

  },
  inject() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.startCountDown()
    this.$wuxBackdrop = $wuxBackdrop()
    wx.showLoading({
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000),
      wx.getSetting({
        success(res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                console.log(res.userInfo)
                app.globalData.userInfo = res.userInfo
              }
            })
          } 
        }
      })
    
      //获取登录信息
      util.getUserCode(code => {
        let that = this
      var myAvatar = ""
      var mynickName = ""
      if (app.globalData.userInfo){
         myAvatar = app.globalData.userInfo.avatarUrl
        mynickName = app.globalData.userInfo.nickName
      }
      
        let param = {
          code: code,
          type: "weiapp",
          avatar: myAvatar ,
          nickName: mynickName
        }
        console.log("code=",code)
     
        api.userLogin(param, res => {
          console.log("newMsgOnload",res)

          if (res.memberType === 3) {
            //已报名特色人员
            wx.hideLoading()
            //当前状态 -1未报名，0已报名，1已确认，2已签到，3活动中 4确认不来
            if (res.catalog === -1) {
              //未报名
              that.setData({
                isShowCanNotSignView: false,
                isOpenComeBackPopup: true
              })
            } else if (res.catalog == 0) {
              //已报名(catalog == 0)
              this.$wuxBackdrop.retain()
               that.setData({
                 isShowCanNotSignView:true,
                 isOpenComeBackPopup: false
               })
            }else {
              that.setData({
                isShowCanNotSignView: false,
                isOpenComeBackPopup: false
              })
            }
          } else {
            //未报名
            if (res.catalog === -1) {
              that.setData({
                isOpenPopup: true,
                isShowCanNotSignView: false,
              })
            } else if (res.catalog == 0){
             //已报名(catalog == 0)
              this.$wuxBackdrop.retain()
             that.setData({
               isOpenPopup: false,
               isShowCanNotSignView: true,
             })
            }else {
              that.setData({
                isOpenPopup: false,
                isShowCanNotSignView: false,
              })
            }
          }
          app.globalData.userMes = res
          that.setData({
            userMes: app.globalData.userMes
          })
        },fail=>{
          wx.showToast({
            title: '服务器开小差了',
          })
        })
      })
  },
  //拨打电话
  callMe() {
    console.log("拨打电话")
    wx.makePhoneCall({
      phoneNumber: '029-88746889' //仅为示例，并非真实的电话号码
    })
  },
  //评论
  talkBtnClick(){
   
    this.$wuxBackdrop.retain()
   this.setData({
     isOpenTextarea:true,
     myTalkStr: ""
   })
  },
  closeTextarea(){
    this.setData({
      isOpenTextarea:false,
      myTalkStr: ""
    })
  },
  closePopup() {
    this.setData({
      isOpenPopup: false
    })
  },
  
  closeComeBackPopup() {
    this.setData({
      isOpenComeBackPopup: false
    })
  },
  canNotSignViewrelease() {
    this.$wuxBackdrop.release()
    this.$wuxBackdrop.release()
    this.$wuxBackdrop.release()
    this.setData({
      isShowCanNotSignView: false
    })
  },
  backdropRelease(){
    this.$wuxBackdrop.release()
    this.$wuxBackdrop.release()
    this.$wuxBackdrop.release()
  },

  //继续参会
  goOnAttend() {
    //根据cateloge判断是否报名
    if (this.data.userMes.catalog === -1) {
      //未报名
      wx.navigateTo({
        url: '../applyPage/applyPage',
      })
    } else if (this.data.userMes.catalog === 0) {
      //已报名
      wx.navigateTo({
        url: '../applyFinishPage/applyFinishPage',
      })
    }
  },
  //报名
  goToApply() {
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
    }else if (this.data.userMes.catalog === 1){
      //已确认（直接进入二维码界面）
      wx.navigateTo({
        url: '../signCodePage/signCodePage',
      })
    }else if (this.data.userMes.catalog === 4){
      //已确定不来（直接进入取消的页面）
      wx.navigateTo({
        url: '../canNotSignPage/canNotSignPage',
      })
    }else if (this.data.userMes.catalog === 2){
      //已签到（进入座位界面）
      wx.navigateTo({
        url: '../succeedSignIn/succeedSignIn',
      })
      // wx.redirectTo({
      //   url: '../succeedSignIn/succeedSignIn',
      // })
    }else{
      //可能是网络或服务器问题导致，刷新页面
      // wx.reLaunch({
      //   url: '../newFirstPage/newFirstPage'
      // })
       this.onLoad()
    }
  },
  openNotice() {
    console.log("dianji")
    this.setData({
      isOpenPopup: true
    })
    // this.setData({
    //   isOpenComeBackPopup: true
    // })
  },
  //开启倒计时
  startCountDown(){
     this.c1 = new $wuxCountDown({
       date:"January 5,2019 00:00:00",
       render(date){
         const days = this.leadingZeros(date.days,2) 
         const hours = this.leadingZeros(date.hours,2) 
         const min = this.leadingZeros(date.min,2) 
         const sec = this.leadingZeros(date.sec,2) 
         this.setData({
           c1:days,
         })
       }
     })
     this.c2 = new $wuxCountDown({
       date: "January 5,2019 00:00:00",
       render(date) {
         const days = this.leadingZeros(date.days, 2) 
         const hours = this.leadingZeros(date.hours, 2) 
         const min = this.leadingZeros(date.min, 2) 
         const sec = this.leadingZeros(date.sec, 2) 
         this.setData({
           c2: hours
         })
       }
     })
     this.c3 = new $wuxCountDown({
       date: "January 5,2019 00:00:00",
       render(date){
         const days = this.leadingZeros(date.days, 2) 
         const hours = this.leadingZeros(date.hours, 2) 
         const min = this.leadingZeros(date.min, 2) 
         const sec = this.leadingZeros(date.sec, 2) 
         this.setData({
           c3:min
         })
       }
     })
    this.c4 = new $wuxCountDown({
      date: "January 5,2019 00:00:00",
      render(date) {
        const days = this.leadingZeros(date.days, 2) 
        const hours = this.leadingZeros(date.hours, 2) 
        const min = this.leadingZeros(date.min, 2) 
        const sec = this.leadingZeros(date.sec, 2) 
        this.setData({
          c4:sec
        })
      }
    })

  },
  //游戏
  gameBtnClick(){
    // wx.showToast({
    //   title: '敬请期待',
    // })
   
    // wx.redirectTo({
    //   url: '../redBacketRain/redBacketRain'
    // })
    
    wx.navigateTo({
      url: '../gameList/gameList',
    })
  },
  //投票
  voteBtnClick(){
    if (this.data.userMes.vote == 0){
      //未投票
      wx.navigateTo({
        url: '../voteOfProgram/voteOfProgram',
      })
    }else{
      wx.navigateTo({
        url: '../voteOfProgramResult/voteOfProgramResult',
      })
    }

    // wx.showToast({
    //   title: '敬请期待',
    // })
  },
  //抽奖
  lotteryBtnClick(){
wx.navigateTo({
  url: '../myLottery/myLottery',
})

    // wx.showToast({
    //   title: '敬请期待',
    // })
  },
  release() {
    this.$wuxBackdrop.release()
    this.setData({
      isOpenTextarea:false,
      myTalkStr:""
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
    this.backdropRelease()
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo

            }
          })
        }
      }
    })
    //获取登录信息
    util.getUserCode(code => {
      let that = this
      var myAvatar = ""
      var mynickName = ""
      if (app.globalData.userInfo) {
        myAvatar = app.globalData.userInfo.avatarUrl
        mynickName = app.globalData.userInfo.nickName
      }
      let param = {
        code: code,
        type: "weiapp",
        avatar: myAvatar,
        nickName: mynickName
      }
      console.log("showCode=",code)
      api.userLogin(param, res => {
        console.log("newMesOnShow",res)
        if (res.memberType === 3) {
          //已报名特色人员
          wx.hideLoading()
          //当前状态 -1未报名，0已报名，1已确认，2已签到，3活动中 4确认不来
          if (res.catalog === -1) {
            //未报名
            that.setData({
              isShowCanNotSignView: false,
              isOpenComeBackPopup: true
            })
          } else if (res.catalog == 0) {
            //已报名(catalog == 0)
            this.$wuxBackdrop.retain()
            that.setData({
              isShowCanNotSignView: true,
              isOpenComeBackPopup: false
            })
          } else if (res.catalog == 2){
            that.setData({
              isfinishSign:true,
              isShowCanNotSignView: false,
            })
          }
          else {
            that.setData({
              isShowCanNotSignView: false,
              isOpenComeBackPopup: false
            })
          }
        } else {
          //未报名
          if (res.catalog === -1) {
            that.setData({
              isOpenPopup: true,
              isShowCanNotSignView: false,
            })
          } else if (res.catalog == 0) {
            //已报名(catalog == 0)
            this.$wuxBackdrop.retain()
            that.setData({
              isOpenPopup: false,
              isShowCanNotSignView: true,
            })
          } else if (res.catalog == 2){
            that.setData({
              isfinishSign:true,
              isShowCanNotSignView: false,
            })
          }
          else {
            that.setData({
              isOpenPopup: false,
              isShowCanNotSignView: false,
            })
          }
        }
        app.globalData.userMes = res
        that.setData({
          userMes: app.globalData.userMes,
          pool: res.money
        })
      }, fail => {
        wx.showToast({
          title: '服务器开小差了',
        })
      })
    })
    // this.setData({
    //   userMes: app.globalData.userMes
    // })
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
  onShareAppMessage: function () {
    return {
      title: '中北年会小程序',
      path: 'pages/startPage/startPage'
    }
  }
})