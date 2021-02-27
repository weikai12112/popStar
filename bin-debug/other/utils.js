var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /** 获取随机数 */
    function getRandomNumber(MIN, MAX) {
        return Math.random() * (MAX - MIN) + MIN;
    }
    utils.getRandomNumber = getRandomNumber;
    /** 获取随机整数 */
    function getRandomInteger(MIN, MAX) {
        return Math.floor(getRandomNumber(MIN, MAX + 1));
    }
    utils.getRandomInteger = getRandomInteger;
    /** 获取随机数 */
    function getRandomFrom(arr) {
        return arr[getRandomInteger(0, arr.length - 1)];
    }
    utils.getRandomFrom = getRandomFrom;
    /** 是否为高占屏手机 */
    utils.isHighRatioScreen = (function () {
        var systemInfo = wx.getSystemInfoSync();
        return systemInfo.windowHeight / systemInfo.windowWidth > 2;
    })();
    /** 切换场景 */
    function switchScene(scene) {
        var stage = egret.MainContext.instance.stage;
        stage.removeChildren();
        stage.addChild(scene);
    }
    utils.switchScene = switchScene;
    /** 获取主场景 */
    function getStage() {
        return egret.MainContext.instance.stage;
    }
    utils.getStage = getStage;
    function vw(n) {
        return ~~((n / 100) * egret.MainContext.instance.stage.stageWidth);
    }
    utils.vw = vw;
    function vh(n) {
        return ~~((n / 100) * egret.MainContext.instance.stage.height);
    }
    utils.vh = vh;
    /** 坐标转换*/
    function pointTransform(x, y, obj) {
        return obj.localToGlobal(x, y);
    }
    utils.pointTransform = pointTransform;
    var Audio = (function () {
        function Audio() {
            this.mute = false;
            this.group = new Map();
        }
        Audio.prototype.play = function (name, times) {
            if (times === void 0) { times = 1; }
            if (this.mute)
                return;
            if (!this.group.has(name)) {
                this.group.set(name, RES.getRes(name));
            }
            var sound = this.group.get(name);
            return sound.play(0, times);
        };
        return Audio;
    }());
    __reflect(Audio.prototype, "Audio");
    utils.audio = new Audio();
    function getGif(name, movieClipName) {
        if (movieClipName === void 0) { movieClipName = 'default'; }
        name = name.slice(0, name.lastIndexOf('.'));
        var mcFactory = new egret.MovieClipDataFactory(RES.getRes(name.concat('.json')), RES.getRes(name.concat('.png')));
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(movieClipName));
        var remove = function () { return mc.parent && mc.parent.removeChild(mc); };
        mc.addEventListener(egret.MotionEvent.COMPLETE, remove, null);
        return mc;
    }
    utils.getGif = getGif;
    function playGif(name, movieClipName) {
        if (movieClipName === void 0) { movieClipName = 'default'; }
        var mc = getGif(name, movieClipName);
        egret.MainContext.instance.stage.addChild(mc);
        mc.play();
        return mc;
    }
    utils.playGif = playGif;
    function setScore(score) {
        return new Promise(function (reslove, reject) {
            wx.setUserCloudStorage({
                KVDataList: [
                    {
                        key: 'score',
                        value: JSON.stringify({
                            wxgame: {
                                score: score,
                                update_time: Date.now(),
                            },
                        }),
                    },
                ],
                success: reslove,
                fail: reject,
            });
        });
    }
    utils.setScore = setScore;
    var shareAppMessageOption = {
        title: '我现在遇到一些很坏的星星，需要你的帮助！',
        imageUrl: 'resource/shareCover.png',
    };
    function shareApp() {
        wx.shareAppMessage(shareAppMessageOption);
    }
    utils.shareApp = shareApp;
    function showShareMenu() {
        if (typeof wx === 'undefined')
            return;
        wx.showShareMenu({});
        wx.onShareAppMessage(function () { return shareAppMessageOption; });
    }
    utils.showShareMenu = showShareMenu;
})(utils || (utils = {}));
