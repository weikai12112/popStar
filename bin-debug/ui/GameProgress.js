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
    var GameProgress = (function (_super) {
        __extends(GameProgress, _super);
        function GameProgress() {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.GameProgressSkinExml;
            _this.processStatic.width = 0;
            _this.processDynamic.width = 0;
            return _this;
        }
        GameProgress.prototype.setProgress = function (percent) {
            var _this = this;
            percent = Math.min(1, percent);
            var width = this.width * percent;
            this.processStatic.width = width;
            egret.Tween.get(this.processDynamic)
                .to({ width: width }, 500)
                .call(function () { return percent === 1 && _this.finish(); });
        };
        GameProgress.prototype.finish = function () {
            egret.Tween.get(this.processDynamic).to({ alpha: 0 }, 200);
            egret.Tween.get(this.processWin).to({ alpha: 1 }, 200);
            utils.audio.play(Assets.AudioMissionCompletedMp3);
        };
        return GameProgress;
    }(eui.Component));
    ui.GameProgress = GameProgress;
    __reflect(GameProgress.prototype, "ui.GameProgress");
})(ui || (ui = {}));
