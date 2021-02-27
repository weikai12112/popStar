module ui {
    export class GameProgress extends eui.Component {
        protected processStatic: eui.Image;
        protected processDynamic: eui.Group;
        protected processWin: eui.Group;
        constructor() {
            super();
            this.skinName = Skins.GameProgressSkinExml;
            this.processStatic.width = 0;
            this.processDynamic.width = 0;
        }
        public setProgress(percent: number) {
            percent = Math.min(1, percent);
            const width: number = this.width * percent;
            this.processStatic.width = width;
            egret.Tween.get(this.processDynamic)
                .to({ width }, 500)
                .call(() => percent === 1 && this.finish());
        }
        protected finish(): void {
            egret.Tween.get(this.processDynamic).to({ alpha: 0 }, 200);
            egret.Tween.get(this.processWin).to({ alpha: 1 }, 200);
            utils.audio.play(Assets.AudioMissionCompletedMp3);
        }
    }
}
