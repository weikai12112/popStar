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
var ui;
(function (ui) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver(score) {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.skinName = Skins.GameOverSkinExml;
            egret.Tween.get(_this, {
                onChange: function () {
                    _this.score = ~~_this.score;
                },
            }).to({ score: score }, 350);
            _this.postScore(score);
            utils.audio.play(Assets.AudioGameOverWav);
            return _this;
        }
        GameOver.prototype.postScore = function (score) {
            if (typeof wx === 'undefined')
                return;
            var dCtx = wx.getOpenDataContext();
            dCtx.postMessage({
                command: 'gameover:render',
                value: score,
            });
        };
        GameOver.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
            this.addChild(new lib.OpenDataContext());
            var TOUCH_TAP = egret.TouchEvent.TOUCH_TAP;
            this.homeBtn.addEventListener(TOUCH_TAP, this.goHome, this);
            this.restartBtn.addEventListener(TOUCH_TAP, this.restart, this);
            this.shareBtn.addEventListener(TOUCH_TAP, this.share, this);
        };
        GameOver.prototype.goHome = function () {
            utils.switchScene(new scene.Home());
        };
        GameOver.prototype.restart = function () {
            utils.switchScene(new scene.Game());
        };
        GameOver.prototype.share = function () {
            utils.shareApp();
        };
        return GameOver;
    }(eui.Component));
    ui.GameOver = GameOver;
    __reflect(GameOver.prototype, "ui.GameOver");
})(ui || (ui = {}));
