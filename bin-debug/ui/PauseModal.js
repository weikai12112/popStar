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
    var PauseModal = (function (_super) {
        __extends(PauseModal, _super);
        function PauseModal() {
            var _this = _super.call(this) || this;
            _this.skinName = Skins.PauseModalSkinExml;
            _this.closeBtn.source = Assets.PauseModalCloseBtnPng;
            _this.saveBtn.source = Assets.PauseModalSaveBtnPng;
            _this.homeBtn.source = Assets.PauseModalHomeBtnPng;
            _this.restartBtn.source = Assets.PauseModalRestartBtnPng;
            _this.rankBtn.source = Assets.PauseModalRankBtnPng;
            return _this;
        }
        PauseModal.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var TOUCH_TAP = egret.TouchEvent.TOUCH_TAP;
            this.closeBtn.addEventListener(TOUCH_TAP, this.close, this);
            this.saveBtn.addEventListener(TOUCH_TAP, this.save, this);
            this.homeBtn.addEventListener(TOUCH_TAP, this.goHome, this);
            this.restartBtn.addEventListener(TOUCH_TAP, this.restart, this);
            this.rankBtn.addEventListener(TOUCH_TAP, this.openRank, this);
        };
        PauseModal.prototype.save = function () {
            GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_SAVE);
            this.goHome();
        };
        PauseModal.prototype.goHome = function () {
            utils.switchScene(new scene.Home());
        };
        PauseModal.prototype.restart = function () {
            storage.game.clear();
            utils.switchScene(new scene.Game());
        };
        PauseModal.prototype.openRank = function () {
            this.stage.addChild(new ui.Ranking());
            this.close();
        };
        PauseModal.prototype.close = function () {
            this.parent && this.parent.removeChild(this);
        };
        return PauseModal;
    }(eui.Component));
    ui.PauseModal = PauseModal;
    __reflect(PauseModal.prototype, "ui.PauseModal");
})(ui || (ui = {}));
