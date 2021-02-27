module ad {
    let ad: WechatMinigame.InterstitialAd;
    function getAd(): WechatMinigame.InterstitialAd {
        if (ad) return ad;
        ad = wx.createInterstitialAd({
            adUnitId: {
                [EPlatform.WX]: 'adunit-e7592c0d0fff372d',
                [EPlatform.TT]: 'd6fs303irb1e70e1em',
                [EPlatform.QQ]: 'd77a07b0a0d46b7cd477f5189a966cf3',
            }[currentPlatform],
        });
        return ad;
    }
    export function showInterstitial() {
        const ad = getAd();
        if (currentPlatform === EPlatform.WX) {
            ad.show().catch((err) => {
                console.log('插屏广告出错');
                console.log(err);
            });
        } else {
            ad.load()
                .then(() => {
                    ad.show();
                })
                .catch((err) => {
                    console.log('插屏广告出错');
                    console.log(err);
                });
        }
    }
}
