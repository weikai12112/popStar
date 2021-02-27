module ui {
    export class PauseModal extends eui.Component {
        protected closeBtn: lib.ImageButton;
        protected saveBtn: lib.ImageButton;
        protected homeBtn: lib.ImageButton;
        protected restartBtn: lib.ImageButton;
        protected rankBtn: lib.ImageButton;
        constructor() {
            super();
            this.skinName = Skins.PauseModalSkinExml;
            this.closeBtn.source = Assets.PauseModalCloseBtnPng;
            this.saveBtn.source = Assets.PauseModalSaveBtnPng;
            this.homeBtn.source = Assets.PauseModalHomeBtnPng;
            this.restartBtn.source = Assets.PauseModalRestartBtnPng;
            this.rankBtn.source = Assets.PauseModalRankBtnPng;
        }
        protected createChildren() {
            super.createChildren();
            const { TOUCH_TAP } = egret.TouchEvent;
            this.closeBtn.addEventListener(TOUCH_TAP, this.close, this);
            this.saveBtn.addEventListener(TOUCH_TAP, this.save, this);
            this.homeBtn.addEventListener(TOUCH_TAP, this.goHome, this);
            this.restartBtn.addEventListener(TOUCH_TAP, this.restart, this);
            this.rankBtn.addEventListener(TOUCH_TAP, this.openRank, this);
        }

        protected save() {
            GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_SAVE);
            this.goHome();
        }
        protected goHome() {
            utils.switchScene(new scene.Home());
        }
        protected restart() {
            storage.game.clear();
            utils.switchScene(new scene.Game());
        }
        protected openRank() {
            this.stage.addChild(new Ranking());
            this.close();
        }
        public close() {
            this.parent && this.parent.removeChild(this);
        }
    }
}
