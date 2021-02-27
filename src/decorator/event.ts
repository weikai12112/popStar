module decorator {
    type Target = eui.Component | eui.Group;

    /** 事件 */
    export function event(e: string) {
        return (target: Target, propertyKey: string) => {
            const createChildren: () => void = (<any>target).createChildren;
            Object.defineProperties(target, {
                createChildren: {
                    writable: true,
                    value(this: Target) {
                        this.addEventListener(e, this[propertyKey], this);
                        createChildren.call(this);
                    },
                },
            });
        };
    }
}
