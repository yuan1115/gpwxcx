var app = getApp();
var WxParse = require('../../vendor/wxParse/wxParse.js');
Page({
  data: {
    alert : 0,
    nav_menu:[],
    // 轮播信息
    imgUrls: [],
    indicatorDots: false,   //指示点
    autoplay: true,       //自动播放
    interval: 3000,       //自动播放间隔时间
    duration: 1000,        //滑动间隔时间   
    circular: true,         //衔接是否
    scroll : "cate0",
    index_is_show: 0,
    height:'',
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var url = "indexData?adminSrcKey=YWRtaW5faGVsbG8="
    var that = this
    app.ajax({url:url},function(e){
      if(e.status==200){
        that.setData({
          imgUrls : e.data.index_banner,
          nav_menu: e.data.nav_menu,
          index_is_show : 1
        })
      }else{
        that.qx()
      }
      wx.hideLoading()
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
   * 跳转详情页
   */
  newsDetail:function(e){
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
    /**
   * 跳转列表页
   */
  list: function (e) {
    wx.navigateTo({
      url: '../newsList/newsList?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 滚动
   */
  onPageScroll: function (e) {
      if (e.scrollTop>200){
          var classname = "classname"
      }else{
          var classname = ''
      }
      this.setData({
          classname : classname
      })
  },
})