module ui {
    export class GameSettleModal extends eui.Component {
        protected scoreUI: eui.Group;
        protected countUI: eui.Group;
        constructor(count: number) {
            super();
            this.skinName = Skins.GameSettleModalSkinExml;
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
            const score: number = StarBrickMartix.getSettleAccounts(count);
            this.setCount(count);
            this.setScore(score);
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 }, 200);
        }
        protected setCount(count: number) {
            for (const n of String(count)) {
                this.countUI.addChild(new eui.Image(`${Assets.NumSet1SheetJson}#${n}`));
            }
        }
        protected setScore(score: number) {
            const x = new eui.Image(`${Assets.NumSet2SheetJson}#x`);
            this.scoreUI.addChild(x);
            x.anchorOffsetX = x.anchorOffsetY = 16;
            x.rotation = 45;
            for (const n of String(score)) {
                this.scoreUI.addChild(new eui.Image(`${Assets.NumSet2SheetJson}#${n}`));
            }
        }
    }
}
