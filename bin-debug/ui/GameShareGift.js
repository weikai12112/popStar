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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ui;
(function (ui) {
    var GameShareGift = (function (_super) {
        __extends(GameShareGift, _super);
        function GameShareGift() {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.GameShareGiftSkinExml;
            _this.button.source = Assets.GameShareGiftPng;
            _this.button.disableSource = Assets.GameShareGiftXPng;
            _this.button.isStopPropagation = false;
            _this.syncCount();
            var timeId = setInterval(function () {
                if (_this.button.enabled) {
                    _this.shake();
                }
            }, 10 * 1000);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () { return clearInterval(timeId); }, null);
            return _this;
        }
        GameShareGift.prototype.syncCount = function () {
            this.button.enabled = storage.props.todaySignTimes < 3;
            this.countUI.source = Assets.NumSet1SheetJson + "#" + storage.props.todaySignTimes;
        };
        GameShareGift.prototype.shake = function () {
            var x = 15;
            var y = 6;
            var offsetY = y / 4;
            this.button.verticalCenter;
            egret.Tween.get(this.button)
                .to({ horizontalCenter: -x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: -x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: -x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: 0, verticalCenter: 0 }, 100);
        };
        GameShareGift.prototype.onClick = function () {
            if (!this.button.enabled)
                return;
            var modal = new ui.GameShareModal();
            this.stage.addChild(modal);
        };
        __decorate([
            decorator.globalEvent(GlobalEvent.SIGN_IN)
        ], GameShareGift.prototype, "syncCount", null);
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_TAP)
        ], GameShareGift.prototype, "onClick", null);
        return GameShareGift;
    }(eui.Component));
    ui.GameShareGift = GameShareGift;
    __reflect(GameShareGift.prototype, "ui.GameShareGift");
})(ui || (ui = {}));
