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


module ad {
        let ad: WechatMinigame.RewardedVideoAd;
        let closeHandle = (res: WechatMinigame.RewardedVideoAdOnCloseCallbackResult) => {};
        let adUnitId: string = {
            [EPlatform.WX]: 'adunit-ec7f619a2f032085',
            [EPlatform.TT]: '',
            [EPlatform.QQ]: '',
        }[currentPlatform];
        function getAd(): WechatMinigame.RewardedVideoAd {
            if (ad){
                wx.showLoading({ title: '广告加载中', mask: true });
                return ad;
            }
            wx.showLoading({ title: '广告加载中', mask: true });
            ad = wx.createRewardedVideoAd({
                adUnitId,
            });
            ad.onClose((res) => {
                closeHandle(res);
            });
            ad.onError((e) => {
                wx.hideLoading({});
                console.log('激励广告调用失败', e.errCode, e.errMsg);
            });
            return ad;
        }
    
        export function showRewardedVideo() {
            if (!adUnitId) return Promise.reject(Error('no adUnitId'));
            return new Promise<WechatMinigame.RewardedVideoAdOnCloseCallbackResult>((rs) => {
                closeHandle = rs;
                const ad = getAd();
                ad.load().then(() => {
                    ad.show().then(() => {
                        wx.hideLoading();
                    });
                });
            });
        }
    }
    