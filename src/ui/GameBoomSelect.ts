module ui {
    /** 爆破区域选择。 */
    export class GameBoomSelect extends eui.Component {
        protected target: StarBrick;
        protected X: number;
        protected Y: number;
        constructor(target: StarBrick) {
            super();
            this.target = target;
            this.X = this.getSafePo(target.X);
            this.Y = this.getSafePo(target.Y);
            this.x = StarBrick.transX(this.X);
            this.y = StarBrick.transY(this.Y);
            const gif = utils.getGif(Assets.GameGifBoomSelectPng);
            this.addChild(gif);
            gif.play(-1);
        }

        protected getSafePo(X: number) {
            if (X === 0) return 1;
            if (X === 9) return 8;
            return X;
        }

        @decorator.event(egret.TouchEvent.TOUCH_TAP)
        protected onClick() {
            if (!this.touchEnabled) return;
            this.touchEnabled = false;
            GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_LOCK_TOUCH);
            const bomb: eui.Image = new eui.Image(Assets.GamePropsBombPng);
            this.addChild(bomb);
            bomb.anchorOffsetX = bomb.width / 2 - 3;
            bomb.anchorOffsetY = bomb.height / 2 + 15;
            egret.Tween.get(bomb)
                .wait(200)
                .to({ y: -80 }, 200)
                .to({ y: 0 }, 200)
                .call(() => {
                    const boom: eui.Image = new eui.Image(Assets.GamePropsBombBoomPng);
                    this.addChild(boom);
                    boom.anchorOffsetX = boom.width / 2 - 5;
                    boom.anchorOffsetY = boom.height / 2;
                    boom.scaleX = boom.scaleY = 2;
                    this.removeChild(bomb);
                    egret.Tween.get(boom)
                        .to({ alpha: 0 }, 500)
                        .call(() => this.remove());
                    GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_BOOM_GRID9, [this.X, this.Y]);
                });
        }

        @decorator.globalEvent(GlobalEvent.STAR_TAP)
        protected onStarTap() {
            this.remove();
        }

        @decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        protected remove() {
            this.parent && this.parent.removeChild(this);
        }
    }
}
