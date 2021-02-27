module ui{
    export class DoubleScoreSmallFrame extends eui.Component{
        protected addScoreLabel:eui.Label;
        protected addScoreGroup:eui.Group;
        protected score:any;
        constructor(score:any){
            super()
            this.skinName = Skins.doubleScoreSmallFrameSkinExml;
            this.score = score;
            this.animate();
            
        }
        protected animate(){
            this.addScoreLabel.text = this.score;
            egret.Tween.get(this)
                .to({ scaleX: 1.4, scaleY: 1.4}, 80)
                .to({ scaleX: 1, scaleY: 1 }, 80).wait(500)
                .call(()=>{
                    this.visible = false;
                })
            egret.Tween.get(this.addScoreGroup)
                .to({alpha:1},20).wait(300)
                .to({alpha:0},400);
        }
    }
}