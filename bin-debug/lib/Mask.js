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
var lib;
(function (lib) {
    var Mask = (function (_super) {
        __extends(Mask, _super);
        function Mask() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Mask.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var rect = new egret.Shape();
            var graphics = rect.graphics;
            var _a = this.stage, stageWidth = _a.stageWidth, stageHeight = _a.stageHeight;
            graphics.beginFill(0x000000);
            graphics.drawRect(0, 0, stageWidth, stageHeight);
            graphics.endFill();
            rect.alpha = 0.3;
            this.addChild(rect);
            // egret.Tween.get(rect).to({ alpha: 0.3 }, 100);
        };
        return Mask;
    }(eui.Component));
    lib.Mask = Mask;
    __reflect(Mask.prototype, "lib.Mask");
})(lib || (lib = {}));
