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
    var DoubleScoreSmallFrame = (function (_super) {
        __extends(DoubleScoreSmallFrame, _super);
        function DoubleScoreSmallFrame(score) {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.doubleScoreSmallFrameSkinExml;
            _this.score = score;
            _this.animate();
            return _this;
        }
        DoubleScoreSmallFrame.prototype.animate = function () {
            var _this = this;
            this.addScoreLabel.text = this.score;
            egret.Tween.get(this)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 80)
                .to({ scaleX: 1, scaleY: 1 }, 80).wait(500)
                .call(function () {
                _this.visible = false;
            });
            egret.Tween.get(this.addScoreGroup)
                .to({ alpha: 1 }, 20).wait(300)
                .to({ alpha: 0 }, 400);
        };
        return DoubleScoreSmallFrame;
    }(eui.Component));
    ui.DoubleScoreSmallFrame = DoubleScoreSmallFrame;
    __reflect(DoubleScoreSmallFrame.prototype, "ui.DoubleScoreSmallFrame");
})(ui || (ui = {}));
