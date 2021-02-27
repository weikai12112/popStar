module ui {
    /** 锤子区域选择。 */
    export class GameHammerSelect extends eui.Component {
        protected target: StarBrick;
        constructor(target: StarBrick) {
            super();
            this.target = target;
            this.x = target.x;
            this.y = target.y;
            const gif = utils.getGif(Assets.GameGifHammerSelectPng);
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
            const hammer: eui.Image = new eui.Image(Assets.GamePropsHammerPng);
            this.addChild(hammer);
            hammer.anchorOffsetX = hammer.width / 2;
            hammer.anchorOffsetY = hammer.height / 2 + 15;
            hammer.x = StarBrick.size / 2;
            hammer.rotation = -30;
            egret.Tween.get(hammer)
                .wait(200)
                .to({ rotation: 15 }, 200)
                .wait(100)
                .to({ rotation: -30 }, 100)
                .call(() => {
                    egret.Tween.get(hammer).to({ alpha: 0 }, 200);
                    const boom: eui.Image = new eui.Image(Assets.GamePropsHammerBoomPng);
                    this.addChild(boom);
                    boom.anchorOffsetX = boom.width / 2 - 5;
                    boom.anchorOffsetY = boom.height / 2;
                    egret.Tween.get(boom)
                        .to({ alpha: 0 }, 500)
                        .call(() => this.remove());
                    GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_HAMMER, [
                        this.target.X,
                        this.target.Y,
                    ]);
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
