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
    var StarBrick = (function (_super) {
        __extends(StarBrick, _super);
        function StarBrick(color) {
            var _this = _super.call(this) || this;
            _this.isShaking = false;
            _this.color = color;
            _this.width = _this.height = 0;
            return _this;
        }
        StarBrick.getBigCamelCaseColor = function (color) {
            var colorStr = EStarColor[color];
            return colorStr[0].toUpperCase() + colorStr.slice(1).toLowerCase();
        };
        StarBrick.getStarSourceFromColor = function (color) {
            return "Star" + StarBrick.getBigCamelCaseColor(color) + ".png";
        };
        // 宏坐标 转 精确坐标
        StarBrick.transX = function (n) {
            return this.size / 2 + (this.size + this.margin) * n;
        };
        StarBrick.transY = function (n) {
            return ui.StarBrickMartix.size - this.transX(n);
        };
        StarBrick.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var image = new eui.Image(StarBrick.getStarSourceFromColor(this.color));
            image.horizontalCenter = image.verticalCenter = 0;
            this.image = image;
            this.addChild(image);
        };
        /** 移除 */
        StarBrick.prototype.remove = function () {
            var _this = this;
            if (!this.parent)
                return;
            return new Promise(function (rs) {
                egret.Tween.get(_this)
                    .to({ alpha: 0, scaleX: 1.3, scaleY: 1.3 }, 250)
                    .call(function () {
                    _this.parent.removeChild(_this);
                    rs();
                });
            });
        };
        StarBrick.prototype.setPosition = function (X, Y) {
            this.x = StarBrick.transX((this.X = X));
            this.y = StarBrick.transY((this.Y = Y));
        };
        StarBrick.prototype.getStorageData = function () {
            return {
                color: this.color,
            };
        };
        /** 星辰之力·闪烁 */
        StarBrick.prototype.flash = function () {
            var _this = this;
            return new Promise(function (rs) {
                egret.Tween.get(_this).to({ alpha: 0.3 }, 200).to({ alpha: 1 }, 200).call(rs);
            });
        };
        /** 星辰之力·爆裂 */
        StarBrick.prototype.boom = function () {
            var mc = utils.playGif("StarBoom" + StarBrick.getBigCamelCaseColor(this.color) + ".png");
            mc.anchorOffsetX = 520;
            mc.anchorOffsetY = 930;
            var point = this.localToGlobal(0, 0);
            mc.x = point.x;
            mc.y = point.y;
            this.remove();
            return new Promise(function (rs) {
                mc.addEventListener(egret.MotionEvent.COMPLETE, rs, null);
            });
        };
        /** 星辰之力·摇摆 */
        StarBrick.prototype.shake = function () {
            var _this = this;
            this.isShaking = true;
            var shake = function () {
                if (!_this.isShaking)
                    return;
                egret.Tween.get(_this.image)
                    .to({ scaleX: 1.2, scaleY: 0.8 }, 200)
                    .to({ scaleX: 0.9, scaleY: 1.1 }, 200)
                    .to({ scaleX: 1.1, scaleY: 0.9 }, 200)
                    .to({ scaleX: 0.9, scaleY: 1.1 }, 200)
                    .to({ scaleX: 1.1, scaleY: 0.9 }, 200)
                    .to({ scaleX: 1, scaleY: 1 }, 200)
                    .wait(300)
                    .call(shake);
            };
            shake();
        };
        /** 有内鬼，停止摇摆 */
        StarBrick.prototype.stopShake = function () {
            this.isShaking = false;
        };
        /** 移动至其它位置 */
        StarBrick.prototype.moveTo = function (X, Y) {
            var _this = this;
            egret.Tween.removeTweens(this);
            return new Promise(function (rs, rj) {
                var x = StarBrick.transX((_this.X = X));
                var y = StarBrick.transY((_this.Y = Y));
                egret.Tween.get(_this).to({ x: x, y: y }, 120).call(rs);
            });
        };
        StarBrick.prototype.onTap = function (e) {
            GlobalEvent.dispatchEvent(GlobalEvent.STAR_TAP, this);
        };
        StarBrick.prototype.getBoundary = function (boundary) {
            switch (boundary) {
                case 'T':
                    return StarBrick.transY(this.Y) - StarBrick.size / 2;
                case 'L':
                    return StarBrick.transX(this.X) - StarBrick.size / 2;
                case 'R':
                    return StarBrick.transX(this.X) + StarBrick.size / 2;
                case 'B':
                    return StarBrick.transY(this.Y) + StarBrick.size / 2;
            }
        };
        StarBrick.prototype.changeColor = function (color) {
            var _this = this;
            this.color = color;
            egret.Tween.get(this.image)
                .to({ rotation: 180, alpha: 0 }, 300)
                .call(function () {
                _this.image.source = StarBrick.getStarSourceFromColor(color);
            })
                .to({ rotation: 360, alpha: 1 }, 300)
                .call(function () {
                _this.image.rotation = 0;
            });
        };
        StarBrick.prototype.onUseProps = function (e) {
            if (e.data === EGamePropsType.RANDOM) {
                this.changeColor(utils.getRandomInteger(0, StarBrick.colorCount - 1));
            }
        };
        StarBrick.margin = 14;
        StarBrick.size = 84;
        __decorate([
            decorator.globalEvent(GlobalEvent.USE_PROPS),
            decorator.globalEvent(GlobalEvent.STAR_COMBO),
            decorator.event(egret.Event.REMOVED_FROM_STAGE)
        ], StarBrick.prototype, "stopShake", null);
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_TAP)
        ], StarBrick.prototype, "onTap", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.USE_PROPS)
        ], StarBrick.prototype, "onUseProps", null);
        return StarBrick;
    }(eui.Component));
    ui.StarBrick = StarBrick;
    __reflect(StarBrick.prototype, "ui.StarBrick");
})(ui || (ui = {}));
