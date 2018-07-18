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
        userInfo: wx.getStorageSync('userInfo'),
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
        app.userinfo(function(res){
            if(res.status==200){
                that.setData({
                    gpwUserInfo : res.data
                })
            }
        })
    },
    onGotUserInfo:function(e){
      wx.setStorageSync("userInfo", e.detail.userInfo)
        this.setData({
          userInfo: e.detail.userInfo
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
        if (!this.data.userInfo){
      
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
        var that = this
        app.quickBrandTel(e, function (res) {
            console.log(res)
            if (res.status == 200) {
                that.setData({
                    gpwUserInfo: res.data
                })
                util.showSuccess("绑定成功")
            } else {
                util.showModel("提示", res.data.msg)
            }
            that.setData({
                brandTelBnt: 0
            })
        })
    }
})