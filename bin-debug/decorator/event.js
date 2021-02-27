var decorator;
(function (decorator) {
    /** 事件 */
    function event(e) {
        return function (target, propertyKey) {
            var createChildren = target.createChildren;
            Object.defineProperties(target, {
                createChildren: {
                    writable: true,
                    value: function () {
                        this.addEventListener(e, this[propertyKey], this);
                        createChildren.call(this);
                    },
                },
            });
        };
    }
    decorator.event = event;
})(decorator || (decorator = {}));
