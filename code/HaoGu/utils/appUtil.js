
var Api = require('../api/api.js')

function getOpenId(app) {
    wx.login({
        success: function (res) {
            // success
            console.log("login sucesss", res)
            var code = res.code

            wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                data: {
                    appid: "wxcf49fea1d8e137ba",
                    secret: "1df1ef42b8060f96d7752fe03569ab97",
                    js_code: res.code,
                    grant_type: "authorization_code"
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function (res) {
                    app.globalData.openId = res.data.openid
                    requestOptionals()
                },
                fail: function (res) {
                    console.log("get openid fail", res)
                },
                complete: function () {

                }
            })
        },
        fail: function (res) {
            // fail
            console.log("login fail", res)
        },
        complete: function () {
            // complete
        }
    })
}

//网络类型
function getNetWorkType() {
    wx.getNetworkType({
        success: function (res) {
            getApp().globalData.netWorkType = res.networkType
        }
    })
}

function requestOptionals() {
    Api.stock.requestOptionals({

    }).then(function (res) {

    }, function (res) {

    })
}

module.exports = {
    getOpenId: getOpenId,
    getNetWorkType: getNetWorkType,
}