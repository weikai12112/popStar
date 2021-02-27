// module ad {
//     let ad: WechatMinigame.RewardedVideoAd;
//     let loaded: boolean = false;
//     function getAd(): WechatMinigame.RewardedVideoAd {
//         if (ad) return ad;
//         ad = wx.createRewardedVideoAd({
//             adUnitId: {
//                 [EPlatform.WX]: 'adunit-ec7f619a2f032085',
//                 [EPlatform.TT]: '',
//                 [EPlatform.QQ]: '',
//             }[currentPlatform],
//         });
//         ad.onError((e) => {
//             wx.hideLoading({});
//             console.log('激励广告调用失败', e.errCode, e.errMsg);
//         });
//         ad.onLoad(()=>{
//             loaded = true
//         })
//         return ad;
//     }
//     export function showRewardedVideo() {
//         const ad = getAd();
//         if(loaded){
//             return new Promise((rs) => {
//                 ad.show()
//                 ad.onClose(function onClose(res) {
//                     ad.offClose(onClose);
//                     rs(res.isEnded);
//                 });
//             })
//         }else{
//             setTimeout(() => {
//                 showRewardedVideo()
//             }, 200);
//         }
//     }
// }
var ad;
(function (ad_1) {
    var ad;
    var closeHandle = function (res) { };
    var adUnitId = (_a = {},
        _a[EPlatform.WX] = 'adunit-ec7f619a2f032085',
        _a[EPlatform.TT] = '',
        _a[EPlatform.QQ] = '',
        _a)[currentPlatform];
    function getAd() {
        if (ad) {
            wx.showLoading({ title: '广告加载中', mask: true });
            return ad;
        }
        wx.showLoading({ title: '广告加载中', mask: true });
        ad = wx.createRewardedVideoAd({
            adUnitId: adUnitId,
        });
        ad.onClose(function (res) {
            closeHandle(res);
        });
        ad.onError(function (e) {
            wx.hideLoading({});
            console.log('激励广告调用失败', e.errCode, e.errMsg);
        });
        return ad;
    }
    function showRewardedVideo() {
        if (!adUnitId)
            return Promise.reject(Error('no adUnitId'));
        return new Promise(function (rs) {
            closeHandle = rs;
            var ad = getAd();
            ad.load().then(function () {
                ad.show().then(function () {
                    wx.hideLoading();
                });
            });
        });
    }
    ad_1.showRewardedVideo = showRewardedVideo;
    var _a;
})(ad || (ad = {}));
