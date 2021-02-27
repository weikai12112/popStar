module decorator {
    type Target = eui.Component | eui.Group;

    /** 事件 */
    export function globalEvent(e: string) {
        return (target: Target, propertyKey: string) => {
            const createChildren: () => void = (<any>target).createChildren;
            Object.defineProperties(target, {
                createChildren: {
                    writable: true,
                    value(this: Target) {
                        GlobalEvent.VIRTUAL_NODE.addEventListener(e, this[propertyKey], this);
                        createChildren.call(this);
                        this.addEventListener(
                            egret.Event.REMOVED_FROM_STAGE,
                            () => {
                                GlobalEvent.VIRTUAL_NODE.removeEventListener(
                                    e,
                                    this[propertyKey],
                                    this
                                );
                            },
                            null
                        );
                    },
                },
            });
        };
    }
}
