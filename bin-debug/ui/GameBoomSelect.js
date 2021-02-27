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
    /** 爆破区域选择。 */
    var GameBoomSelect = (function (_super) {
        __extends(GameBoomSelect, _super);
        function GameBoomSelect(target) {
            var _this = _super.call(this) || this;
            _this.target = target;
            _this.X = _this.getSafePo(target.X);
            _this.Y = _this.getSafePo(target.Y);
            _this.x = ui.StarBrick.transX(_this.X);
            _this.y = ui.StarBrick.transY(_this.Y);
            var gif = utils.getGif(Assets.GameGifBoomSelectPng);
            _this.addChild(gif);
            gif.play(-1);
            return _this;
        }
        GameBoomSelect.prototype.getSafePo = function (X) {
            if (X === 0)
                return 1;
            if (X === 9)
                return 8;
            return X;
        };
        GameBoomSelect.prototype.onClick = function () {
            var _this = this;
            if (!this.touchEnabled)
                return;
            this.touchEnabled = false;
            GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_LOCK_TOUCH);
            var bomb = new eui.Image(Assets.GamePropsBombPng);
            this.addChild(bomb);
            bomb.anchorOffsetX = bomb.width / 2 - 3;
            bomb.anchorOffsetY = bomb.height / 2 + 15;
            egret.Tween.get(bomb)
                .wait(200)
                .to({ y: -80 }, 200)
                .to({ y: 0 }, 200)
                .call(function () {
                var boom = new eui.Image(Assets.GamePropsBombBoomPng);
                _this.addChild(boom);
                boom.anchorOffsetX = boom.width / 2 - 5;
                boom.anchorOffsetY = boom.height / 2;
                boom.scaleX = boom.scaleY = 2;
                _this.removeChild(bomb);
                egret.Tween.get(boom)
                    .to({ alpha: 0 }, 500)
                    .call(function () { return _this.remove(); });
                GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_BOOM_GRID9, [_this.X, _this.Y]);
            });
        };
        GameBoomSelect.prototype.onStarTap = function () {
            this.remove();
        };
        GameBoomSelect.prototype.remove = function () {
            this.parent && this.parent.removeChild(this);
        };
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_TAP)
        ], GameBoomSelect.prototype, "onClick", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.STAR_TAP)
        ], GameBoomSelect.prototype, "onStarTap", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        ], GameBoomSelect.prototype, "remove", null);
        return GameBoomSelect;
    }(eui.Component));
    ui.GameBoomSelect = GameBoomSelect;
    __reflect(GameBoomSelect.prototype, "ui.GameBoomSelect");
})(ui || (ui = {}));
