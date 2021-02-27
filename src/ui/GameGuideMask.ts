module ui {
    export class GameGudieMask extends eui.Component {
        protected maskUI: egret.Shape = new egret.Shape();
        protected step: number = 0;
        protected offsetY: number;
        constructor() {
            super();
        }
        protected createChildren(): void {
            super.createChildren();
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
            this.offsetY = (this.stage.stageHeight - 2000) / 2;
            this.goStep();
        }

        protected goStep() {
            this.removeChildren();
            switch (this.step) {
                case 0: // 点击星星
                    this.createStarsGuide(5, 0, 2, 1, [708, 460]);
                    this.addChild(new GameTip('点击两个同色星星', '即可消除！'));
                    break;

                case 1: // 使用炸弹道具
                    this.createPropsGuide(0);
                    this.addChild(new GameTip('点击炸弹，点击任意星星', '即可引爆周围！'));
                    break;

                case 2: // 选择炸弹区域
                    this.createStarsGuide(0, 0, 10, 10, [510, 890]);
                    this.createTipLabel('请选择所需炸毁的星星');
                    break;

                case 3: // 使用锤子道具
                    this.createPropsGuide(1);
                    this.addChild(new GameTip('点击锤子，点击任意星星', '即可敲碎此星星！'));
                    break;
                case 4: // 选择敲碎的星星
                    this.createStarsGuide(0, 0, 10, 10, [510, 890]);
                    this.createTipLabel('请选择所需敲碎的星星');
                    break;
                case 5: // 使用重置道具
                    this.createPropsGuide(2);
                    this.addChild(new GameTip('点击重置器，即可重置', '全部星星！'));
                    break;
                case 6: // 使用改色道具
                    this.createPropsGuide(3);
                    this.addChild(new GameTip('点击改色笔，选中任意', '星星变色！'));
                    break;
                case 7: // 选择改色方块
                    this.createStarsGuide(0, 9, 1, 1, [130, 1380]);
                    this.createTipLabel('请选择所需变色的星星');
                    break;
                case 8: // 选择要改变的颜色
                    this.createStarsGuide(0, 8, 3, 1, [335, 1285]);
                    this.createTipLabel('请继续选择所需更换的颜色');
                    break;
                default:
                    this.addChild(this.getMask());
                    this.pass();
                    break;
            }
        }

        @decorator.globalEvent(GlobalEvent.STAR_TAP)
        protected onStarCombo() {
            switch (this.step) {
                case 0:
                case 7:
                    this.step++;
                    this.goStep();
                    break;
            }
        }
        @decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        protected onTouchModeChange(e: egret.Event) {
            const mode: EGamePropsType = e.data;
            if (mode !== null) {
                this.step++;
                this.goStep();
            }
        }
        @decorator.globalEvent(GlobalEvent.USE_PROPS)
        protected onPropsUse(e: egret.Event) {
            this.step++;
            this.goStep();
            GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_GET_PROPS, e.data);
        }

        protected pointerAt(x: number, y: number) {
            const hand: eui.Image = new eui.Image(Assets.GameGuideHandPng);
            hand.anchorOffsetX = 85;
            hand.anchorOffsetY = 70;
            hand.x = x + hand.anchorOffsetX;
            hand.y = this.offsetY + y + hand.anchorOffsetY;
            hand.pixelHitTest = true;
            hand.rotation = 20;
            this.addChild(hand);
            const click = () => {
                egret.Tween.get(hand)
                    .to({ rotation: 0 }, 300)
                    .to({ rotation: 20 }, 200)
                    .wait(100)
                    .to({ rotation: 0 }, 300)
                    .to({ rotation: 20 }, 200)
                    .wait(500)
                    .call(click);
            };
            click();
            hand.addEventListener(
                egret.Event.REMOVED_FROM_STAGE,
                () => egret.Tween.removeTweens(hand),
                null
            );
        }

        protected createTipLabel(text: string) {
            const label: eui.Label = new eui.Label(text);
            label.x = 35;
            label.y = this.offsetY + 1780;
            label.size = 48;
            label.textColor = 0xffffff;
            this.addChild(label);
        }
        protected getMask() {
            const mask = new egret.Shape(); // 用来作为遮挡背景
            mask.graphics.beginFill(0, 0.6);
            mask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            mask.graphics.endFill();
            return mask;
        }

        protected getEraseArea(x: number, y: number, width: number, height: number) {
            const rect = new egret.Sprite();
            const { graphics } = rect;
            graphics.beginFill(0);
            graphics.drawRoundRect(x, y + this.offsetY, width, height, 50);
            graphics.endFill();
            rect.blendMode = egret.BlendMode.ERASE;
            return rect;
        }

        protected createReverseMask(target: egret.DisplayObject) {
            const container = new eui.Component();

            container.addChild(this.getMask());
            container.addChild(target);
            target.blendMode = egret.BlendMode.ERASE;

            const renderTexture: egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(container);
            const blendBitmap = new egret.Bitmap(renderTexture);
            this.addChild(blendBitmap);

            blendBitmap.touchEnabled = true; // 允许点击
            blendBitmap.pixelHitTest = true; // 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。
        }

        private createPropsGuide(i: number) {
            const OFFSET = utils.isHighRatioScreen ? 113 : 0;
            this.createReverseMask(this.getEraseArea(35 + 185 * i, 1477 + OFFSET, 130, 130));
            this.pointerAt(125 + 185 * i, 1567 + OFFSET);
        }

        private createStarsGuide(
            x: number,
            y: number,
            width: number,
            height: number,
            pointer?: [number, number]
        ) {
            const OFFSET = utils.isHighRatioScreen ? 90 : 0;
            this.createReverseMask(
                this.getEraseArea(
                    75 + (StarBrick.size + StarBrick.margin) * x,
                    440 + (StarBrick.size + StarBrick.margin) * y + OFFSET,
                    (StarBrick.size + StarBrick.margin) * width,
                    (StarBrick.size + StarBrick.margin) * height
                )
            );
            if (pointer) {
                const [pointerX, pointerY] = pointer;
                this.pointerAt(pointerX, pointerY + OFFSET);
            }
        }

        public pass() {
            const tip = new GameTip('恭喜通关', '新手教程');
            this.addChild(tip);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skip, this);
        }

        /** 跳过 */
        public skip() {
            storage.setting.state.skipGuide = true;
            storage.setting.push();
            utils.switchScene(new scene.Game());
        }
    }
}
