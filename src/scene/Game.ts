module scene {
    export class Game extends eui.Component {
        static targetScoreDp: number[] = [0];
        static getTargetScore(level: number) {
            for (let i = this.targetScoreDp.length; i <= level; i++)
                this.targetScoreDp[i] = 1000 + (i - 1) * 500 + this.targetScoreDp[i - 1];
            return this.targetScoreDp[level];
        }
        protected superProp: eui.Group;
        protected levelUI: eui.Label;
        protected brickMatrix: ui.StarBrickMartix;
        protected pauseBtn: lib.ImageButton;
        protected score: number = 0;
        protected scoreLabel: eui.Label;
        protected level: number;
        protected targetScore: number;
        protected progressUI: ui.GameProgress;
        protected doubleScoreSmallFrame: eui.Group;
        protected addScoreLabel:eui.Label;
        protected addScoreGroup:eui.Group;
        protected commonFontSize = 1.1;
        protected doubleFontSize = 1.4;
        protected useDoubleProp:boolean = false;
        protected newScore:number = 0;
        constructor(level: number = 1, initScore: number = 0, stars?: storage.StartStoreState[][]) {
            super();
            ui.StarBrick.colorCount = level <= 10 ? 4 : 5;
            this.skinName = utils.isHighRatioScreen
                ? Skins.GameGigScreenSkinExml
                : Skins.GameSkinExml;
            this.pauseBtn.source = Assets.GamePauseBtnPng;
            this.targetScore = Game.getTargetScore(level);
            this.score = initScore;
            this.level = level;
            this.levelUI.text = `关卡 ${level}`;
            this.brickMatrix;
            this.progressUI.setProgress(this.score / this.targetScore);
            if (stars) this.brickMatrix.setStars(stars);
            this.superProp.addChild(new ui.GameProps(EGamePropsType.DOUBLESCORE))
        }

        protected createChildren(): void {
            super.createChildren();
            this.stage;
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
            this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openPauseModal, this);
        }

        protected openPauseModal() {
            const modal = new ui.PauseModal();
            modal.horizontalCenter = 0
            this.addChild(modal);
        }

        @decorator.globalEvent(GlobalEvent.SCORE_ADD)
        protected onScoreAdd(e: egret.Event) {
            if (!e.data) return;
            const score: number = this.score + e.data;
            this.newScore +=e.data;
            egret.Tween.removeTweens(this.scoreLabel);
            egret.Tween.get(this.scoreLabel)
                .to({ scaleX: this.useDoubleProp?this.doubleFontSize:this.commonFontSize, scaleY: this.useDoubleProp?this.doubleFontSize:this.commonFontSize }, 100)
                .to({ scaleX: 1, scaleY: 1 }, 100);
            const fixScore = () => (this.score = ~~this.score);
            if (this.score < this.targetScore)
                this.progressUI.setProgress(score / this.targetScore);
            egret.Tween.get(this, { onChange: fixScore }).to({ score }, 200);
            
            if(this.useDoubleProp){
                this.doubleScoreSmallFrame.x = 200+score.toString().length*47.5/2;
                this.doubleScoreSmallFrame.visible = true;
                this.addScoreLabel.text = e.data;
                egret.Tween.get(this.doubleScoreSmallFrame)
                    .to({ scaleX: this.useDoubleProp?this.doubleFontSize:this.commonFontSize, scaleY: this.useDoubleProp?this.doubleFontSize:this.commonFontSize }, 80)
                    .to({ scaleX: 1, scaleY: 1 }, 80).wait(500)
                    .call(()=>{
                        this.doubleScoreSmallFrame.visible = false;
                    })
                egret.Tween.get(this.addScoreGroup)
                    .to({alpha:1},20).wait(300)
                    .to({alpha:0},400);
                // let frame = new ui.DoubleScoreSmallFrame(e.data)
                // this.addChild(frame)
                // frame.x = 200+score.toString().length*47.5/2;
                // frame.y = this.scoreLabel.y;
            }
        }

        @decorator.globalEvent(GlobalEvent.GAME_OVER)
        protected onGameOver() {
            if (this.score >= this.targetScore) this.nextLevel();
            else this.addChild(new ui.GameOver(this.score));
        }

        protected nextLevel() {
            utils.switchScene(new Game(this.level + 1, this.score));
        }

        @decorator.globalEvent(GlobalEvent.COMMAND_SAVE)
        protected save() {
            storage.game.state = {
                score: this.score,
                level: this.level,
                stars: this.brickMatrix.getStorageData(),
            };
            storage.game.push();
        }

        @decorator.globalEvent(GlobalEvent.DOUBLE_SCORE)
        protected showDoubleScoreBigFrame(){
            this.useDoubleProp = true;
            if(this.newScore!=0){
                let frame = new ui.DoubleScoreBigFrame('+'+this.newScore,this.scoreLabel.x,this.scoreLabel.y)
                frame.verticalCenter = frame.horizontalCenter = 0;
                this.addChild(frame)
                setTimeout(() => {
                    const score: number = this.score + this.newScore;
                        egret.Tween.removeTweens(this.scoreLabel);
                        egret.Tween.get(this.scoreLabel)
                            .to({ scaleX: this.useDoubleProp?this.doubleFontSize:this.commonFontSize, scaleY: this.useDoubleProp?this.doubleFontSize:this.commonFontSize}, 100)
                            .to({ scaleX: 1, scaleY: 1 }, 100);
                        const fixScore = () => (this.score = ~~this.score);
                        if (this.score < this.targetScore)
                            this.progressUI.setProgress(score / this.targetScore);
                        egret.Tween.get(this, { onChange: fixScore }).to({ score }, 200);
                }, frame.timeOut);
            }
            
        }
    }
}
