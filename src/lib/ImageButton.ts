module lib {
    /** 图片按钮 */
    export class ImageButton extends eui.Group {
        private image: eui.Image = new eui.Image();
        private enableSource: string = '';
        public disableSource: string = '';
        public isStopPropagation: boolean = true;
        get enabled(): boolean {
            return this.touchEnabled;
        }
        set enabled(isEnable: boolean) {
            this.touchEnabled = isEnable;
            if (this.disableSource) {
                this.image.source = isEnable ? this.enableSource : this.disableSource;
            } else {
                // prettier-ignore
                const colorFlilter = new egret.ColorMatrixFilter([
                    0.3, 0.3, 0.3, 0, 0,
                    0.3, 0.3, 0.3, 0, 0,
                    0.3, 0.3, 0.3, 0, 0,
                    0, 0, 0, 1, 0,
                ]);
                this.image.filters = isEnable ? undefined : [colorFlilter];
            }
        }
        protected createChildren(): void {
            super.createChildren();
            this.image.source = this.enabled ? this.enableSource : this.disableSource;
            this.addChild(this.image);
            this.image.touchEnabled = false;
            this.image.horizontalCenter = 0;
            this.image.verticalCenter = 0;
            this.width = this.height = undefined;
        }

        get source(): string {
            return this.enabled ? this.enableSource : this.disableSource || this.enableSource;
        }
        set source(value: string) {
            this.enableSource = this.image.source = value;
        }

        /** 设置按钮大小 */
        public setSize(width: number, height: number = width) {
            this.width = this.image.width = width;
            this.height = this.image.height = height;
        }

        @decorator.event(egret.TouchEvent.TOUCH_BEGIN)
        protected touchBegin(e: egret.Event) {
            this.isStopPropagation && e.stopPropagation();
            this.scale(0.9);
        }

        @decorator.event(egret.TouchEvent.TOUCH_END)
        @decorator.event(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
        protected touchEnd(e: egret.Event) {
            this.isStopPropagation && e.stopPropagation();
            this.scale(1);
        }

        @decorator.event(egret.TouchEvent.TOUCH_TAP)
        protected playSound(): void {
            utils.audio.play(Assets.AudioClickWav);
        }

        private scale(cof: number): void {
            this.width = this.width;
            this.height = this.height;
            egret.Tween.removeTweens(this.image);
            const tw = egret.Tween.get(this.image);
            tw.to(<eui.Component>{ scaleX: cof, scaleY: cof }, 80);
        }
    }
}
