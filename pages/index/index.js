//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    maxLength:5,

    activeTab:'',
    activeBgImg:'',
    tabList:[
      {value:0, title:'早晨', imgSrc:'./../../common/images/早上.jpg'},
      {value:1, title:'中午', imgSrc:'./../../common/images/上午.jpg'},
      {value:2, title:'下午', imgSrc:'./../../common/images/下午.jpg'},
      {value:3, title:'夜间', imgSrc:'./../../common/images/晚上.jpg'},
    ],
    calendarVisible: false, 
    minDate:new Date(2020, 0, 1).getTime(),
    defaultDate: new Date().getTime(),
    beforeInput:'4.3',
    afterInput:'5.2',
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.getCurrentHour()

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  saveData(e){
    let temp = e.currentTarget.dataset.type
    this.setData({
      [temp]: e.detail.value
    })
    console.log(temp+':', this.data[temp])
  },

  jumpPage(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.type,
    })
  },

  changeTime(res){
    for(let item of this.data.tabList){
      if(res.detail.name == item.value){
        this.setData({
          activeBgImg: item.imgSrc,
          activeTab: item.value
        })
      }
    }
  },

  getCurrentHour(){
    let currentH =  new Date().getHours()
    if(currentH <= 10){
      this.setData({
        activeBgImg: '/../../common/images/早上.jpg',
        activeTab: 0
      })

    } else if(currentH > 10 && currentH <=13){
      this.setData({
        activeBgImg: './../../common/images/上午.jpg',
        activeTab: 1
      })

    } else if(currentH > 13 && currentH <=18){
      this.setData({
        activeBgImg: './../../common/images/下午.jpg',
        activeTab: 2
      })

    } else {
      this.setData({
        activeBgImg: './../../common/images/晚上.jpg',
        activeTab: 3
      })
    }
  },

  haddleCalendar(){
    this.setData({
      calendarVisible:  !this.data.calendarVisible
    })
  },

  onConfirm(e){
    this.formatDate(e.detail)
    this.setData({
      calendarVisible: false
    })
  },

  formatDate(date) {
    let dateTemp = date || ''
    dateTemp = new Date(dateTemp);
    this.setData({
      defaultDate: `${dateTemp.getFullYear()}/${dateTemp.getMonth() + 1}/${dateTemp.getDate()}`
    })
    console.log('当前时间：', this.data.defaultDate)
  },
})
