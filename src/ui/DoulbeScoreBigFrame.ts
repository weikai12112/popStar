module ui{
    export class DoubleScoreBigFrame extends eui.Component{
        protected doubleScore:eui.Label;
        public timeOut:number = 900;
        constructor(score:string,x:number,y:number){
            super()
            this.skinName = Skins.addDoubleScoreSkinExml;
            this.doubleScore.text = score;
            setTimeout(() => {
                this.animate(x,y)
            }, 500);
        }
        protected animate(x,y){
            this.doubleScore.horizontalCenter = undefined;
            return egret.Tween.get(this.doubleScore)
                // .to({x:utils.isHighRatioScreen?x:x,y:utils.isHighRatioScreen?y:y},400)
                .to({x:x,y:y},400)
                .call(()=>{
                    this.parent&&this.parent.removeChild(this)
                })
        }
    }
}