module ui {
    export class GameShareModal extends eui.Component {
        protected closeBtn: lib.ImageButton;
        protected shareBtn: lib.ImageButton;
        constructor() {
            super();
            this.skinName = Skins.GameShareModalSkinExml;
            this.closeBtn.source = Assets.PauseModalCloseBtnPng;
            this.shareBtn.source = Assets.GameShareModalBtnPng;
        }
        protected createChildren() {
            super.createChildren();
            const { TOUCH_TAP } = egret.TouchEvent;
            this.closeBtn.addEventListener(TOUCH_TAP, this.close, this);
            this.shareBtn.addEventListener(TOUCH_TAP, this.share, this);
        }

        protected share() {
            utils.shareApp();
            storage.props.sign();
            this.close();
            setTimeout(() => {
                GlobalEvent.dispatchEvent(
                    GlobalEvent.COMMAND_GET_PROPS,
                    utils.getRandomInteger(EGamePropsType.BOMB, EGamePropsType.RANDOM)
                );
            }, 800);
        }

        public close() {
            this.parent && this.parent.removeChild(this);
        }
    }
}
