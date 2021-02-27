module scene {
    export class Home extends eui.Component {
        /** 开始按钮 */
        protected startBtn: lib.ImageButton;
        /** 排行榜按钮 */
        protected rankBtn: lib.ImageButton;
        /** 声音按钮 */
        protected soundBtn: lib.ImageButton;
        /** 分享按钮 */
        protected shareBtn: lib.ImageButton;
        /** 看视频广告按钮 */
        protected watchVideoBtn: lib.ImageButton;
        protected getPropLight: eui.Image;
        /** 看视频广告按钮显示延迟 */
        protected timeOut;
        constructor() {
            super();
            this.skinName = Skins.HomeSkinExml;
            this.startBtn.source = Assets.HomeStartBtnPng;
            this.rankBtn.source = Assets.HomeRankBtnPng;
            this.soundBtn.source = this.soundSource;
            this.shareBtn.source = Assets.HomeShareBtnPng;
            this.watchVideoBtn.source = Assets.getPropsPng;
            const { TOUCH_TAP } = egret.TouchEvent;
            this.startBtn.addEventListener(TOUCH_TAP, this.startGame, this);
            this.rankBtn.addEventListener(TOUCH_TAP, this.openRanking, this);
            this.soundBtn.addEventListener(TOUCH_TAP, this.toggleMute, this);
            this.shareBtn.addEventListener(TOUCH_TAP, this.share, this);
            this.watchVideoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.watchVideo,this)
            this.watchAdBtn();
            
        }
        protected createChildren(): void {
            super.createChildren();
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
        }

        /** 开始游戏 */
        protected startGame() {
            clearTimeout(this.timeOut)
            if (!storage.setting.state.skipGuide) {
                utils.switchScene(new GameGuide());
            } else if (storage.game.state) {
                const state: storage.GameStoreState = storage.game.state;
                utils.switchScene(new Game(state.level, state.score, state.stars));
            } else {
                utils.switchScene(new Game());
            }
        }
        /** 打开排行榜 */
        protected openRanking() {
            const ranking: ui.Ranking = new ui.Ranking();
            this.addChild(ranking);
        }
        /** 分享 */
        protected share(): void {
            utils.shareApp();
        }
        /** 切换静音 */
        protected toggleMute(): void {
            utils.audio.mute = !utils.audio.mute;
            this.soundBtn.source = this.soundSource;
        }
        protected get soundSource() {
            return utils.audio.mute ? Assets.HomeSoundBtnMutePng : Assets.HomeSoundBtnPng;
        }
        
        /** 观看广告按钮显示延迟 */
        protected watchAdBtn(){
            if(storage.props.awaitTimes){
                this.watchVideoBtn.visible = true;
            }else{
                this.watchVideoBtn.visible = false;
                setTimeout(() => {
                    this.watchVideoBtn.visible = true;
                }, storage.props.lastTimes);
                console.log(storage.props.lastTimes);
                
            }
            const shake = () => {
                egret.Tween.get(this.watchVideoBtn)
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

        /** 观看广告 */
        protected watchVideo(){
            this.watchVideoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.watchVideo,this)
            ad.showRewardedVideo().then((res)=>{
                this.watchVideoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.watchVideo,this)
                if(res.isEnded){
                    let reward = new ui.GetProp();
                    reward.horizontalCenter = reward.verticalCenter = 0;
                    this.addChild(reward);
                    storage.props.signAd();
                    this.watchVideoBtn.visible = false;
                    this.timeOut = setTimeout(() => {
                        this.watchVideoBtn.visible = true;
                    }, 120000);
                }
            })
        }
    }
}
