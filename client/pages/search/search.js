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
      keys: wx.getStorageSync("sel_keys"),
      news: [
          {
              title: "【严为民】55亿罚款吓傻游资！",
              mintroduce: "目前这个市场调整原因有这么几个，中午基本上说全了，但是差了一个。，中午基本上说全了，但是差了一个。，中午基本上说全了，但是差了一个。",
              createTime: "2018-3-14 06:28",
              id: 1332,
              img: "http://dev.xiaoyukeji.cn/wp-content/uploads/2018/03/严为民广告位-1-e1520839741828.jpg"
          },
          {
              title: "【严为民】55亿罚款吓傻游资！",
              mintroduce: "目前这个市场调整原因有这么几个，中午基本上说全了，但是差了一个。",
              createTime: "2018-3-14 06:28",
              id: 1332,
              img: "http://dev.xiaoyukeji.cn/wp-content/uploads/2018/03/严为民广告位-1-e1520839741828.jpg"
          },
          {
              title: "【严为民】55亿罚款吓傻游资！",
              mintroduce: "目前这个市场调整原因有这么几个，中午基本上说全了，但是差了一个。",
              createTime: "2018-3-14 06:28",
              id: 1332,
              img: "http://dev.xiaoyukeji.cn/wp-content/uploads/2018/03/严为民广告位-1-e1520839741828.jpg"
          }
      ]
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
      var that = this
      var data = { key: key, page: 1, length: 10, openid: app.globalData.openid }
      this.getData(data, function (e) {
          that.setData({
              goods: e.data,
              key: key
          })
      })
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
          key: key
      })

  },
})