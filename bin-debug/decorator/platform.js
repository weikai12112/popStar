var EPlatform;
(function (EPlatform) {
    EPlatform[EPlatform["WEB"] = 0] = "WEB";
    EPlatform[EPlatform["WX"] = 1] = "WX";
    EPlatform[EPlatform["TT"] = 2] = "TT";
    EPlatform[EPlatform["QQ"] = 3] = "QQ";
})(EPlatform || (EPlatform = {}));
var currentPlatform = typeof tt === 'object'
    ? EPlatform.TT
    : typeof qq === 'object'
        ? EPlatform.QQ
        : typeof wx === 'object'
            ? EPlatform.WX
            : EPlatform.WEB;
var decorator;
(function (decorator) {
    var EMPTY_FN = function () { };
    function platform() {
        var platforms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            platforms[_i] = arguments[_i];
        }
        return function (target, propertyKey, descriptor) {
            if (!platforms.includes(currentPlatform)) {
                descriptor.writable = false;
                descriptor.value = EMPTY_FN;
            }
        };
    }
    decorator.platform = platform;
    function platformExclude() {
        var platforms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            platforms[_i] = arguments[_i];
        }
        return function (target, propertyKey, descriptor) {
            if (platforms.includes(currentPlatform)) {
                descriptor.writable = false;
                descriptor.value = EMPTY_FN;
            }
        };
    }
    decorator.platformExclude = platformExclude;
})(decorator || (decorator = {}));
