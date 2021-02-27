module ui {
    export class GamePropsBar extends eui.Group {
        protected createChildren(): void {
            super.createChildren();
            const layout = new eui.HorizontalLayout();
            layout.gap = 60;
            this.layout = layout;
            const bombProps: GameProps = new GameProps(EGamePropsType.BOMB);
            const hammerProps: GameProps = new GameProps(EGamePropsType.HAMMER);
            const randomProps: GameProps = new GameProps(EGamePropsType.RANDOM);
            const penProps: GameProps = new GameProps(EGamePropsType.PEN);
            const doubleScoreProp :GameProps = new GameProps(EGamePropsType.DOUBLESCORE);
            this.addChild(bombProps);
            this.addChild(hammerProps);
            this.addChild(randomProps);
            this.addChild(penProps);
            // this.addChild(doubleScoreProp);
        }
        // @decorator.globalEvent(GlobalEvent.STAR_COMBO)
        protected onCombo(e: egret.Event) {
            if (e.data >= 4 && Math.random() < 0.2) {
                const r: number = Math.random();
                const props: EGamePropsType =
                    r < 0.3
                        ? EGamePropsType.RANDOM
                        : r < 0.6
                        ? EGamePropsType.HAMMER
                        : r < 0.9
                        ? EGamePropsType.PEN
                        : EGamePropsType.BOMB;
                GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_GET_PROPS, props);
            }
        }
    }
}
