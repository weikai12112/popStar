module ui {
    @decorator.fullScreen
    export class Ranking extends eui.Component {
        private lastStageY: number;
        protected closeBtn: lib.ImageButton;

        protected createChildren(): void {
            this.skinName = Skins.RankingSkinExml;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.addChild(new lib.OpenDataContext());
            const dCtx: WechatMinigame.OpenDataContext = wx.getOpenDataContext();
            dCtx.postMessage({
                command: 'ranking:render',
            });
        }

        @decorator.event(egret.TouchEvent.TOUCH_BEGIN)
        protected onScrollStart(e: egret.TouchEvent): void {
            this.lastStageY = e.stageY;
        }

        @decorator.event(egret.TouchEvent.TOUCH_MOVE)
        protected onScroll(e: egret.TouchEvent): void {
            const dCtx: WechatMinigame.OpenDataContext = wx.getOpenDataContext();
            dCtx.postMessage({
                command: 'ranking:scroll',
                value: e.stageY - this.lastStageY,
            });
            this.lastStageY = e.stageY;
        }

        @decorator.event(egret.TouchEvent.ENDED)
        protected onStopScroll(e: egret.TouchEvent): void {
            this.lastStageY = null;
        }

        public close() {
            this.parent && this.parent.removeChild(this);
        }
    }
}
