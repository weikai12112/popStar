var decorator;
(function (decorator) {
    /** 事件 */
    function globalEvent(e) {
        return function (target, propertyKey) {
            var createChildren = target.createChildren;
            Object.defineProperties(target, {
                createChildren: {
                    writable: true,
                    value: function () {
                        var _this = this;
                        GlobalEvent.VIRTUAL_NODE.addEventListener(e, this[propertyKey], this);
                        createChildren.call(this);
                        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                            GlobalEvent.VIRTUAL_NODE.removeEventListener(e, _this[propertyKey], _this);
                        }, null);
                    },
                },
            });
        };
    }
    decorator.globalEvent = globalEvent;
})(decorator || (decorator = {}));
