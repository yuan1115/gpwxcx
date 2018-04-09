// pages/user/user.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        brandTelBnt: 0,  //绑定手机号按钮
        isBrandTel : 0,  //是否绑定手机号
        userInfo : '',
        gpwUserInfo:'',
        hasUserInfo :false
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
        var that = this
        //微信信息 
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        app.userinfo(function(res){
            if(res.status==200){
                that.setData({
                    gpwUserInfo : res.data
                })
            }
        })
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
        console.log(1)
    },
    setting:function(){
        if (this.data.userInfo){

        }else{
            wx.openSetting({
                success: (res) => {
                    /*
                     * res.authSetting = {
                     *   "scope.userInfo": true,
                     *   "scope.userLocation": true
                     * }
                     */
                }
            })
        }
    },
    brandTelBnt:function(){
        this.setData({
            brandTelBnt: !this.data.brandTelBnt
        })
    },
    toArticle:function(e){
        var url = "../article/article?id="+e.currentTarget.dataset.id
        wx.navigateTo({
            url: url,
        })
    },
    toAbout:function(){
        wx.navigateTo({
            url: '../about/about',
        })
    },
     /**
     *快速绑定手机号 
     */
    brandTel: function (e) {
        app.quickBrandTel(e, function (res) {
            if (res.status == 200) {
                that.setData({
                    gpwUserInfo: res.data
                })
                util.showSuccess("绑定成功")
            } else {
                util.showModel("提示", "绑定失败，请重试！")
            }
        })
    }
})