module ui {
    export class StarBrick extends eui.Component {
        public static margin: number = 14;
        public static size: number = 84;
        /** 颜色种类 */
        public static colorCount: number;

        public static getBigCamelCaseColor(color: EStarColor) {
            const colorStr: string = EStarColor[color];
            return colorStr[0].toUpperCase() + colorStr.slice(1).toLowerCase();
        }
        public static getStarSourceFromColor(color: EStarColor) {
            return `Star${StarBrick.getBigCamelCaseColor(color)}.png`;
        }

        // 宏坐标 转 精确坐标
        public static transX(n: number): number {
            return this.size / 2 + (this.size + this.margin) * n;
        }
        public static transY(n: number): number {
            return StarBrickMartix.size - this.transX(n);
        }

        public color: EStarColor;
        /** 在矩阵中的 x 坐标 */
        public X: number;
        /** 在矩阵中的 y 坐标 */
        public Y: number;

        protected image: eui.Image;
        protected isShaking: boolean = false;

        constructor(color: EStarColor) {
            super();
            this.color = color;
            this.width = this.height = 0;
        }
        protected createChildren() {
            super.createChildren();
            const image: eui.Image = new eui.Image(StarBrick.getStarSourceFromColor(this.color));
            image.horizontalCenter = image.verticalCenter = 0;
            this.image = image;
            this.addChild(image);
        }

        /** 移除 */
        public remove() {
            if (!this.parent) return;
            return new Promise<void>((rs) => {
                egret.Tween.get(this)
                    .to({ alpha: 0, scaleX: 1.3, scaleY: 1.3 }, 250)
                    .call(() => {
                        this.parent.removeChild(this);
                        rs();
                    });
            });
        }

        public setPosition(X: number, Y: number): void {
            this.x = StarBrick.transX((this.X = X));
            this.y = StarBrick.transY((this.Y = Y));
        }

        public getStorageData(): storage.StartStoreState {
            return {
                color: this.color,
            };
        }

        /** 星辰之力·闪烁 */
        public flash(): Promise<void> {
            return new Promise<void>((rs) => {
                egret.Tween.get(this).to({ alpha: 0.3 }, 200).to({ alpha: 1 }, 200).call(rs);
            });
        }
        /** 星辰之力·爆裂 */
        public boom(): Promise<void> {
            const mc = utils.playGif(`StarBoom${StarBrick.getBigCamelCaseColor(this.color)}.png`);
            mc.anchorOffsetX = 520;
            mc.anchorOffsetY = 930;
            const point: egret.Point = this.localToGlobal(0, 0);
            mc.x = point.x;
            mc.y = point.y;
            this.remove();
            return new Promise((rs) => {
                mc.addEventListener(egret.MotionEvent.COMPLETE, rs, null);
            });
        }
        /** 星辰之力·摇摆 */
        public shake(): void {
            this.isShaking = true;
            const shake = () => {
                if (!this.isShaking) return;
                egret.Tween.get(this.image)
                    .to({ scaleX: 1.2, scaleY: 0.8 }, 200)
                    .to({ scaleX: 0.9, scaleY: 1.1 }, 200)
                    .to({ scaleX: 1.1, scaleY: 0.9 }, 200)
                    .to({ scaleX: 0.9, scaleY: 1.1 }, 200)
                    .to({ scaleX: 1.1, scaleY: 0.9 }, 200)
                    .to({ scaleX: 1, scaleY: 1 }, 200)
                    .wait(300)
                    .call(shake);
            };
            shake();
        }

        /** 有内鬼，停止摇摆 */
        @decorator.globalEvent(GlobalEvent.USE_PROPS)
        @decorator.globalEvent(GlobalEvent.STAR_COMBO)
        @decorator.event(egret.Event.REMOVED_FROM_STAGE)
        public stopShake() {
            this.isShaking = false;
        }

        /** 移动至其它位置 */
        public moveTo(X: number, Y: number): Promise<void> {
            egret.Tween.removeTweens(this);
            return new Promise((rs, rj) => {
                const x = StarBrick.transX((this.X = X));
                const y = StarBrick.transY((this.Y = Y));
                egret.Tween.get(this).to({ x, y }, 120).call(rs);
            });
        }

        @decorator.event(egret.TouchEvent.TOUCH_TAP)
        protected onTap(e: egret.TouchEvent) {
            GlobalEvent.dispatchEvent(GlobalEvent.STAR_TAP, this);
        }

        public getBoundary(boundary: Direction) {
            switch (boundary) {
                case 'T':
                    return StarBrick.transY(this.Y) - StarBrick.size / 2;
                case 'L':
                    return StarBrick.transX(this.X) - StarBrick.size / 2;
                case 'R':
                    return StarBrick.transX(this.X) + StarBrick.size / 2;
                case 'B':
                    return StarBrick.transY(this.Y) + StarBrick.size / 2;
            }
        }

        public changeColor(color: EStarColor) {
            this.color = color;
            egret.Tween.get(this.image)
                .to({ rotation: 180, alpha: 0 }, 300)
                .call(() => {
                    this.image.source = StarBrick.getStarSourceFromColor(color);
                })
                .to({ rotation: 360, alpha: 1 }, 300)
                .call(() => {
                    this.image.rotation = 0;
                });
        }

        @decorator.globalEvent(GlobalEvent.USE_PROPS)
        protected onUseProps(e: egret.Event) {
            if (e.data === EGamePropsType.RANDOM) {
                this.changeColor(utils.getRandomInteger(0, StarBrick.colorCount - 1));
            }
        }
    }
}
