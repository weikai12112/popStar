var decorator;
(function (decorator) {
    function fullScreen(C) {
        var createChildren = C.prototype.createChildren;
        Object.defineProperty(C.prototype, 'createChildren', {
            writable: true,
            value: function () {
                this.width = this.stage.stageWidth;
                this.height = this.stage.stageHeight;
                createChildren && createChildren.call(this);
            },
        });
    }
    decorator.fullScreen = fullScreen;
})(decorator || (decorator = {}));
