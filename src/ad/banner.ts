module ad {
    let ad: WechatMinigame.BannerAd;
    function getBannerAd(): WechatMinigame.BannerAd {
        if (ad) return ad;
        const sysInfo = wx.getSystemInfoSync();
        ad = wx.createBannerAd({
            adUnitId: {
                [EPlatform.WX]: 'adunit-01c1292b4fc25bfb',
                [EPlatform.TT]: '',
                [EPlatform.QQ]: '',
            }[currentPlatform],
            style: {
                left: 0,
                top: sysInfo.screenHeight - sysInfo.screenWidth * 0.35,
                width: sysInfo.screenWidth,
                height: sysInfo.screenWidth * 0.35,
            },
        });
        ad.onResize((e) => {
            ad.style.top = sysInfo.screenHeight - e.height;
        });
        // ad.onLoad(() => {
        //     ad.show();
        // });
        ad.onError((e) => {
            console.log(e);
        });
        return ad;
    }
    export function showHomeBanner() {
        getBannerAd().show();
    }
    export function hideHomeBanner() {
        getBannerAd().hide();
    }
}
