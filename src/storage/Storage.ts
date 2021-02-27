module storage {
    export abstract class Storage {
        protected abstract key: string;
        public abstract state: {};

        public pull() {
            const data: string =
                typeof wx === 'object'
                    ? wx.getStorageSync(this.key)
                    : localStorage.getItem(this.key);
            if (!data) return;
            try {
                const state = JSON.parse(data);
                if (typeof this.state === 'object') {
                    Object.assign(this.state, state);
                } else {
                    this.state = state;
                }
            } catch (e) {
                console.log('储存读取失败', e);
            }
        }
        public push() {
            const data: string = JSON.stringify(this.state);
            if (typeof wx === 'object') {
                wx.setStorage({ key: this.key, data: data });
            } else {
                localStorage.setItem(this.key, data);
            }
        }
        public clear() {
            this.state = undefined;
            if (typeof wx === 'object') {
                wx.removeStorage({ key: this.key });
            } else {
                localStorage.removeItem(this.key);
            }
        }
    }
}
