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
    var GameColorSelect = (function (_super) {
        __extends(GameColorSelect, _super);
        function GameColorSelect(target) {
            var _this = _super.call(this) || this;
            _this.target = target;
            _this.skinName = Skins.GameColorSelectSkinExml;
            _this.x = target.x;
            _this.y = target.y;
            _this.bg.width = ui.StarBrick.colorCount === 4 ? 392 : 490;
            Array(ui.StarBrick.colorCount)
                .fill(0)
                .map(function (_, i) { return i; })
                .filter(function (c) { return c !== target.color; })
                .forEach(function (color) {
                var button = new lib.ImageButton();
                button.source = ui.StarBrick.getStarSourceFromColor(color);
                button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return _this.changColor(color); }, _this);
                _this.colorGroup.addChild(button);
            });
            _this.alpha = 0;
            _this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.exit, _this);
            if (target.X < 2) {
                _this.modalUI.x = ui.StarBrick.size / 2 - ui.StarBrick.transX(target.X);
            }
            else if (target.X > 10 - ui.StarBrick.colorCount + 1) {
                _this.modalUI.x =
                    ui.StarBrick.size / 2 - ui.StarBrick.transX(target.X - (10 - ui.StarBrick.colorCount));
            }
            else {
                _this.modalUI.x = ui.StarBrick.size / 2 - ui.StarBrick.transX(ui.StarBrick.colorCount - 3);
            }
            return _this;
        }
        GameColorSelect.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            egret.Tween.get(this).to({ y: this.y - ui.StarBrick.size * 0.38, alpha: 1 }, 200);
        };
        GameColorSelect.prototype.changColor = function (color) {
            utils.audio.play(Assets.AudioChangeColorMp3);
            this.target.changeColor(color);
            GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.PEN);
            this.remove();
        };
        GameColorSelect.prototype.remove = function () {
            var _this = this;
            if (this.parent) {
                egret.Tween.get(this)
                    .to({ y: this.y - ui.StarBrick.size * 0.38, alpha: 0 }, 200)
                    .call(function () { return _this.parent && _this.parent.removeChild(_this); });
            }
        };
        GameColorSelect.prototype.exit = function () {
            ui.StarBrickMartix.clearTouchMode();
            this.remove();
        };
        __decorate([
            decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE),
            decorator.globalEvent(GlobalEvent.STAR_TAP)
        ], GameColorSelect.prototype, "remove", null);
        return GameColorSelect;
    }(eui.Component));
    ui.GameColorSelect = GameColorSelect;
    __reflect(GameColorSelect.prototype, "ui.GameColorSelect");
})(ui || (ui = {}));
