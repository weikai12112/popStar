module scene {
    export class GameGuide extends eui.Component {
        protected createChildren(): void {
            super.createChildren();
            const stars = JSON.parse(
                `[[{"color":2},{"color":0},{"color":3},{"color":0},{"color":2},{"color":2},{"color":0},{"color":3},{"color":1},{"color":4}],[{"color":3},{"color":1},{"color":3},{"color":2},{"color":4},{"color":0},{"color":4},{"color":1},{"color":4},{"color":1}],[{"color":3},{"color":3},{"color":1},{"color":3},{"color":2},{"color":4},{"color":0},{"color":2},{"color":1},{"color":1}],[{"color":3},{"color":0},{"color":4},{"color":1},{"color":0},{"color":2},{"color":2},{"color":2},{"color":0},{"color":3}],[{"color":1},{"color":0},{"color":2},{"color":3},{"color":2},{"color":2},{"color":3},{"color":2},{"color":4},{"color":2}],[{"color":1},{"color":3},{"color":1},{"color":1},{"color":0},{"color":2},{"color":0},{"color":3},{"color":0},{"color":1}],[{"color":4},{"color":2},{"color":2},{"color":4},{"color":0},{"color":1},{"color":2},{"color":0},{"color":2},{"color":1}],[{"color":0},{"color":1},{"color":4},{"color":1},{"color":1},{"color":0},{"color":3},{"color":2},{"color":2},{"color":4}],[{"color":1},{"color":4},{"color":1},{"color":0},{"color":3},{"color":4},{"color":1},{"color":1},{"color":0},{"color":4}],[{"color":4},{"color":2},{"color":3},{"color":2},{"color":0},{"color":1},{"color":1},{"color":1},{"color":4},{"color":4}]]`
            );
            this.addChild(new Game(1, 0, stars));
            const mask = new ui.GameGudieMask();
            this.addChild(mask);
            const button = new lib.ImageButton();
            button.source = Assets.GameGuideSkipPng;
            button.right = 40;
            button.bottom = 70;
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, mask.skip, mask);
            this.addChild(button);
            this.hideBanner();
        }

        @decorator.platformExclude(EPlatform.WEB)
        protected hideBanner() {
            ad.hideHomeBanner();
        }
        @decorator.event(egret.Event.REMOVED_FROM_STAGE)
        @decorator.platformExclude(EPlatform.WEB)
        protected showBanner() {
            ad.showHomeBanner();
        }
    }
}
