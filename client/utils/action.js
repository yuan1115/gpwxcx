// 公共功能性函数对象
var common = ({
    // js加减乘除精度运算
    //加    
    add:function(arg1, arg2){    
        var r1, r2, m;    
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;    
    }   , 
    //减    
    plus:function(arg1, arg2) {
        var r1, r2, m, n;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度    
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    //乘    
    mul:function(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    //除   
    float:function(arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
        try { t2 = arg2.toString().split(".")[1].length } catch (e) { }

        r1 = Number(arg1.toString().replace(".", ""));

        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }  ,
    //in_array
    in_array:function(search,arr){
        for(var p in arr){
            if (arr[p] == search) {
                return true
            }
            return false
        }
    },
    //wx.request =>post模式下数据结构转换encode
    json2Form: function (json) {
        var str = [];
        for (var p in json) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
        }
        return str.join("&");
    },
    //截取字符串函数
    mb_substr: function (start, end, chars){
        var sum = 0;
        for (var i = 0; i < chars.length; i++) {
            var c = chars.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                sum++;
            }
            else {
                sum += 2;
            }
        }
        return sum;
    },
     //统计对象长度
    count: function (obj) {
            var objType = typeof obj;
            if (objType == "string") {
                return obj.length;
            } else if (objType == "object") {
                var objLen = 0;
                for (var i in obj) {
                    objLen++;
                }
                return objLen;
            }
    },
    //追加数据或对象
    push:function(olddata,adddata){
        var len = this.count(olddata) 
        var nlen = this.count(adddata) 
        var count = len + nlen
        for (var i = len; i < count; i++) {
            olddata[i] = adddata[i - len]
        }
        return olddata
    },
    //读取缓存判断是否存在，不存在发请求
    getcookie:function(name,callback){
        var nav = wx.getStorageSync(name)
        if (nav) {
            callback(nav)
        } else {
            callback(0)
        }
    },
    //删除指定缓存数据
    delcookie: function (id, content, date_name, callback) {
        var that = this
        wx.showModal({
            title: '提示',
            content: '是否删除' + content,
            success: function (res) {
                if (res.confirm) {
                    var addr = wx.getStorageSync(date_name)
                    var len = that.count(addr)
                    var newadd
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            if (i != id) {
                                if (i < id) {
                                    var j = i
                                } else {
                                    var j = i - 1
                                }
                                if (j == 0) {
                                    newadd = { 0: addr[i] }
                                } else {
                                    newadd[j] = addr[i]
                                }
                            }
                        }
                    }
                    if (!newadd) {
                        newadd = ''
                    }
                    wx.setStorageSync(date_name, newadd)
                    callback(newadd)
                } else if (res.cancel) {

                }
            }
        })
    },
    //删除多个数据
    delmoreA:function(arr,data,content,callback){
        var that = this
        wx.showModal({
            title: '提示',
            content: '是否删除' + content,
            success: function (res) {
                if (res.confirm) {
                    callback(that.delmore(arr,data))
                } else if (res.cancel){
                    callback(-1)
                } 
            }
        })
    },
    delmore:function(arr,data){
        var id = arr[0]
        var newadd = {}
        var newarr = {}
        var calldata = {}
        if(this.count(data)>0){
            for (var p in data) {
                if (p != id) {
                    newadd[p] = data[p]
                }
            }
            for(var m in arr){
                if(m!=0){
                    newarr[m-1] = arr[m]
                }
            }
        }
        if (this.count(newarr)>0){
            return this.delmore(newarr,newadd)
        }else{
            var i = 0
            for(var n in newadd){
                calldata[i] = newadd[n]
                i++
            }
            return calldata
        }
    }
})
module.exports = common