// pages/webUrl/webUrl.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        webUrl : ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            webUrl : options.webUrl,
        })
        if (options.title){
            wx.setTopBarText({
                text: options.title,
            })
        }       
    },
})