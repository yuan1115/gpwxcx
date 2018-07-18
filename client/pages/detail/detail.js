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
const action = require('../../utils/action.js');
const util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article_id : 1328,
        pageIsShow : 0,
        newsdetail : [],
        alert : 0,
        news: [],
        comments : [],
        toTop : 0,
        a : 0,
        b : 0,
        code : 0,
        bindtelshow : 0,
        isable : '',
        style : '',
        userinfo : '',
        footer: wx.getStorageSync("webInfo")
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(wx.getStorageSync("Zf"))
        var article_id = options.id ? options.id : this.data.article_id
        var data = {
            comments:{listRows: 5,page : 1},
            aboutAtricle:{listRows: 6,page:1},
            openid: wx.getStorageSync('userSrc').openid
        }
        var that = this;
        var url = "articleDetail?adminSrcKey=YWRtaW5faGVsbG8=&article_id=" + article_id
        app.ajax({ url: url , method: "POST", data: data }, function(backdata){
            wx.hideLoading()  
            // console.log(backdata)                      
            if(backdata.status==200){
                var article = backdata.data.article.post_content;
                WxParse.wxParse('article', 'html', article, that, 5)
                wx.setNavigationBarTitle({
                    title: backdata.data.article.post_title,
                })
                that.setData({
                    newsdetail: backdata.data.article,
                    pageIsShow:1,
                    news: backdata.data.aboutArticle,
                    comments: backdata.data.comments,
                    article_id: article_id,
                    userinfo :backdata.data.userinfo
                })
            }else{
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
    onShareAppMessage: function (res) {
        var that = this
        return {
            title: this.data.newsdetail.post_title,
            path: '/pages/detail/detail?id=' + this.data.newsdetail.id + "&openid=" + wx.getStorageSync("userSrc").openid,
            // 转发成功
            success: function (res) {
                // var share = wx.getStorageSync("share")
                // var id = that.data.newsdetail.id
                // var newshare = []
                // if(action.count(share)==0){
                //     newshare[0] = id 
                // }else{
                //     for(var i = action.count(share);i>=0;i--){
                //         if(i==action.count(share)){
                //             newshare[0] = id
                //         }else{
                //             if(share[i]!=id){

                //             }
                //         }
                //     }
                // }   
            },
            fail: function (res) {
                // 转发失败
            }
        }
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
     *监听输入框内容 
     */
    commentsContent:function(e){
        var commentsContent
        if(e.detail.value){
            commentsContent = 1
        }else{
            commentsContent = 0
        }
        this.setData({
            commentsContent: commentsContent
        })
    },
    /**
     *验证码 
     */
    code:function(){
        if (this.data.commentsContent){
            this.setData({
                a: Math.ceil(Math.random() * 20),
                b: Math.ceil(Math.random() * 20),
                code: 1,
                isable: "1",
                style: "background:#f0f0f0"
            })
        }else{
            util.showModel('提示：','评论不能为空')
        }
    },
    /**
     * 修改评论
     */
    editComment:function(){
        this.setData({
            code: 0,            
            isable: "",
            style: ""
        })
    },
    /**
     * 提交评论 
     */
    bindFormSubmit:function(e){
        if(e.detail.value.c == this.data.a+this.data.b){
            app.checksession()
            var data = {
                commentContents:e.detail.value.textarea,
                openid: wx.getStorageSync( 'userSrc' ).openid,  
            }
            var url = "commitComments?adminSrcKey=YWRtaW5faGVsbG8=&article_id="+this.data.article_id
            var that = this
            app.ajax({url:url,method:'POST',data:data},function(res){
                wx.hideLoading()
                // console.log(res)
                if(res.status==200){
                    that.setData({
                        comments: res.data,
                        code : 0,
                        style : '',
                        isable : ''
                    })
                    util.showSuccess("提交成功")
                }else if(res.status==500){
                    util.showModel("提示","今天已经达到评论上线")
                }else{
                    util.showModel("提示","提交失败请重试！")
                }
            })
        }else{
            util.showModel("提示","验证码不正确")
            this.code()
        }
    },
    /**
     * 绑定手机号显示
     */
    brandTelBnt: function () {
        this.setData({
            brandTelBnt: !this.data.brandTelBnt
        })
    },
    /**
     *快速绑定手机号 
     */
    brandTel:function(e){
        var that = this
        app.quickBrandTel(e,function(res){
            // console.log(res)
            if(res.status==200){
                that.setData({
                    userinfo : res.data
                })
                util.showSuccess("绑定成功")
            }else{
                 util.showModel("提示",res.data.msg)                
            }
            that.setData({
                brandTelBnt : 0
            })
        })
    }
})