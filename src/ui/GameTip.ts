module ui {
    export class GameTip extends eui.Component {
        protected text1: string = '';
        protected text2: string = '';
        constructor(text1: string, text2: string) {
            super();
            this.skinName = Skins.GameTipExml;
            this.text1 = text1;
            this.text2 = text2;
            this.horizontalCenter = this.verticalCenter = 0;
        }
    }
}
