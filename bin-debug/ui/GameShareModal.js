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
    var GameShareModal = (function (_super) {
        __extends(GameShareModal, _super);
        function GameShareModal() {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.GameShareModalSkinExml;
            _this.closeBtn.source = Assets.PauseModalCloseBtnPng;
            _this.shareBtn.source = Assets.GameShareModalBtnPng;
            return _this;
        }
        GameShareModal.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var TOUCH_TAP = egret.TouchEvent.TOUCH_TAP;
            this.closeBtn.addEventListener(TOUCH_TAP, this.close, this);
            this.shareBtn.addEventListener(TOUCH_TAP, this.share, this);
        };
        GameShareModal.prototype.share = function () {
            utils.shareApp();
            storage.props.sign();
            this.close();
            setTimeout(function () {
                GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_GET_PROPS, utils.getRandomInteger(EGamePropsType.BOMB, EGamePropsType.RANDOM));
            }, 800);
        };
        GameShareModal.prototype.close = function () {
            this.parent && this.parent.removeChild(this);
        };
        return GameShareModal;
    }(eui.Component));
    ui.GameShareModal = GameShareModal;
    __reflect(GameShareModal.prototype, "ui.GameShareModal");
})(ui || (ui = {}));
