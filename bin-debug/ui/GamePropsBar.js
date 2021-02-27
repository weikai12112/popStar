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
var ui;
(function (ui) {
    var GamePropsBar = (function (_super) {
        __extends(GamePropsBar, _super);
        function GamePropsBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GamePropsBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var layout = new eui.HorizontalLayout();
            layout.gap = 60;
            this.layout = layout;
            var bombProps = new ui.GameProps(EGamePropsType.BOMB);
            var hammerProps = new ui.GameProps(EGamePropsType.HAMMER);
            var randomProps = new ui.GameProps(EGamePropsType.RANDOM);
            var penProps = new ui.GameProps(EGamePropsType.PEN);
            var doubleScoreProp = new ui.GameProps(EGamePropsType.DOUBLESCORE);
            this.addChild(bombProps);
            this.addChild(hammerProps);
            this.addChild(randomProps);
            this.addChild(penProps);
            // this.addChild(doubleScoreProp);
        };
        // @decorator.globalEvent(GlobalEvent.STAR_COMBO)
        GamePropsBar.prototype.onCombo = function (e) {
            if (e.data >= 4 && Math.random() < 0.2) {
                var r = Math.random();
                var props = r < 0.3
                    ? EGamePropsType.RANDOM
                    : r < 0.6
                        ? EGamePropsType.HAMMER
                        : r < 0.9
                            ? EGamePropsType.PEN
                            : EGamePropsType.BOMB;
                GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_GET_PROPS, props);
            }
        };
        return GamePropsBar;
    }(eui.Group));
    ui.GamePropsBar = GamePropsBar;
    __reflect(GamePropsBar.prototype, "ui.GamePropsBar");
})(ui || (ui = {}));
