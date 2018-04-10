// pages/newsList/newsList.js
const app = getApp()
var action = require("../../utils/action.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
        id : 1,
        did :13 ,
        alert : 0,
        page : 1,
        pages : 0,
        page_is_show : 0,
        index_is_show : 0,
        nav:[],
        news: [],
        toTop : 0,
        footer: wx.getStorageSync("webInfo")
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {  
        var term_id = options.id
        var that = this
        var url = "category?adminSrcKey=YWRtaW5faGVsbG8=&term_id="+term_id
        app.ajax({url:url},function(res){
            var id
            if (res.data.category){
                id = res.data.category[0]['term_id'] 
            }else{
                id = res.data.term_id
            }
            that.setData({
                nav : res.data.category,
                index_is_show : 1 ,
                id: id
            })
            that.getData(id)                                
            wx.setNavigationBarTitle({
                title: res.data.name
            })
            wx.hideLoading()
        })
    },
    /**
     *获取数据 
     */
    getData:function(id){
        var url = "articleList?adminSrcKey=YWRtaW5faGVsbG8=&term_id=" + id
        var that = this
        var page = that.data.page
        var news = that.data.news
        var data = { page: page}        
        if (that.data.pages == page) {
            this.setData({
                page_is_show: 1
            })
            return false
        }
        app.ajax({ url: url, method: "POST",data:data}, function (res) {
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
                news: news
            })
            wx.hideLoading()            
        })
    },
    /**
     *切换分类
     */
    cate:function(e){
        this.setData({
            page : 1,
            pages :0,
            page_is_show : 0,
            id : e.currentTarget.id,
            news : []
        })
        this.getData(e.currentTarget.id)
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
        this.getData(this.data.id)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    newsDetail: function (e) {
        wx.navigateTo({
            url: '../detail/detail?id='+e.currentTarget.dataset.id
        })
    },
    /**
 * 返回顶部
 */
    toTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
        })
    },
    /**
     *监测滚动 
     */
    onPageScroll: function (e) {
        if (e.scrollTop > 200) {
            var toTop = 1;
        } else {
            var toTop = 0;
        }
        this.setData({
            toTop: toTop
        })
    }
})