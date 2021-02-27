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
    var GameGudieMask = (function (_super) {
        __extends(GameGudieMask, _super);
        function GameGudieMask() {
            var _this = _super.call(this) || this;
            _this.maskUI = new egret.Shape();
            _this.step = 0;
            return _this;
        }
        GameGudieMask.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
            this.offsetY = (this.stage.stageHeight - 2000) / 2;
            this.goStep();
        };
        GameGudieMask.prototype.goStep = function () {
            this.removeChildren();
            switch (this.step) {
                case 0:// 点击星星
                    this.createStarsGuide(5, 0, 2, 1, [708, 460]);
                    this.addChild(new ui.GameTip('点击两个同色星星', '即可消除！'));
                    break;
                case 1:// 使用炸弹道具
                    this.createPropsGuide(0);
                    this.addChild(new ui.GameTip('点击炸弹，点击任意星星', '即可引爆周围！'));
                    break;
                case 2:// 选择炸弹区域
                    this.createStarsGuide(0, 0, 10, 10, [510, 890]);
                    this.createTipLabel('请选择所需炸毁的星星');
                    break;
                case 3:// 使用锤子道具
                    this.createPropsGuide(1);
                    this.addChild(new ui.GameTip('点击锤子，点击任意星星', '即可敲碎此星星！'));
                    break;
                case 4:// 选择敲碎的星星
                    this.createStarsGuide(0, 0, 10, 10, [510, 890]);
                    this.createTipLabel('请选择所需敲碎的星星');
                    break;
                case 5:// 使用重置道具
                    this.createPropsGuide(2);
                    this.addChild(new ui.GameTip('点击重置器，即可重置', '全部星星！'));
                    break;
                case 6:// 使用改色道具
                    this.createPropsGuide(3);
                    this.addChild(new ui.GameTip('点击改色笔，选中任意', '星星变色！'));
                    break;
                case 7:// 选择改色方块
                    this.createStarsGuide(0, 9, 1, 1, [130, 1380]);
                    this.createTipLabel('请选择所需变色的星星');
                    break;
                case 8:// 选择要改变的颜色
                    this.createStarsGuide(0, 8, 3, 1, [335, 1285]);
                    this.createTipLabel('请继续选择所需更换的颜色');
                    break;
                default:
                    this.addChild(this.getMask());
                    this.pass();
                    break;
            }
        };
        GameGudieMask.prototype.onStarCombo = function () {
            switch (this.step) {
                case 0:
                case 7:
                    this.step++;
                    this.goStep();
                    break;
            }
        };
        GameGudieMask.prototype.onTouchModeChange = function (e) {
            var mode = e.data;
            if (mode !== null) {
                this.step++;
                this.goStep();
            }
        };
        GameGudieMask.prototype.onPropsUse = function (e) {
            this.step++;
            this.goStep();
            GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_GET_PROPS, e.data);
        };
        GameGudieMask.prototype.pointerAt = function (x, y) {
            var hand = new eui.Image(Assets.GameGuideHandPng);
            hand.anchorOffsetX = 85;
            hand.anchorOffsetY = 70;
            hand.x = x + hand.anchorOffsetX;
            hand.y = this.offsetY + y + hand.anchorOffsetY;
            hand.pixelHitTest = true;
            hand.rotation = 20;
            this.addChild(hand);
            var click = function () {
                egret.Tween.get(hand)
                    .to({ rotation: 0 }, 300)
                    .to({ rotation: 20 }, 200)
                    .wait(100)
                    .to({ rotation: 0 }, 300)
                    .to({ rotation: 20 }, 200)
                    .wait(500)
                    .call(click);
            };
            click();
            hand.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () { return egret.Tween.removeTweens(hand); }, null);
        };
        GameGudieMask.prototype.createTipLabel = function (text) {
            var label = new eui.Label(text);
            label.x = 35;
            label.y = this.offsetY + 1780;
            label.size = 48;
            label.textColor = 0xffffff;
            this.addChild(label);
        };
        GameGudieMask.prototype.getMask = function () {
            var mask = new egret.Shape(); // 用来作为遮挡背景
            mask.graphics.beginFill(0, 0.6);
            mask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            mask.graphics.endFill();
            return mask;
        };
        GameGudieMask.prototype.getEraseArea = function (x, y, width, height) {
            var rect = new egret.Sprite();
            var graphics = rect.graphics;
            graphics.beginFill(0);
            graphics.drawRoundRect(x, y + this.offsetY, width, height, 50);
            graphics.endFill();
            rect.blendMode = egret.BlendMode.ERASE;
            return rect;
        };
        GameGudieMask.prototype.createReverseMask = function (target) {
            var container = new eui.Component();
            container.addChild(this.getMask());
            container.addChild(target);
            target.blendMode = egret.BlendMode.ERASE;
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(container);
            var blendBitmap = new egret.Bitmap(renderTexture);
            this.addChild(blendBitmap);
            blendBitmap.touchEnabled = true; // 允许点击
            blendBitmap.pixelHitTest = true; // 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。
        };
        GameGudieMask.prototype.createPropsGuide = function (i) {
            var OFFSET = utils.isHighRatioScreen ? 113 : 0;
            this.createReverseMask(this.getEraseArea(35 + 185 * i, 1477 + OFFSET, 130, 130));
            this.pointerAt(125 + 185 * i, 1567 + OFFSET);
        };
        GameGudieMask.prototype.createStarsGuide = function (x, y, width, height, pointer) {
            var OFFSET = utils.isHighRatioScreen ? 90 : 0;
            this.createReverseMask(this.getEraseArea(75 + (ui.StarBrick.size + ui.StarBrick.margin) * x, 440 + (ui.StarBrick.size + ui.StarBrick.margin) * y + OFFSET, (ui.StarBrick.size + ui.StarBrick.margin) * width, (ui.StarBrick.size + ui.StarBrick.margin) * height));
            if (pointer) {
                var pointerX = pointer[0], pointerY = pointer[1];
                this.pointerAt(pointerX, pointerY + OFFSET);
            }
        };
        GameGudieMask.prototype.pass = function () {
            var tip = new ui.GameTip('恭喜通关', '新手教程');
            this.addChild(tip);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skip, this);
        };
        /** 跳过 */
        GameGudieMask.prototype.skip = function () {
            storage.setting.state.skipGuide = true;
            storage.setting.push();
            utils.switchScene(new scene.Game());
        };
        __decorate([
            decorator.globalEvent(GlobalEvent.STAR_TAP)
        ], GameGudieMask.prototype, "onStarCombo", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        ], GameGudieMask.prototype, "onTouchModeChange", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.USE_PROPS)
        ], GameGudieMask.prototype, "onPropsUse", null);
        return GameGudieMask;
    }(eui.Component));
    ui.GameGudieMask = GameGudieMask;
    __reflect(GameGudieMask.prototype, "ui.GameGudieMask");
})(ui || (ui = {}));
