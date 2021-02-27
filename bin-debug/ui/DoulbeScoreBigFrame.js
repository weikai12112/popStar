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
    var DoubleScoreBigFrame = (function (_super) {
        __extends(DoubleScoreBigFrame, _super);
        function DoubleScoreBigFrame(score, x, y) {
            var _this = _super.call(this) || this;
            _this.timeOut = 900;
            _this.skinName = Skins.addDoubleScoreSkinExml;
            _this.doubleScore.text = score;
            setTimeout(function () {
                _this.animate(x, y);
            }, 500);
            return _this;
        }
        DoubleScoreBigFrame.prototype.animate = function (x, y) {
            var _this = this;
            this.doubleScore.horizontalCenter = undefined;
            return egret.Tween.get(this.doubleScore)
                .to({ x: x, y: y }, 400)
                .call(function () {
                _this.parent && _this.parent.removeChild(_this);
            });
        };
        return DoubleScoreBigFrame;
    }(eui.Component));
    ui.DoubleScoreBigFrame = DoubleScoreBigFrame;
    __reflect(DoubleScoreBigFrame.prototype, "ui.DoubleScoreBigFrame");
})(ui || (ui = {}));
