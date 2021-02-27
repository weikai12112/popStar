module ui {
    export class GameOver extends eui.Component {
        protected homeBtn: lib.ImageButton;
        protected restartBtn: lib.ImageButton;
        protected shareBtn: lib.ImageButton;
        protected score: number = 0;
        constructor(score: number) {
            super();
            this.skinName = Skins.GameOverSkinExml;
            egret.Tween.get(this, {
                onChange: () => {
                    this.score = ~~this.score;
                },
            }).to({ score }, 350);
            this.postScore(score);
            utils.audio.play(Assets.AudioGameOverWav);
        }
        protected postScore(score: number) {
            if (typeof wx === 'undefined') return;
            const dCtx: WechatMinigame.OpenDataContext = wx.getOpenDataContext();
            dCtx.postMessage({
                command: 'gameover:render',
                value: score,
            });
        }
        protected createChildren(): void {
            super.createChildren();
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
            this.addChild(new lib.OpenDataContext());
            const { TOUCH_TAP } = egret.TouchEvent;
            this.homeBtn.addEventListener(TOUCH_TAP, this.goHome, this);
            this.restartBtn.addEventListener(TOUCH_TAP, this.restart, this);
            this.shareBtn.addEventListener(TOUCH_TAP, this.share, this);
        }
        protected goHome(): void {
            utils.switchScene(new scene.Home());
        }
        protected restart(): void {
            utils.switchScene(new scene.Game());
        }
        protected share(): void {
            utils.shareApp();
        }
    }
}
