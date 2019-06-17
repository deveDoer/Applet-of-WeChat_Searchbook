//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {}
  },
  
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareSetting.title,
      path: app.globalData.shareSetting.path,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },

  onShow: function () {
    console.info('onShow', 'index');
    this.onShareAppMessage();
    this.setData({
      historyList: app.getHistorListOrderByDesc()
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    wx.showShareMenu()
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      //lastreadurl: app.globalData.localStorage.usage.lastreadurl,
      //lastreadchaptername: app.globalData.localStorage.usage.lastreadchaptername,
      //lastreadbookname: app.globalData.localStorage.usage.lastreadbookname,
      historyList: app.getHistorListOrderByDesc(),
      footer_visible: app.globalData.localStorage.usage.history.length == 0 ? 'none' : 'block'
    })
  },
  //跳转
  redirectFunc: function (name) {
    wx.reLaunch({
      url: '../search/index?s=' + name
    })
  },
  //提交
  formSubmit: function (e) {
    console.info('formSubmit')
    var _txt = e.detail.value.s_name.trim();
    if (_txt != '') {
      this.redirectFunc(encodeURIComponent(_txt));
    }
  },
  confirmEvent: function (e) {
    console.info('confirmEvent')
    var _txt = e.detail.value.trim();
    if (_txt != '') {
      this.redirectFunc(encodeURIComponent(_txt));
    }
  },
  bindlongRemoveRecodtap: function (e) {
    console.info('bindlongRemoveRecodtap')
    this.setData({
      footer_visible: 'none'
    })
    app.globalData.localStorage.usage.history = [];
    wx.setStorageSync(app.globalData.localStorageKey, app.globalData.localStorage);
  }
})
