// 弹窗组件相关
var common = ({
    //  显示消息提示框
    wxmsg: function (style = { title: '', img: '', duration: 1500, mask: true }, callback = '') {
        if (style.img == 1) {
            var imgu = '../../common/img/success.png'
        }
        if (style.img == 0) {
            var imgu = '../../common/img/error.png'
        }
        if (style.img == 2) {
            var imgu = '../../common/img/load.png'
        }
        wx.showToast({
            title: style.title,
            image: imgu,
            duration: style.duration ? style.duration : 1500,
            mask: style.mask,
            success: function (e) {
                callback(e)
            }
        })
    },
    //  显示loading 提示框
    wxload: function (style = { title: '', mask: true }, callback = '') {
        wx.showLoading({
            title: style.title,
            mask: style.mask,
            success: function (e) {
                callback(e)
            }
        })
    },
    //​显示模态弹窗
    wxalert: function (style = {
        title: '', content: '', ok: '',
        cel: '', celc: '', okc: ''
    }, callback = '') {
        wx.showModal({
            title: style.title ? style.title : '',
            content: style.content ? style.content : '',
            confirmText: style.ok ? style.ok : '确定',
            cancelText: style.cel ? style.cel : '取消',
            cancelColor: style.celc ? style.celc : "#000",
            confirmColor: style.okc ? style.okc : '#3CC51F',
            success: function (res) {
                if (res.confirm) {
                    callback(res.confirm)
                } else if (res.cancel) {
                    callback(res.confirm)
                }
            }
        })
    },
    //显示操作菜单
    wxact: function (itemList, callback) {
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                callback(res.tapIndex)
            },
            fail: function (res) {
                callback(-1)
            }
        })
    }
})
module.exports = common