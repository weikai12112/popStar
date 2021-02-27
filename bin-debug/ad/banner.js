var ad;
(function (ad_1) {
    var ad;
    function getBannerAd() {
        if (ad)
            return ad;
        var sysInfo = wx.getSystemInfoSync();
        ad = wx.createBannerAd({
            adUnitId: (_a = {},
                _a[EPlatform.WX] = 'adunit-01c1292b4fc25bfb',
                _a[EPlatform.TT] = '',
                _a[EPlatform.QQ] = '',
                _a)[currentPlatform],
            style: {
                left: 0,
                top: sysInfo.screenHeight - sysInfo.screenWidth * 0.35,
                width: sysInfo.screenWidth,
                height: sysInfo.screenWidth * 0.35,
            },
        });
        ad.onResize(function (e) {
            ad.style.top = sysInfo.screenHeight - e.height;
        });
        // ad.onLoad(() => {
        //     ad.show();
        // });
        ad.onError(function (e) {
            console.log(e);
        });
        return ad;
        var _a;
    }
    function showHomeBanner() {
        getBannerAd().show();
    }
    ad_1.showHomeBanner = showHomeBanner;
    function hideHomeBanner() {
        getBannerAd().hide();
    }
    ad_1.hideHomeBanner = hideHomeBanner;
})(ad || (ad = {}));
