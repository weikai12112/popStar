module storage {
    EGamePropsType; // 垃圾引擎，不写这句，引入顺序就出错

    class PropsStore extends Storage {
        protected key: string = 'props';
        public state = {
            [EGamePropsType.BOMB]: 3,
            [EGamePropsType.HAMMER]: 3,
            [EGamePropsType.RANDOM]: 3,
            [EGamePropsType.PEN]: 3,
            [EGamePropsType.DOUBLESCORE]: 1,
            /** 签到表 */
            signTable: <number[]>[],
            wxAdTable: <number[]>[]
        };
        constructor() {
            super();
            this.pull();
        }

        public getNum(type: EGamePropsType): number {
            return this.state[type];
        }
        /** 获取指定道具 */
        public getProp(num){
            console.log(num);
            this.state[num] += 1;
            storage.props.push();
        }
        /** 签到 */
        public sign(): void {
            this.state.signTable.push(Date.now());
            GlobalEvent.dispatchEvent(GlobalEvent.SIGN_IN);
            this.push();
        }

        /** 激励签到 */
        public signAd(): void {
            this.state.wxAdTable.push(Date.now());
            this.push();
        }

        /** 激励广告是否等待两分钟 */
        public get awaitTimes():boolean {
            const now = Date.now();
            if(this.state.wxAdTable.length===0||now-this.state.wxAdTable[this.state.wxAdTable.length-1]>120000){
                return true
            }
            return false
        }
        /** 激励广告差多久显示 */
        public get lastTimes():number{
            return 120000-Date.now()+this.state.wxAdTable[this.state.wxAdTable.length-1]
        }

        /** 获取今日签到次数 */
        public get todaySignTimes(): number {
            const today = new Date();
            const signTable = this.state.signTable.filter((signTime) => {
                const signDay = new Date(signTime);
                return (
                    today.getFullYear() === signDay.getFullYear() &&
                    today.getMonth() === signDay.getMonth() &&
                    today.getDate() === signDay.getDate()
                );
            });
            if (signTable.length !== this.state.signTable.length) {
                this.state.signTable = signTable;
                this.push();
            }
            return signTable.length;
        } 
    }

    export const props = new PropsStore();
}
