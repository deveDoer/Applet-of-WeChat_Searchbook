//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
    wx.setStorageSync('logs', logs)
    //localStorage
    //var localStorageObj = wx.getStorageSync(this.globalData.localStorageKey);
    var that = this;
    
    wx.getStorage({
      key: that.globalData.localStorageKey,
      success: function (res) {
        console.info('localStorageObj', res.data)
        if (res.data) {
          that.globalData.localStorage = res.data;
          that.globalData.localStorage.usage.history = that.globalData.localStorage.usage.history || [];
        }
      }
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (response) {
          console.info('response', response)
          wx.getUserInfo({
            success: function (res) {
              console.info('res', res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    domain: 'https://www.somethingwhat.com',
    localStorage: {
      style: {},
      usage: {
        //lastreadurl: '',
        //lastreadchaptername: '',
        //lastreadbookname: '',
        history: []
      }
    },
    localStorageKey: 'searchnovel_localStorage_key',
    shareSetting: {
      title: 'Search your favourite novel'',
      path: '/pages/home/index'
    }
  },

  resetHistoryList: function (item) {
    //console.info('item', item)
    var that = this
    //let historyObj = that.globalData.localStorage.usage.history;
    let newList = [];
    for (let idx in that.globalData.localStorage.usage.history) {
      let model = that.globalData.localStorage.usage.history[idx];
      //console.info('model', model)
      if (model.bookname != item.bookname) {
        newList.push(model);
      }
    }
    newList.push(item);
    //console.info('newList', newList)
    let length = newList.length;
    if (length > 5) {
      newList = newList.slice(length - 5, length);
    }
    that.globalData.localStorage.usage.history = newList;
  },

  getHistorListOrderByDesc: function () {
    var that = this
    let newList = [];
    let length = that.globalData.localStorage.usage.history.length;
    for (let idx in that.globalData.localStorage.usage.history) {
      let model = that.globalData.localStorage.usage.history[length - idx - 1];
      newList.push(model);
    }
    return newList;
  },
  
  onShow: function () {
    wx.showShareMenu()
    console.info('onShow');
  }
})
