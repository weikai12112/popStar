var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var storage;
(function (storage) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.prototype.pull = function () {
            var data = typeof wx === 'object'
                ? wx.getStorageSync(this.key)
                : localStorage.getItem(this.key);
            if (!data)
                return;
            try {
                var state = JSON.parse(data);
                if (typeof this.state === 'object') {
                    Object.assign(this.state, state);
                }
                else {
                    this.state = state;
                }
            }
            catch (e) {
                console.log('储存读取失败', e);
            }
        };
        Storage.prototype.push = function () {
            var data = JSON.stringify(this.state);
            if (typeof wx === 'object') {
                wx.setStorage({ key: this.key, data: data });
            }
            else {
                localStorage.setItem(this.key, data);
            }
        };
        Storage.prototype.clear = function () {
            this.state = undefined;
            if (typeof wx === 'object') {
                wx.removeStorage({ key: this.key });
            }
            else {
                localStorage.removeItem(this.key);
            }
        };
        return Storage;
    }());
    storage.Storage = Storage;
    __reflect(Storage.prototype, "storage.Storage");
})(storage || (storage = {}));
