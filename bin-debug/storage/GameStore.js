var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var storage;
(function (storage) {
    var GameStore = (function (_super) {
        __extends(GameStore, _super);
        function GameStore() {
            var _this = _super.call(this) || this;
            _this.key = 'popStar.progress';
            _this.pull();
            return _this;
        }
        return GameStore;
    }(storage.Storage));
    __reflect(GameStore.prototype, "GameStore");
    storage.game = new GameStore();
})(storage || (storage = {}));
