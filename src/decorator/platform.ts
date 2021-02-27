enum EPlatform {
    WEB,
    WX,
    TT,
    QQ,
}

const currentPlatform: EPlatform =
    typeof tt === 'object'
        ? EPlatform.TT
        : typeof qq === 'object'
        ? EPlatform.QQ
        : typeof wx === 'object'
        ? EPlatform.WX
        : EPlatform.WEB;

module decorator {
    const EMPTY_FN = () => {};
    export function platform(...platforms: EPlatform[]) {
        return function (target: {}, propertyKey: string, descriptor: PropertyDescriptor) {
            if (!platforms.includes(currentPlatform)) {
                descriptor.writable = false;
                descriptor.value = EMPTY_FN;
            }
        };
    }
    export function platformExclude(...platforms: EPlatform[]) {
        return function (target: {}, propertyKey: string, descriptor: PropertyDescriptor) {
            if (platforms.includes(currentPlatform)) {
                descriptor.writable = false;
                descriptor.value = EMPTY_FN;
            }
        };
    }
}
