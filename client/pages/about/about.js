// pages/about/about.js
const app = getApp()
const WxParse = require('../../vendor/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutUs: '',
    pageIsShow:0,
    alert : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = "aboutUs?adminSrcKey=YWRtaW5faGVsbG8="
    app.ajax({ url: url}, function (backdata) {
      wx.hideLoading()                   
      if (backdata.status == 200) {
        var article = backdata.data;
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          aboutUs: backdata.data,
          pageIsShow: 1,
        })
      } else {
        that.qx()
      }
    })
  },
  /**
    *取消弹窗 
    */
  qx: function () {
    var that = this
    this.setData({
      alert: !that.data.alert
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
  onShareAppMessage: function () {
  
  }
})