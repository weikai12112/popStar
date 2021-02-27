module ui {
    export class GameProps extends eui.Component {
        protected button: lib.ImageButton;
        protected numUI: eui.Group;
        protected lightCircle: eui.Image;
        protected type: EGamePropsType;
        protected watchVideoButton: eui.Image;
        constructor(type: EGamePropsType) {
            super();
            this.type = type;
            // if(this.type == EGamePropsType.DOUBLESCORE)this.visible = storage.props.todaySignTimes < 3;
            this.skinName = Skins.GamePropsSkinExml;
            [this.button.source, this.button.disableSource] = this.getIcon();
            this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.watchVideoButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.watchVideo,this)
            this.setNum(storage.props.getNum(this.type));
            this.lightCircle.visible = false;
        }

        protected watchVideo(){
            this.watchVideoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.watchVideo,this)
            ad.showRewardedVideo().then((res)=>{
                this.watchVideoButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.watchVideo,this)
                if(res.isEnded){
                    storage.props.getProp(this.type)
                    this.getPropAnimate(storage.props.getNum(this.type))
                }
            })
        }
        protected getIcon() {
            switch (this.type) {
                case EGamePropsType.BOMB:
                    return [Assets.GamePropsBombPng, Assets.GamePropsBombXPng];
                case EGamePropsType.HAMMER:
                    return [Assets.GamePropsHammerPng, Assets.GamePropsHammerXPng];
                case EGamePropsType.RANDOM:
                    return [Assets.GamePropsRandomPng, Assets.GamePropsRandomXPng];
                case EGamePropsType.PEN:
                    return [Assets.GamePropsPenPng, Assets.GamePropsPenXPng];
                case EGamePropsType.DOUBLESCORE:
                    return [Assets.doubleScorePng, Assets.doubleScorePng];
            }
        }

        protected onClick() {
            //是否双倍积分道具
            if(this.type == EGamePropsType.DOUBLESCORE){
                // GlobalEvent.dispatchEvent(GlobalEvent.DOUBLE_SCORE);
                //观看广告
                this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                ad.showRewardedVideo().then((res)=>{
                    this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    if(res.isEnded){
                        this.visible = false
                        // storage.props.sign()
                        GlobalEvent.dispatchEvent(GlobalEvent.DOUBLE_SCORE);
                    }
                })
            }else{
                if (!this.lightCircle.visible) {
                    if (this.type === EGamePropsType.RANDOM) {
                        GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.RANDOM);
                        utils.audio.play(Assets.AudioRandomMp3);
                    } else {
                        GlobalEvent.dispatchEvent(GlobalEvent.TOUCH_MODE_CHANGE, this.type);
                    }
                } else {
                    GlobalEvent.dispatchEvent(GlobalEvent.TOUCH_MODE_CHANGE, null);
                }
            }
            
        }

        protected active() {
            this.lightCircle.visible = true;
            this.lightCircle.rotation = 0;
            egret.Tween.get(this.lightCircle)
                .to({ rotation: 360 }, 1000)
                .call(() => this.active());
        }

        protected deactive() {
            this.lightCircle.visible = false;
            egret.Tween.removeTweens(this.lightCircle);
        }

        protected setNum(count: number) {
            if (count < 0)count = 0;
            if (this.type!=EGamePropsType.DOUBLESCORE && count == 0){
                this.watchVideoButton.visible = true
                this.numUI.visible = false
            }else{
                this.watchVideoButton.visible = false
                this.numUI.visible = true
            }
            if(this.type == EGamePropsType.DOUBLESCORE)this.numUI.visible =false

            storage.props.state[this.type] = count;
            storage.props.push();

            this.button.enabled = count > 0;
            this.numUI.removeChildren();
            this.numUI.addChild(new eui.Image(`${Assets.NumSet1SheetJson}#x`));
            for (const n of String(count)) {
                this.numUI.addChild(new eui.Image(`${Assets.NumSet1SheetJson}#${n}`));
            }
        }

        @decorator.globalEvent(GlobalEvent.USE_PROPS)
        protected onUseProps(e: egret.Event) {
            if (e.data === this.type) {
                this.setNum(storage.props.getNum(this.type) - 1);
                StarBrickMartix.clearTouchMode();
                setTimeout(() => {
                    GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_CHECK_GAME_OVER);
                }, 50);
            }
        }

        @decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        protected onTouchModeChange(e: egret.Event) {
            if (e.data === this.type) {
                this.active();
            } else {
                this.deactive();
            }
        }

        @decorator.globalEvent(GlobalEvent.COMMAND_GET_PROPS)
        protected onGetProps(e: egret.Event) {
            if (e.data === this.type) {
                this.getPropAnimate(storage.props.getNum(this.type) + 1)
            }
        }

        //添加道具动画
        protected getPropAnimate(num:number){
            const icon: eui.Image = new eui.Image(this.getIcon()[0]);
                icon.alpha = 0.3;
                icon.horizontalCenter = 0;
                icon.verticalCenter = -150;
                this.addChild(icon);
                egret.Tween.get(icon)
                    .to({ verticalCenter: 0, alpha: 1 }, 500)
                    .call(() => {
                        this.removeChild(icon);
                        this.setNum(num);
                    });
        }
    }
}
