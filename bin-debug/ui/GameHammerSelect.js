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
    /** 锤子区域选择。 */
    var GameHammerSelect = (function (_super) {
        __extends(GameHammerSelect, _super);
        function GameHammerSelect(target) {
            var _this = _super.call(this) || this;
            _this.target = target;
            _this.x = target.x;
            _this.y = target.y;
            var gif = utils.getGif(Assets.GameGifHammerSelectPng);
            _this.addChild(gif);
            gif.play(-1);
            return _this;
        }
        GameHammerSelect.prototype.getSafePo = function (X) {
            if (X === 0)
                return 1;
            if (X === 9)
                return 8;
            return X;
        };
        GameHammerSelect.prototype.onClick = function () {
            var _this = this;
            if (!this.touchEnabled)
                return;
            this.touchEnabled = false;
            GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_LOCK_TOUCH);
            var hammer = new eui.Image(Assets.GamePropsHammerPng);
            this.addChild(hammer);
            hammer.anchorOffsetX = hammer.width / 2;
            hammer.anchorOffsetY = hammer.height / 2 + 15;
            hammer.x = ui.StarBrick.size / 2;
            hammer.rotation = -30;
            egret.Tween.get(hammer)
                .wait(200)
                .to({ rotation: 15 }, 200)
                .wait(100)
                .to({ rotation: -30 }, 100)
                .call(function () {
                egret.Tween.get(hammer).to({ alpha: 0 }, 200);
                var boom = new eui.Image(Assets.GamePropsHammerBoomPng);
                _this.addChild(boom);
                boom.anchorOffsetX = boom.width / 2 - 5;
                boom.anchorOffsetY = boom.height / 2;
                egret.Tween.get(boom)
                    .to({ alpha: 0 }, 500)
                    .call(function () { return _this.remove(); });
                GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_HAMMER, [
                    _this.target.X,
                    _this.target.Y,
                ]);
            });
        };
        GameHammerSelect.prototype.onStarTap = function () {
            this.remove();
        };
        GameHammerSelect.prototype.remove = function () {
            this.parent && this.parent.removeChild(this);
        };
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_TAP)
        ], GameHammerSelect.prototype, "onClick", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.STAR_TAP)
        ], GameHammerSelect.prototype, "onStarTap", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        ], GameHammerSelect.prototype, "remove", null);
        return GameHammerSelect;
    }(eui.Component));
    ui.GameHammerSelect = GameHammerSelect;
    __reflect(GameHammerSelect.prototype, "ui.GameHammerSelect");
})(ui || (ui = {}));
