var ad;
(function (ad_1) {
    var ad;
    function getAd() {
        if (ad)
            return ad;
        ad = wx.createInterstitialAd({
            adUnitId: (_a = {},
                _a[EPlatform.WX] = 'adunit-e7592c0d0fff372d',
                _a[EPlatform.TT] = 'd6fs303irb1e70e1em',
                _a[EPlatform.QQ] = 'd77a07b0a0d46b7cd477f5189a966cf3',
                _a)[currentPlatform],
        });
        return ad;
        var _a;
    }
    function showInterstitial() {
        var ad = getAd();
        if (currentPlatform === EPlatform.WX) {
            ad.show().catch(function (err) {
                console.log('插屏广告出错');
                console.log(err);
            });
        }
        else {
            ad.load()
                .then(function () {
                ad.show();
            })
                .catch(function (err) {
                console.log('插屏广告出错');
                console.log(err);
            });
        }
    }
    ad_1.showInterstitial = showInterstitial;
})(ad || (ad = {}));
