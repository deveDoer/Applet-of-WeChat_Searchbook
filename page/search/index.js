//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    projects: [],
    pagenum: 1,
    count: 0,
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
  onLoad: function (options) {
    console.log('onLoad', options)
    wx.showShareMenu()
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getData(options.s)
  },
  onShow() {
    /*
    // 获取页面高度
    console.info('onShow aaa');
    console.info(wx.getStorageSync('systemInfo'));
    if (wx.getStorageSync('systemInfo')) {
      let sys = wx.getStorageSync('systemInfo')
      this.setData({
        windowHeight: sys.windowHeight
      })
      this.setData({
        aaa: 'sys.windowHeight'
      })
    }
    */
  },
  getData(s) {
    let that = this;
    if (s == '') {
      return;
    }
    //let data = {}
    that.setData({
      s: decodeURIComponent(s)
    })
    wx.request({
      url: app.globalData.domain + '/book/GetBookList',
      data: { q: s },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.info('数据请求结果', res);
        app.globalData.shareSetting.title = 'search novel：' + decodeURIComponent(s);
        app.globalData.shareSetting.path = '/pages/search/index?s=' + s;
        wx.hideToast()
        let response = res.data;
        if (response.code > 0) {
          that.setData({
            books: response.data.list,
            pagenum: response.data.pn,
            count: response.data.count
          })
          let _resmsg = '-- Nothing --';
          if (response.data.count == 0) {
            _resmsg = 'Sorry , can not find ' + s ;
          }
          that.setData({
            resmsg: _resmsg
          })
          //console.info('aaa1', response.data.pn, response.data.count)
        } else {
          console.log('err', response)
          wx.hideToast()
          /*
          //失败就调回上个页面
          wx.redirectTo({
            url: '../search/index?s='
          })
          */
        }
      }
    })
  },
  //提交
  formSubmit: function (e) {
    console.info('formSubmit')
    var _txt = e.detail.value.s_name.trim();
    if (_txt != '') {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
      this.getData(encodeURIComponent(_txt))
    }
  },
  confirmEvent: function (e) {
    console.info('confirmEvent')
    var _txt = e.detail.value.trim();
    if (_txt != '') {
      this.getData(encodeURIComponent(_txt))
    }
  },
  bindTitleTap(e) {
    let booklink = encodeURIComponent(e.currentTarget.dataset.booklink)
    //console.info('bindTitleTap', booklink);
    wx.navigateTo({
      url: '../intro/index?link=' + booklink
    })
  },
  bindChapterTap(e) {
    let chapterlink = encodeURIComponent(e.currentTarget.dataset.chapterlink.replace(new RegExp(/.html/g), '*html'))
    //console.info('bindChapterTap', chapterlink);
    wx.navigateTo({
      url: '../read/index?link=' + chapterlink
    })
  }
})
