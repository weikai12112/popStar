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
    var GameSettleModal = (function (_super) {
        __extends(GameSettleModal, _super);
        function GameSettleModal(count) {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.GameSettleModalSkinExml;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            var score = ui.StarBrickMartix.getSettleAccounts(count);
            _this.setCount(count);
            _this.setScore(score);
            _this.alpha = 0;
            egret.Tween.get(_this).to({ alpha: 1 }, 200);
            return _this;
        }
        GameSettleModal.prototype.setCount = function (count) {
            for (var _i = 0, _a = String(count); _i < _a.length; _i++) {
                var n = _a[_i];
                this.countUI.addChild(new eui.Image(Assets.NumSet1SheetJson + "#" + n));
            }
        };
        GameSettleModal.prototype.setScore = function (score) {
            var x = new eui.Image(Assets.NumSet2SheetJson + "#x");
            this.scoreUI.addChild(x);
            x.anchorOffsetX = x.anchorOffsetY = 16;
            x.rotation = 45;
            for (var _i = 0, _a = String(score); _i < _a.length; _i++) {
                var n = _a[_i];
                this.scoreUI.addChild(new eui.Image(Assets.NumSet2SheetJson + "#" + n));
            }
        };
        return GameSettleModal;
    }(eui.Component));
    ui.GameSettleModal = GameSettleModal;
    __reflect(GameSettleModal.prototype, "ui.GameSettleModal");
})(ui || (ui = {}));
