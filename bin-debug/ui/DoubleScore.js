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
    var DoubleScore = (function (_super) {
        __extends(DoubleScore, _super);
        function DoubleScore() {
            return _super.call(this) || this;
        }
        DoubleScore.prototype.createChildren = function () {
            var icon = new lib.ImageButton();
            icon.source = Assets.doubleScorePng;
            this.addChild(icon);
        };
        return DoubleScore;
    }(eui.Component));
    ui.DoubleScore = DoubleScore;
    __reflect(DoubleScore.prototype, "ui.DoubleScore");
})(ui || (ui = {}));
