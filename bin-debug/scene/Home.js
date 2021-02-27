var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var scene;
(function (scene) {
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home() {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.HomeSkinExml;
            _this.startBtn.source = Assets.HomeStartBtnPng;
            _this.rankBtn.source = Assets.HomeRankBtnPng;
            _this.soundBtn.source = _this.soundSource;
            _this.shareBtn.source = Assets.HomeShareBtnPng;
            _this.watchVideoBtn.source = Assets.getPropsPng;
            var TOUCH_TAP = egret.TouchEvent.TOUCH_TAP;
            _this.startBtn.addEventListener(TOUCH_TAP, _this.startGame, _this);
            _this.rankBtn.addEventListener(TOUCH_TAP, _this.openRanking, _this);
            _this.soundBtn.addEventListener(TOUCH_TAP, _this.toggleMute, _this);
            _this.shareBtn.addEventListener(TOUCH_TAP, _this.share, _this);
            _this.watchVideoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.watchVideo, _this);
            _this.watchAdBtn();
            return _this;
        }
        Home.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
        };
        /** 开始游戏 */
        Home.prototype.startGame = function () {
            clearTimeout(this.timeOut);
            if (!storage.setting.state.skipGuide) {
                utils.switchScene(new scene.GameGuide());
            }
            else if (storage.game.state) {
                var state = storage.game.state;
                utils.switchScene(new scene.Game(state.level, state.score, state.stars));
            }
            else {
                utils.switchScene(new scene.Game());
            }
        };
        /** 打开排行榜 */
        Home.prototype.openRanking = function () {
            var ranking = new ui.Ranking();
            this.addChild(ranking);
        };
        /** 分享 */
        Home.prototype.share = function () {
            utils.shareApp();
        };
        /** 切换静音 */
        Home.prototype.toggleMute = function () {
            utils.audio.mute = !utils.audio.mute;
            this.soundBtn.source = this.soundSource;
        };
        Object.defineProperty(Home.prototype, "soundSource", {
            get: function () {
                return utils.audio.mute ? Assets.HomeSoundBtnMutePng : Assets.HomeSoundBtnPng;
            },
            enumerable: true,
            configurable: true
        });
        /** 观看广告按钮显示延迟 */
        Home.prototype.watchAdBtn = function () {
            var _this = this;
            if (storage.props.awaitTimes) {
                this.watchVideoBtn.visible = true;
            }
            else {
                this.watchVideoBtn.visible = false;
                setTimeout(function () {
                    _this.watchVideoBtn.visible = true;
                }, storage.props.lastTimes);
                console.log(storage.props.lastTimes);
            }
            var shake = function () {
                egret.Tween.get(_this.watchVideoBtn)
                    .to({ scaleX: 1.2, scaleY: 0.8 }, 200)
                    .to({ scaleX: 0.9, scaleY: 1.1 }, 200)
                    .to({ scaleX: 1.1, scaleY: 0.9 }, 200)
                    .to({ scaleX: 0.9, scaleY: 1.1 }, 200)
                    .to({ scaleX: 1.1, scaleY: 0.9 }, 200)
                    .to({ scaleX: 1, scaleY: 1 }, 200)
                    .wait(300)
                    .call(shake);
            };
            shake();
        };
        /** 观看广告 */
        Home.prototype.watchVideo = function () {
            var _this = this;
            this.watchVideoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.watchVideo, this);
            ad.showRewardedVideo().then(function (res) {
                _this.watchVideoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.watchVideo, _this);
                if (res.isEnded) {
                    var reward = new ui.GetProp();
                    reward.horizontalCenter = reward.verticalCenter = 0;
                    _this.addChild(reward);
                    storage.props.signAd();
                    _this.watchVideoBtn.visible = false;
                    _this.timeOut = setTimeout(function () {
                        _this.watchVideoBtn.visible = true;
                    }, 120000);
                }
            });
        };
        return Home;
    }(eui.Component));
    scene.Home = Home;
    __reflect(Home.prototype, "scene.Home");
})(scene || (scene = {}));
