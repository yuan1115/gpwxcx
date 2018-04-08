// pages/search/search.js
const action = require("../../utils/action.js")
const util = require("../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      key : '',
      toTop : 0,
      keys: wx.getStorageSync("sel_keys"),
      news: [],
      page: 1,
      pages: 0,
      page_is_show: 0,
      footerstyle: "position: fixed;bottom:0",
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
      if(this.data.key){
          this.getData(this.data.key)      
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //监视关键词
  keyscliece: function (e) {
      if (!e.detail.value) {
          this.setData({
              key: '',
              keys: wx.getStorageSync("sel_keys")
          })
      }
  },
  //历史搜索
  historysel: function (e) {
      var key = e.currentTarget.dataset.key
      this.setData({
          news: []
      })
      this.getData(key)
  },
  removekey: function () {
      //这里要加入清除搜索关键的缓存
      this.setData({
          keys: 0
      })
      wx.setStorageSync("sel_keys", {})
  },
  /**
   * 搜索
   */
  formSubmit: function (e) {
      var that = this
      var key = e.detail.value.key
      if (key.length == 0 || key.match(/^[ ]*$/)){
          util.showModel('提示',"关键字不能为空")
          return false
      }
      var keys = wx.getStorageSync("sel_keys") ? wx.getStorageSync("sel_keys") : {}
      var len = action.count(keys)
      keys[len] = key
      var newkeys = {}
      var p = 0
      for (var i = len; i >= 0; i--) {
          if (!action.in_array(keys[i], newkeys)) {
              newkeys[p] = keys[i]
              p++
          }
      }
      wx.setStorageSync("sel_keys", newkeys)
      this.setData({
          keys:newkeys,
          key: key,
          page : 1,
          pages : 0,
          news : []
      })
    //请求数据
    this.getData(key)
  },
  /**
 *获取数据 
 */
  getData: function (key) {
      var url = "articleList?adminSrcKey=YWRtaW5faGVsbG8=&keyword=" + key
      var that = this
      var page = that.data.page
      var news = that.data.news
      var data = { page: page }
      if (that.data.pages == page) {
          this.setData({
              page_is_show: 1
          })
          return false
      }
      app.ajax({ url: url, method: "POST", data: data }, function (res) {
          var len = action.count(res.data)
          if (len == 0) {
              var pages = page
          } else {
              page++
              var pages = 0
          }
          news = action.push(news, res.data)
          that.setData({
              page: page,
              pages: pages,
              news: news,
              key : key,
              footerstyle : ''
          })
          wx.hideLoading()
      })
  },
  /**
   *跳转详情页 
   */
  newsDetail : function(e){
      wx.navigateTo({
          url: '../detail/detail?id=' + e.currentTarget.dataset.id,
      })
  },
  /**
   * 返回顶部
   */
  toTop:function(){
      wx.pageScrollTo({
          scrollTop: 0,
      })
  },
  /**
   *监测滚动 
   */
  onPageScroll:function(e){
      if(e.scrollTop>200){
          var toTop = 1;
      }else{
          var toTop = 0;
      }
      this.setData({
          toTop : toTop
      })
  }
})