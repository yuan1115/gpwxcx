//app.js
var alert = require("utils/alert.js")
var action = require("utils/action.js")
var util = require("utils/util.js")
App({
    globalData: {
        userInfo: null,
    },
    onLaunch: function () {
        var that = this
        // 获取用户的appid和seeion_key
        wx.login({
            success: function (res) {
                if (res.code) {
                    that.getOpenid(res.code, function (e) {
                        // console.log(e)
                        wx.setStorageSync("userSrc",e.data)
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
        this.getFooter()
    },
    //ajax发送
    ajax: function (pdata = { url: url, method: "", data: data }, callback) {
        if (pdata.method == "POST") {
            var postdata = action.json2Form(pdata.data)
            var header = 'application/x-www-form-urlencoded'
        } else {
            var header = 'application/json'
            var postdata = ""
        } 
        alert.wxload({title:'加载中...'},function(){})
        wx.request({
            url: 'https://api.3ggpw.cn/Api/Index/' + pdata.url,
            method: pdata.method ? pdata.method : "GET",
            data: postdata,
            header: {
                'content-type': header
            },
            success: function (res) {
              console.log(res)
                callback(res.data)
            }
        })
    },
    //获取openid
    getOpenid: function (code, callback) {
        var url = "getOpenid?adminSrcKey=YWRtaW5faGVsbG8="
        var data = { code: code }
        this.ajax({ url: url, method: "POST", data: data }, function (res) {
            wx.hideLoading()
            callback(res)
        })
    },
    //检测登录状态
    checksession: function () {
        wx.checkSession({
            fail: function () {
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            that.getOpenid(res.code, function (e) {
                                that.globalData.openid = e.openid
                                that.globalData.session_key = e.session_key
                            })
                        } else {
                            console.log('获取用户登录态失败！' + res.errMsg)
                        }
                    }
                })
            }
        })
    },
    /**
     *根据openid获取用户信息 
     */
    userinfo:function(callback){
        var url = "getUserInfo?adminSrcKey=YWRtaW5faGVsbG8=&openid=" + wx.getStorageSync("userSrc").openid
        this.ajax({url:url},function(res){
            wx.hideLoading()
            callback(res)
        })
    },
    /** 
     *快速绑定手机号码 
     */
    quickBrandTel:function(e,callback){
        var data = { session_key: wx.getStorageSync("userSrc").session_key, encryptedData: e.detail.encryptedData, iv: e.detail.iv, openid: wx.getStorageSync("userSrc").openid}
        var url = "brandTel?adminSrcKey=YWRtaW5faGVsbG8="
        this.ajax({url:url,method:"POST",data:data},function(res){
            wx.hideLoading()
            callback(res)
        })
    },
    /**
     * 获取公共底部数据
     */
    getFooter: function () {
        var url = "getFooter?adminSrcKey=YWRtaW5faGVsbG8="
        this.ajax({ url: url}, function (res) {
            // console.log(res)
            wx.setStorageSync("webInfo", res.data)
            wx.hideLoading()
        })
    },
    /**
     * 列表标题语义转化
     */
    htmlToView:function(data){
      
    }
})