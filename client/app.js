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
                        wx.setStorageSync("userSrc",e.data)
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
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
            url: 'http://192.168.2.165/rycs/gpwApi/index/' + pdata.url,
            method: pdata.method ? pdata.method : "GET",
            data: postdata,
            header: {
                'content-type': header
            },
            success: function (res) {
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
    }
})