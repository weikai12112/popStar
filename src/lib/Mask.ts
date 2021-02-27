module lib {
    export class Mask extends eui.Component {
        protected createChildren(): void {
            super.createChildren();
            const rect: egret.Shape = new egret.Shape();
            const { graphics }: egret.Shape = rect;
            const { stageWidth, stageHeight } = this.stage;
            graphics.beginFill(0x000000);
            graphics.drawRect(0, 0, stageWidth, stageHeight);
            graphics.endFill();
            rect.alpha = 0.3;
            this.addChild(rect);
            // egret.Tween.get(rect).to({ alpha: 0.3 }, 100);
        }
    }
}
