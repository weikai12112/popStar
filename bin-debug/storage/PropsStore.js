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
    EGamePropsType; // 垃圾引擎，不写这句，引入顺序就出错
    var PropsStore = (function (_super) {
        __extends(PropsStore, _super);
        function PropsStore() {
            var _this = _super.call(this) || this;
            _this.key = 'props';
            _this.state = (_a = {},
                _a[EGamePropsType.BOMB] = 3,
                _a[EGamePropsType.HAMMER] = 3,
                _a[EGamePropsType.RANDOM] = 3,
                _a[EGamePropsType.PEN] = 3,
                _a[EGamePropsType.DOUBLESCORE] = 1,
                /** 签到表 */
                _a.signTable = [],
                _a.wxAdTable = [],
                _a);
            _this.pull();
            return _this;
            var _a;
        }
        PropsStore.prototype.getNum = function (type) {
            return this.state[type];
        };
        /** 获取指定道具 */
        PropsStore.prototype.getProp = function (num) {
            console.log(num);
            this.state[num] += 1;
            storage.props.push();
        };
        /** 签到 */
        PropsStore.prototype.sign = function () {
            this.state.signTable.push(Date.now());
            GlobalEvent.dispatchEvent(GlobalEvent.SIGN_IN);
            this.push();
        };
        /** 激励签到 */
        PropsStore.prototype.signAd = function () {
            this.state.wxAdTable.push(Date.now());
            this.push();
        };
        Object.defineProperty(PropsStore.prototype, "awaitTimes", {
            /** 激励广告是否等待两分钟 */
            get: function () {
                var now = Date.now();
                if (this.state.wxAdTable.length === 0 || now - this.state.wxAdTable[this.state.wxAdTable.length - 1] > 120000) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropsStore.prototype, "lastTimes", {
            /** 激励广告差多久显示 */
            get: function () {
                return 120000 - Date.now() + this.state.wxAdTable[this.state.wxAdTable.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropsStore.prototype, "todaySignTimes", {
            /** 获取今日签到次数 */
            get: function () {
                var today = new Date();
                var signTable = this.state.signTable.filter(function (signTime) {
                    var signDay = new Date(signTime);
                    return (today.getFullYear() === signDay.getFullYear() &&
                        today.getMonth() === signDay.getMonth() &&
                        today.getDate() === signDay.getDate());
                });
                if (signTable.length !== this.state.signTable.length) {
                    this.state.signTable = signTable;
                    this.push();
                }
                return signTable.length;
            },
            enumerable: true,
            configurable: true
        });
        return PropsStore;
    }(storage.Storage));
    __reflect(PropsStore.prototype, "PropsStore");
    storage.props = new PropsStore();
})(storage || (storage = {}));
