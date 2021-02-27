module ui {
    export class GameShareGift extends eui.Component {
        protected countUI: eui.Image;
        protected button: lib.ImageButton;
        constructor() {
            super();
            this.skinName = Skins.GameShareGiftSkinExml;
            this.button.source = Assets.GameShareGiftPng;
            this.button.disableSource = Assets.GameShareGiftXPng;
            this.button.isStopPropagation = false;
            this.syncCount();
            const timeId = setInterval(() => {
                if (this.button.enabled) {
                    this.shake();
                }
            }, 10 * 1000);
            this.addEventListener(
                egret.Event.REMOVED_FROM_STAGE,
                () => clearInterval(timeId),
                null
            );
        }

        @decorator.globalEvent(GlobalEvent.SIGN_IN)
        protected syncCount() {
            this.button.enabled = storage.props.todaySignTimes < 3;
            this.countUI.source = `${Assets.NumSet1SheetJson}#${storage.props.todaySignTimes}`;
        }

        protected shake() {
            const x = 15;
            let y = 6;
            const offsetY = y / 4;
            this.button.verticalCenter;
            egret.Tween.get(this.button)
                .to({ horizontalCenter: -x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: -x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: -x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: x, verticalCenter: -(y -= offsetY) }, 100)
                .to({ horizontalCenter: 0, verticalCenter: 0 }, 100);
        }

        @decorator.event(egret.TouchEvent.TOUCH_TAP)
        protected onClick() {
            if (!this.button.enabled) return;
            const modal: GameShareModal = new GameShareModal();
            this.stage.addChild(modal);
        }
    }
}
