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
    var SettingStore = (function (_super) {
        __extends(SettingStore, _super);
        function SettingStore() {
            var _this = _super.call(this) || this;
            _this.key = 'setting';
            _this.state = {
                skipGuide: false,
            };
            _this.pull();
            return _this;
        }
        return SettingStore;
    }(storage.Storage));
    __reflect(SettingStore.prototype, "SettingStore");
    storage.setting = new SettingStore();
})(storage || (storage = {}));
