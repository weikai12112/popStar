module ui {
    export class GameColorSelect extends eui.Component {
        protected target: StarBrick;
        protected modalUI: eui.Group;
        protected colorGroup: eui.Group;
        protected backBtn: eui.Group;
        protected bg: eui.Image;
        constructor(target: StarBrick) {
            super();
            this.target = target;
            this.skinName = Skins.GameColorSelectSkinExml;
            this.x = target.x;
            this.y = target.y;
            this.bg.width = StarBrick.colorCount === 4 ? 392 : 490;
            Array(StarBrick.colorCount)
                .fill(0)
                .map((_, i) => i)
                .filter((c) => c !== target.color)
                .forEach((color) => {
                    const button = new lib.ImageButton();
                    button.source = StarBrick.getStarSourceFromColor(color);
                    button.addEventListener(
                        egret.TouchEvent.TOUCH_TAP,
                        () => this.changColor(color),
                        this
                    );
                    this.colorGroup.addChild(button);
                });
            this.alpha = 0;
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exit, this);
            if (target.X < 2) {
                this.modalUI.x = StarBrick.size / 2 - StarBrick.transX(target.X);
            } else if (target.X > 10 - StarBrick.colorCount + 1) {
                this.modalUI.x =
                    StarBrick.size / 2 - StarBrick.transX(target.X - (10 - StarBrick.colorCount));
            } else {
                this.modalUI.x = StarBrick.size / 2 - StarBrick.transX(StarBrick.colorCount - 3);
            }
        }
        protected createChildren(): void {
            super.createChildren();
            egret.Tween.get(this).to({ y: this.y - StarBrick.size * 0.38, alpha: 1 }, 200);
        }

        protected changColor(color: EStarColor) {
            utils.audio.play(Assets.AudioChangeColorMp3);
            this.target.changeColor(color);
            GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.PEN);
            this.remove();
        }

        @decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        @decorator.globalEvent(GlobalEvent.STAR_TAP)
        protected remove() {
            if (this.parent) {
                egret.Tween.get(this)
                    .to({ y: this.y - StarBrick.size * 0.38, alpha: 0 }, 200)
                    .call(() => this.parent && this.parent.removeChild(this));
            }
        }

        protected exit() {
            StarBrickMartix.clearTouchMode();
            this.remove();
        }
    }
}
