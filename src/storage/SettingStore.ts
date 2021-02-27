module storage {
    class SettingStore extends Storage {
        protected key: string = 'setting';
        public state = {
            skipGuide: false,
        };
        constructor() {
            super();
            this.pull();
        }
    }

    export const setting = new SettingStore();
}
