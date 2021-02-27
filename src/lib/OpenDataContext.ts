module lib {
    export class OpenDataContext extends eui.Component {
        protected createChildren(): void {
            super.createChildren();
            this.enabled = false;
            const sharedCanvas = window['sharedCanvas'];
            if (!sharedCanvas) return;
            sharedCanvas.width = this.stage.stageWidth;
            sharedCanvas.height = this.stage.stageHeight;
            const openDataContext: egret.Bitmap = platform.openDataContext.createDisplayObject(
                null,
                this.stage.stageWidth,
                this.stage.stageHeight
            );
            this.addChild(openDataContext);
        }
    }
}
