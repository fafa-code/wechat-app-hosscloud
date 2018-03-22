
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null, //手机号
    password: null //密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.userInfo)
  },
  searchInputPhone: function (e) {
    this.setData({ phone: e.detail.value });
  },
  searchInputPassword: function (e) {
    this.setData({ password: e.detail.value });
  },
  searchClickLogin: function (e) {
    console.log(this.data.phone, this.data.password)
    if (!this.data.phone) {
      wx.showModal({
        title: '错误',
        content: '请输入手机号',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    } else if (!this.data.password){
      wx.showModal({
        title: '错误',
        content: '请输入密码',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    }else{
      wx.request({
        url: 'https://test.fuyitianjian.net/wechat/wechat/login', //接口地址
        method: "POST",
        data: {
          "phone": this.data.phone,
          "password": this.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'requireCaptcha': 0
        },
        success: res => {
          console.log(res.data)
          if (res.data.status == 200){
            app.globalData.token = res.data.results.token
            wx.setStorageSync('token', res.data.results.token)
            // console.log(app.globalData.token)
              wx.navigateBack({ changed: true }); 
              // wx.scanCode({
              //   success: (res) => {
              //     console.log(res.result)
              //     wx.setStorageSync('result', res.result)
              //     wx.request({
              //       url: res.result, //接口地址
              //       header: {
              //         'content-type': 'application/json', // 默认值
              //         'User-Agent': 'www.hosscloud.com'
              //       },
              //       success: function (res) {
              //         console.log(res.data)
              //         wx.navigateTo({
              //           url: '../device_detail/index'
              //         })
              //       }
              //     })
              //   },
              //   fail: (res) => {
              //     wx.showToast({
              //       title: '失败',
              //       icon: 'success',
              //       duration: 1000
              //     })
              //   }, 
              // })
          }else{
            wx.showModal({
              title: '错误',
              content: '登陆失败' + res.data.message,
              showCancel: false, //不显示取消按钮
              confirmText: '确定'
            })
          }
        },
        fail: res => {
          console.log(res)
        }
      })
    }
  }

  

 
})