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
    var GameTip = (function (_super) {
        __extends(GameTip, _super);
        function GameTip(text1, text2) {
            var _this = _super.call(this) || this;
            _this.text1 = '';
            _this.text2 = '';
            _this.skinName = Skins.GameTipExml;
            _this.text1 = text1;
            _this.text2 = text2;
            _this.horizontalCenter = _this.verticalCenter = 0;
            return _this;
        }
        return GameTip;
    }(eui.Component));
    ui.GameTip = GameTip;
    __reflect(GameTip.prototype, "ui.GameTip");
})(ui || (ui = {}));
