module decorator {
    export function fullScreen(C: typeof eui.Component) {
        const createChildren: Function = (C.prototype as any).createChildren;
        Object.defineProperty(C.prototype, 'createChildren', {
            writable: true,
            value(this: eui.Component) {
                this.width = this.stage.stageWidth;
                this.height = this.stage.stageHeight;
                createChildren && createChildren.call(this);
            },
        });
    }
}
