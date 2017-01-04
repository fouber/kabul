import Promise from './lib/es6-promise-min';

// let BaseUrl = "http://192.168.3.51:8094/?X-Protocol-Id="    // 邬  K线
// let BaseUrl = "http://120.55.169.35:1121/?X-Protocol-Id="    // 郭磊  K线
// let BaseUrl = "http://192.168.8.189:2368/?X-Protocol-Id="      // 郭磊   个股新闻
let BaseUrl = "http://192.168.8.189:1122/?X-Protocol-Id="    // 邬  股票行情
var TranferUrl = "https://mobiletest.emoney.cn/wxapp/transfer"
let BaseOptionalUrl = "http://192.168.8.189:1131/?X-Protocol-Id="   // 男神   自选股

function request(options) {
    var opts = Object.assign({
        method: 'POST',
        header: {
            // 'X-Protocol-Id': '20400',
            'X-Request-Id': '2016-12-15',
            'Content-Type': 'application/json'
        },
        showLoading: true,
        showFailMsg: true
    }, options);
    console.log('request ', opts)
    
    var promise = new Promise(function (resolve, reject) {
        opts.success = function (res) {
            console.log("====request sucess:" + opts.url)

            resolve(res);
        }
        opts.fail = function (res) {
            console.log("====request fail:", opts.url, res)

            opts.showFailMsg && wx.showToast({
                title: '请求失败',
                icon: 'warn',
                duration: 10000
            });
            reject(res);
        }
        opts.complete = function () {
            opts.showLoading && wx.hideToast();
            typeof options.complete === 'function' && options.complete(res);
        }
        opts.showLoading && wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 100000
        });
        wx.request(opts);
    });
    return promise;
}

module.exports = {
    request: request,
    BaseUrl: BaseUrl,
    BaseOptionalUrl: BaseOptionalUrl,
    TranferUrl: TranferUrl
}