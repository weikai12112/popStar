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
    var OpenDataContext = (function (_super) {
        __extends(OpenDataContext, _super);
        function OpenDataContext() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OpenDataContext.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.enabled = false;
            var sharedCanvas = window['sharedCanvas'];
            if (!sharedCanvas)
                return;
            sharedCanvas.width = this.stage.stageWidth;
            sharedCanvas.height = this.stage.stageHeight;
            var openDataContext = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(openDataContext);
        };
        return OpenDataContext;
    }(eui.Component));
    lib.OpenDataContext = OpenDataContext;
    __reflect(OpenDataContext.prototype, "lib.OpenDataContext");
})(lib || (lib = {}));
