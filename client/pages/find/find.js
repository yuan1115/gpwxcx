// pages/find/find.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      index_is_show:0,
      alert: 0 ,
      newsCate : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this 
      var url = "nav_menu?adminSrcKey=YWRtaW5faGVsbG8=&term_id=9"
      app.ajax({url:url},function(res){
          console.log(res.data)
          if(res.status==200){
              that.setData({
                  newsCate: res.data,
                  index_is_show: 1
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
  * 跳转列表页
  */
  list: function (e) {
      wx.navigateTo({
          url: '../newsList/newsList?id=' + e.currentTarget.dataset.id,
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
  
  },
  /**
   * 跳转到搜索页面
   */
  search:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  }
})