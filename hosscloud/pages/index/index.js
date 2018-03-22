//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../login/login'
    })
    // wx.scanCode({
    //   success: (res) => {
        
    //     wx.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   },
    //   fail: (res) => {
    //     wx.showToast({
    //       title: '失败',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   }, 
    // })
  },
  onLoad: function () {
    // console.log(app.globalData.userInfo)
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

    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })

  },
  onReady: function(){
    // wx.scanCode({
    //   success: (res) => {

    //     wx.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   },
    //   fail: (res) => {
    //     wx.showToast({
    //       title: '失败',
    //       icon: 'loading',
    //       duration: 2000
    //     })
    //   }, 
    // })
  },
  getUserInfo: function(e) {
    console.log(app.globalData.userInfo)
    // app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  }
})
