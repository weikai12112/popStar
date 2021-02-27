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
var scene;
(function (scene) {
    var GameGuide = (function (_super) {
        __extends(GameGuide, _super);
        function GameGuide() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameGuide.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var stars = JSON.parse("[[{\"color\":2},{\"color\":0},{\"color\":3},{\"color\":0},{\"color\":2},{\"color\":2},{\"color\":0},{\"color\":3},{\"color\":1},{\"color\":4}],[{\"color\":3},{\"color\":1},{\"color\":3},{\"color\":2},{\"color\":4},{\"color\":0},{\"color\":4},{\"color\":1},{\"color\":4},{\"color\":1}],[{\"color\":3},{\"color\":3},{\"color\":1},{\"color\":3},{\"color\":2},{\"color\":4},{\"color\":0},{\"color\":2},{\"color\":1},{\"color\":1}],[{\"color\":3},{\"color\":0},{\"color\":4},{\"color\":1},{\"color\":0},{\"color\":2},{\"color\":2},{\"color\":2},{\"color\":0},{\"color\":3}],[{\"color\":1},{\"color\":0},{\"color\":2},{\"color\":3},{\"color\":2},{\"color\":2},{\"color\":3},{\"color\":2},{\"color\":4},{\"color\":2}],[{\"color\":1},{\"color\":3},{\"color\":1},{\"color\":1},{\"color\":0},{\"color\":2},{\"color\":0},{\"color\":3},{\"color\":0},{\"color\":1}],[{\"color\":4},{\"color\":2},{\"color\":2},{\"color\":4},{\"color\":0},{\"color\":1},{\"color\":2},{\"color\":0},{\"color\":2},{\"color\":1}],[{\"color\":0},{\"color\":1},{\"color\":4},{\"color\":1},{\"color\":1},{\"color\":0},{\"color\":3},{\"color\":2},{\"color\":2},{\"color\":4}],[{\"color\":1},{\"color\":4},{\"color\":1},{\"color\":0},{\"color\":3},{\"color\":4},{\"color\":1},{\"color\":1},{\"color\":0},{\"color\":4}],[{\"color\":4},{\"color\":2},{\"color\":3},{\"color\":2},{\"color\":0},{\"color\":1},{\"color\":1},{\"color\":1},{\"color\":4},{\"color\":4}]]");
            this.addChild(new scene.Game(1, 0, stars));
            var mask = new ui.GameGudieMask();
            this.addChild(mask);
            var button = new lib.ImageButton();
            button.source = Assets.GameGuideSkipPng;
            button.right = 40;
            button.bottom = 70;
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, mask.skip, mask);
            this.addChild(button);
            this.hideBanner();
        };
        GameGuide.prototype.hideBanner = function () {
            ad.hideHomeBanner();
        };
        GameGuide.prototype.showBanner = function () {
            ad.showHomeBanner();
        };
        __decorate([
            decorator.platformExclude(EPlatform.WEB)
        ], GameGuide.prototype, "hideBanner", null);
        __decorate([
            decorator.event(egret.Event.REMOVED_FROM_STAGE),
            decorator.platformExclude(EPlatform.WEB)
        ], GameGuide.prototype, "showBanner", null);
        return GameGuide;
    }(eui.Component));
    scene.GameGuide = GameGuide;
    __reflect(GameGuide.prototype, "scene.GameGuide");
})(scene || (scene = {}));
