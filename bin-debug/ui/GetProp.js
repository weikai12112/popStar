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
    var GetProp = (function (_super) {
        __extends(GetProp, _super);
        function GetProp(propNum) {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.GetPropSkinExml;
            _this.closeDiaLog.source = Assets.closeDialogPng;
            _this.randomProps(propNum);
            _this.closeDiaLog.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.close, _this);
            return _this;
        }
        GetProp.prototype.randomProps = function (propNum) {
            var props = [
                Assets.getBombPng,
                Assets.getHammerPng,
                Assets.getPenPng,
                Assets.getRandomPng
            ];
            var num;
            if (propNum == undefined) {
                num = utils.getRandomInteger(0, 3);
            }
            else {
                num = propNum;
            }
            this.prop.source = props[num];
            this.addChild(this.prop);
            storage.props.getProp(num);
            this.context.text = "\u83B7\u53D6\u9053\u5177 " + EGamePropsName[num] + " X1";
        };
        GetProp.prototype.close = function () {
            this.parent && this.parent.removeChild(this);
        };
        return GetProp;
    }(eui.Component));
    ui.GetProp = GetProp;
    __reflect(GetProp.prototype, "ui.GetProp");
})(ui || (ui = {}));
