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
var lib;
(function (lib) {
    /** 图片按钮 */
    var ImageButton = (function (_super) {
        __extends(ImageButton, _super);
        function ImageButton() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.image = new eui.Image();
            _this.enableSource = '';
            _this.disableSource = '';
            _this.isStopPropagation = true;
            return _this;
        }
        Object.defineProperty(ImageButton.prototype, "enabled", {
            get: function () {
                return this.touchEnabled;
            },
            set: function (isEnable) {
                this.touchEnabled = isEnable;
                if (this.disableSource) {
                    this.image.source = isEnable ? this.enableSource : this.disableSource;
                }
                else {
                    // prettier-ignore
                    var colorFlilter = new egret.ColorMatrixFilter([
                        0.3, 0.3, 0.3, 0, 0,
                        0.3, 0.3, 0.3, 0, 0,
                        0.3, 0.3, 0.3, 0, 0,
                        0, 0, 0, 1, 0,
                    ]);
                    this.image.filters = isEnable ? undefined : [colorFlilter];
                }
            },
            enumerable: true,
            configurable: true
        });
        ImageButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.image.source = this.enabled ? this.enableSource : this.disableSource;
            this.addChild(this.image);
            this.image.touchEnabled = false;
            this.image.horizontalCenter = 0;
            this.image.verticalCenter = 0;
            this.width = this.height = undefined;
        };
        Object.defineProperty(ImageButton.prototype, "source", {
            get: function () {
                return this.enabled ? this.enableSource : this.disableSource || this.enableSource;
            },
            set: function (value) {
                this.enableSource = this.image.source = value;
            },
            enumerable: true,
            configurable: true
        });
        /** 设置按钮大小 */
        ImageButton.prototype.setSize = function (width, height) {
            if (height === void 0) { height = width; }
            this.width = this.image.width = width;
            this.height = this.image.height = height;
        };
        ImageButton.prototype.touchBegin = function (e) {
            this.isStopPropagation && e.stopPropagation();
            this.scale(0.9);
        };
        ImageButton.prototype.touchEnd = function (e) {
            this.isStopPropagation && e.stopPropagation();
            this.scale(1);
        };
        ImageButton.prototype.playSound = function () {
            utils.audio.play(Assets.AudioClickWav);
        };
        ImageButton.prototype.scale = function (cof) {
            this.width = this.width;
            this.height = this.height;
            egret.Tween.removeTweens(this.image);
            var tw = egret.Tween.get(this.image);
            tw.to({ scaleX: cof, scaleY: cof }, 80);
        };
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_BEGIN)
        ], ImageButton.prototype, "touchBegin", null);
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_END),
            decorator.event(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
        ], ImageButton.prototype, "touchEnd", null);
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_TAP)
        ], ImageButton.prototype, "playSound", null);
        return ImageButton;
    }(eui.Group));
    lib.ImageButton = ImageButton;
    __reflect(ImageButton.prototype, "lib.ImageButton");
})(lib || (lib = {}));
