// pages/detail/detail.js
/**
* WxParse.wxParse(bindName , type, data, target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
*/
const app = getApp()
const WxParse = require('../../vendor/wxParse/wxParse.js');
const alert = require('../../utils/alert.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageIsShow : 0,
        newsdetail : [],
        alert : 0,
        news: [],
        comments : [],
        toTop : 0,
        a : 0,
        b : 0,
        c : 0,
        code : 0,
        bindtelshow : 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var article_id = options.id?options.id:1328
        var data = {
            comments:{listRows: 5,page : 1},
            aboutAtricle:{listRows: 6,page:1}
        }
        var that = this;
        var url = "articleDetail?adminSrcKey=YWRtaW5faGVsbG8=&article_id=" + article_id
        app.ajax({ url: url , method: "POST", data: data }, function(backdata){
            if(backdata.status==200){
                wx.hideLoading()
                var article = backdata.data.article.post_content;
                WxParse.wxParse('article', 'html', article, that, 5)
                wx.setNavigationBarTitle({
                    title: backdata.data.article.post_title,
                })
                that.setData({
                    newsdetail: backdata.data.article,
                    pageIsShow:1,
                    news: backdata.data.aboutArticle,
                    comments: backdata.data.comments
                })
            }else{
                wx.hideLoading()
                that.qx()
            }
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
     * 跳转到新闻详情
     */
    newsDetail:function(e){
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../detail/detail?id='+id,
        })
    },
    /**
     *取消弹窗 
     */
    qx:function(){
        var that = this
        this.setData({
            alert : !that.data.alert
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
    },
    /**
     *验证码 
     */
    code:function(){
        this.setData({
            a: Math.ceil(Math.random() * 20),
            b : Math.ceil(Math.random() * 20),
            code : 1
        })
    },
    /**
     * 提交评论 
     */
    bindFormSubmit:function(e){
        if(e.detail.value.c = this.data.a+this.data.b){
            
        }
    }
})