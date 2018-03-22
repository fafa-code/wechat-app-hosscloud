//index.js
//获取应用实例
const app = getApp();
var api = require('../../api.js');
var aes = require('../../static/aes/aesUtil.js');

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    content: null,
    autoplay:false,
    indicatordots:false,
    controls: false


  },
  onShow: function(){
    let data = {
      "orderId": wx.getStorageSync('repairid')
    }
    wx.request({
      url: api.api.basePath + api.api.repiarDetail, //接口地址
      method: "POST",
      data: JSON.stringify(data).encode(),
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success: res => {
        if (res.data.status == 200) {
          console.log(res.data.results)
          this.setData({
            content: res.data.results
          });
        } else {
          console.log(res.data)
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  onLoad: function () {
    

  },
  onReady: function(){

  },

  toEvaluate: function (e) {
    let id = e.currentTarget.dataset.id;
    let repairurl = e.currentTarget.dataset.repairurl;
    let orderno = e.currentTarget.dataset.orderno;
    let projectname = e.currentTarget.dataset.projectname;
    let createdt = e.currentTarget.dataset.createdt;
    wx.setStorageSync('repairid', id)
    wx.setStorageSync('repairurl', repairurl)
    wx.setStorageSync('orderno', orderno)
    wx.setStorageSync('projectname', projectname)
    wx.setStorageSync('createdt', createdt)
    wx.navigateTo({
      url: '../evaluate/index',
    })
  },

  toScore: function (e) {
    let id = e.currentTarget.dataset.id;
    let repairurl = e.currentTarget.dataset.repairurl;
    let orderno = e.currentTarget.dataset.orderno;
    let projectname = e.currentTarget.dataset.projectname;
    let createdt = e.currentTarget.dataset.createdt;
    wx.setStorageSync('repairid', id)
    wx.setStorageSync('repairurl', repairurl)
    wx.setStorageSync('orderno', orderno)
    wx.setStorageSync('projectname', projectname)
    wx.setStorageSync('createdt', createdt)
    // wx.getStorageSync('token')//得到缓存
    // console.log(id, repairurl, orderno, projectname, createdt)
    wx.navigateTo({
      url: '../score/index',
    })
  },

  reMove: function (e) {

    let iid = e.currentTarget.dataset.id;
    let data = {
      "orderId": iid
    }
    // console.log(e, e.target.id, this.data.iid)
    wx.showModal({
      title: '',
      content: '确定删除这条报修?',
      showCancel: false, //不显示取消按钮
      confirmText: '确定',
      success: function () {
        wx.request({
          url: api.api.basePath + api.api.repiarDelete, //接口地址
          method: "POST",
          data: JSON.stringify(data).encode(),
          header: {
            'content-type': 'application/json', // 默认值
            'token': wx.getStorageSync('token')
          },
          success: res => {
            if (res.data.status == 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                success: function (res) {
                  console.log(this)
                  setTimeout(function () {
                    wx.navigateBack({ changed: true })
                  }, 1000)
                }
              })
            } else {
              wx.showModal({
                title: '错误',
                content: '删除失败' + res.data.message,
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
    })
  },


  reMove1: function (e) {

    let iid = e.currentTarget.dataset.id;
    let data = {
      "orderId": iid
    }
    // console.log(e, e.target.id, this.data.iid)
    wx.showModal({
      title: '',
      content: '确定取消这条报修?',
      showCancel: false, //不显示取消按钮
      confirmText: '确定',
      success: function () {
        wx.request({
          url: api.api.basePath + api.api.repiarCancel, //接口地址
          method: "POST",
          data: JSON.stringify(data).encode(),
          header: {
            'content-type': 'application/json', // 默认值
            'token': wx.getStorageSync('token')
          },
          success: res => {
            if (res.data.status == 200) {
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 1000,
                success: function (res) {
                  console.log(this)
                  setTimeout(function () {
                    wx.navigateBack({ changed: true })
                  }, 1000)
                }
              })
            } else {
              wx.showModal({
                title: '错误',
                content: '取消失败' + res.data.message,
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
    })
  },

  toRepair_details: function (e) {
    let repairno = e.currentTarget.dataset.repairno;
    let repairstatusname = e.currentTarget.dataset.repairstatusname;
    wx.setStorageSync('repairno', repairno)
    wx.setStorageSync('repairstatusname', repairstatusname)

    wx.navigateTo({
      url: '../repair_details/index',
    })
  },
  tob_repair_gj: function (e) {
    wx.navigateTo({
      url: '../b_repair_gj/index',
    })
  },
  toScoreend: function (e) {
    wx.navigateTo({
      url: '../complaint/index',
    })
  },


  toaudio: function(e){
    let url = e.currentTarget.dataset.url;
    wx.setStorageSync('audiourl', url);
    wx.navigateTo({
      url: './audio',
    })
  },
  tovideo: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.setStorageSync('videourl', url);
    wx.navigateTo({
      url: './video',
    })
  },
  toimage: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.setStorageSync('imageurl', url);
    wx.navigateTo({
      url: './image',
    })
  }


})
