module ui{
    export class GetProp extends eui.Component{
        protected closeDiaLog:lib.ImageButton;
        protected prop:lib.ImageButton;
        protected context:eui.Label;

        constructor(propNum?:number){
            super()
            this.skinName = Skins.GetPropSkinExml;
            this.closeDiaLog.source = Assets.closeDialogPng;
            this.randomProps(propNum)
            this.closeDiaLog.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this)
        }
        protected randomProps(propNum?:number){
            let props = [
                Assets.getBombPng,
                Assets.getHammerPng,
                Assets.getPenPng,
                Assets.getRandomPng
            ]
            let num:number
            if(propNum == undefined){
                num = utils.getRandomInteger(0,3);
            }else{
                num = propNum
            }
            this.prop.source = props[num]
            this.addChild(this.prop)
            storage.props.getProp(num)

            this.context.text = `获取道具 ${EGamePropsName[num]} X1`
        }
        protected close(){
            this.parent && this.parent.removeChild(this);
        }
    }
}