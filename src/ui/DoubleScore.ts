module ui{
    export class DoubleScore extends eui.Component{
        constructor(){
            super()
        }
        createChildren(){
            let icon = new lib.ImageButton()
            icon.source = Assets.doubleScorePng
            this.addChild(icon)
        }
    }
}