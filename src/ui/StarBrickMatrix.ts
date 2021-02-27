type Direction = 'T' | 'L' | 'R' | 'B';

module ui {
    export class StarBrickMartix extends eui.Component {
        static settleAccountsDp: number[] = [0];
        static size: number = 970;
        protected multiple = 1;

        @decorator.globalEvent(GlobalEvent.DOUBLE_SCORE)
        public doubleScore(){
            this.multiple = 2
        }

        /** 获取结算分数 */
        static getSettleAccounts(count: number) {
            if (count > 9) return 0;
            const tI = 10 - count;
            for (let i = this.settleAccountsDp.length; i <= tI; i++)
                this.settleAccountsDp[i] = 60 + (9 - i) * 40 + this.settleAccountsDp[i - 1];
            return this.settleAccountsDp[tI];
        }
        static clearTouchMode() {
            GlobalEvent.dispatchEvent(GlobalEvent.TOUCH_MODE_CHANGE, null);
        }

        protected floorLayout: eui.Component = new eui.Component();

        /** 星星矩阵，StarBrick[x][y], x向右，y向上 */
        public starBricks: StarBrick[][];
        private col: number = 10;
        /** 触摸模式：检测是否正在使用道具。 */
        protected touchMode: EGamePropsType | null = null;
        protected tipTimeId;

        protected createChildren() {
            super.createChildren();
            this.width = this.height = StarBrickMartix.size;
            this.addChild(this.floorLayout);
            if (!this.starBricks) this.initMatrix();
            this.createView();
            this.startTip();
        }

        public setStars(stars: storage.StartStoreState[][]) {
            this.starBricks = stars.map((col) =>
                col.map((item) => item && new StarBrick(item.color))
            );
        }

        /** 初始化矩阵 */
        protected initMatrix() {
            this.starBricks = [];
            for (let x = 0; x < this.col; x++) {
                this.starBricks.push([]);
                for (let y = 0; y < this.col; y++) {
                    this.starBricks[x][y] = new StarBrick(
                        utils.getRandomInteger(0, StarBrick.colorCount - 1)
                    );
                }
            }
        }

        protected createView() {
            this.starBricks.forEach((col, x) => {
                col.forEach((item, y) => {
                    const bg = new eui.Image(Assets.GameStarBgPng);
                    bg.x = StarBrick.transX(x);
                    bg.y = StarBrick.transY(y);
                    this.floorLayout.addChild(bg);
                    bg.anchorOffsetX = bg.width / 2;
                    bg.anchorOffsetY = bg.height / 2;
                    if (item) {
                        item.setPosition(x, y);
                        this.addChild(item);
                    }
                });
            });
        }

        @decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        protected onTouchModeChange(e: egret.Event) {
            this.touchMode = e.data;
        }

        /** 星星被点击，逻辑入口 */
        @decorator.globalEvent(GlobalEvent.STAR_TAP)
        protected async onStarTap(evt: egret.Event) {
            if (!this.touchEnabled) return;
            const star: StarBrick = evt.data;
            if (this.touchMode !== null) {
                utils.audio.play(Assets.AudioClickWav);
                switch (this.touchMode) {
                    case EGamePropsType.BOMB:
                        return this.addChild(new GameBoomSelect(star));
                    case EGamePropsType.HAMMER:
                        return this.addChild(new GameHammerSelect(star));
                    case EGamePropsType.PEN:
                        return this.addChild(new GameColorSelect(star));
                    default:
                        return;
                }
            }
            if (!this.isDestructible(star.X, star.Y)) return;
            this.lockTouch();
            utils.audio.play(Assets.AudioStarDisappearMp3);
            await this.blastingFrom(star);
            this.sortOut();
            this.checkGameOver();
        }

        /** 点爆破 */
        protected async blastingFrom(star: StarBrick) {
            const rootLine: StarLine = new StarRootLine(star);
            let score = 0;
            let i = 0;
            const dfs = (star: StarBrick, line: StarLine) => {
                star.remove();
                this.starBricks[star.X][star.Y] = null;
                line.setTial(star);
                score += 5 + 10 * i++;
                for (const dir of ['T', 'R', 'B', 'L'] as Direction[]) {
                    const next: StarBrick = this.getDirFrom(star, dir);
                    if (next) {
                        if (line.dir === dir) {
                            dfs(next, line);
                        } else {
                            const nextLine = new StarLine(star, dir);
                            line.children.push(nextLine);
                            this.addChild(nextLine);
                            dfs(next, nextLine);
                        }
                    }
                }
            };
            dfs(star, rootLine);
            GlobalEvent.dispatchEvent(GlobalEvent.STAR_COMBO, i);
            const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(
                RES.getRes(Assets.shineJson),
                RES.getRes(Assets.shinePng)
            );
            const mc: egret.MovieClip = new egret.MovieClip(
                mcFactory.generateMovieClipData(EStarColor[star.color].toLowerCase())
            );
            [mc.x, mc.y] = [star.x + 3, star.y - 8];
            this.addChild(mc);
            /**双倍加分? */
            score = score*this.multiple
            return new Promise((rs) => {
                rootLine.run(() => {
                    GlobalEvent.dispatchEvent(GlobalEvent.SCORE_ADD, score);
                    mc.addEventListener(egret.Event.COMPLETE, rs, null);
                    mc.play();
                });
            });
        }

        /** 连击达到6次，给你点个赞 */
        @decorator.globalEvent(GlobalEvent.STAR_COMBO)
        protected good(e: egret.Event) {
            if (e.data >= 6) {
                utils.audio.play(Assets.AudioGoodMp3);
                const mc = utils.playGif(Assets.GameGifGoodPng);
                mc.x = this.stage.stageWidth / 2;
                mc.y = this.stage.stageHeight / 2;
            }
        }

        /** 整理 */
        protected sortOut() {
            this.starBricks.forEach((col, x) => {
                let p = 0;
                col.forEach((item, y) => {
                    if (item && item.Y !== p) {
                        col[p] = item;
                        col[y] = null;
                        item.moveTo(x, p);
                    }
                    if (col[p]) p++;
                });
            });
            {
                let p = 0;
                this.starBricks.forEach((col, x) => {
                    if (col[0] && col[0].X !== p) {
                        this.starBricks[p] = col;
                        this.starBricks[x] = Array(this.col).fill(null);
                        col.forEach((item, y) => {
                            item && item.moveTo(p, y);
                        });
                    }
                    if (this.starBricks[p][0]) p++;
                });
            }
        }

        @decorator.globalEvent(GlobalEvent.COMMAND_CHECK_GAME_OVER)
        protected checkGameOver() {
            if (this.isGameOver()) this.settleAccounts();
            else this.nextTurn();
        }

        /** 游戏结算 */
        protected settleAccounts() {
            const booms: Promise<void>[] = [];
            for (let x = 0; x < this.col; x++) {
                for (let y = 0; y < this.col; y++) {
                    const starBrick: StarBrick = this.starBricks[x][y];
                    if (!starBrick) break;
                    const promise: Promise<void> = starBrick
                        .flash()
                        .then(() => starBrick.flash())
                        .then(() => new Promise((rs) => setTimeout(rs, y * 100)))
                        .then(() => starBrick.boom());
                    booms.push(promise);
                }
            }
            const count: number = booms.length;
            const modal: GameSettleModal = new GameSettleModal(count);
            this.addChild(modal);
            const score = StarBrickMartix.getSettleAccounts(count);
            GlobalEvent.dispatchEvent(GlobalEvent.SCORE_ADD, score);
            Promise.all(booms)
                .then(() => {
                    if (count === 0) return new Promise((rs) => setTimeout(rs, 1000));
                })
                .then(() => {
                    this.removeChild(modal);
                    GlobalEvent.dispatchEvent(GlobalEvent.GAME_OVER);
                });
        }

        /** 获取相连集合 */
        protected getSameColorSet(x: number, y: number): Set<StarBrick> {
            const startBrick: StarBrick = this.starBricks[x][y];
            const set: Set<StarBrick> = new Set();
            set.add(startBrick);
            if (startBrick) {
                const cb = (item: StarBrick) => {
                    if (!set.has(item)) {
                        set.add(item);
                        this.forNearFrom(item.X, item.Y, cb);
                    }
                };
                this.forNearFrom(x, y, cb);
            }
            return set;
        }

        protected forNearFrom(x: number, y: number, cb: (item: StarBrick) => void): void {
            const startBrick: StarBrick = this.starBricks[x][y];
            if (!startBrick) return;
            const isLink = (x: number, y: number) =>
                this.starBricks[x][y] && this.starBricks[x][y].color === startBrick.color;
            if (x > 0 && isLink(x - 1, y)) cb(this.starBricks[x - 1][y]);
            if (x < this.col - 1 && isLink(x + 1, y)) cb(this.starBricks[x + 1][y]);
            if (y > 0 && isLink(x, y - 1)) cb(this.starBricks[x][y - 1]);
            if (y < this.col - 1 && isLink(x, y + 1)) cb(this.starBricks[x][y + 1]);
        }

        /** 是否可销毁 */
        protected isDestructible(x: number, y: number) {
            let count = 0;
            this.forNearFrom(x, y, () => count++);
            return count > 0;
        }

        @decorator.globalEvent(GlobalEvent.COMMAND_LOCK_TOUCH)
        protected lockTouch() {
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        protected nextTurn() {
            this.touchEnabled = true;
            this.touchChildren = true;
            this.startTip();
        }

        @decorator.globalEvent(GlobalEvent.STAR_COMBO)
        @decorator.event(egret.Event.REMOVED_FROM_STAGE)
        protected clearTip() {
            clearTimeout(this.tipTimeId);
        }

        @decorator.globalEvent(GlobalEvent.USE_PROPS)
        protected startTip() {
            clearTimeout(this.tipTimeId);
            this.tipTimeId = setTimeout(() => {
                this.showTip();
            }, 5000);
        }

        @decorator.globalEvent(GlobalEvent.COMMAND_BOOM_GRID9)
        protected boomGrid9(e: egret.Event) {
            const [X, Y]: number[] = e.data;
            for (let x = X - 1; x <= X + 1; x++) {
                for (let y = Y - 1; y <= Y + 1; y++) {
                    const starBrick: StarBrick = this.starBricks[x][y];
                    if (!starBrick) continue;
                    this.starBricks[x][y] = null;
                    starBrick.boom();
                }
            }
            utils.audio.play(Assets.AudioBoomMp3);
            setTimeout(() => {
                this.sortOut();
                GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.BOMB);
            }, 500);
        }

        @decorator.globalEvent(GlobalEvent.COMMAND_HAMMER)
        protected onHammer(e: egret.Event) {
            utils.audio.play(Assets.AudioHammerMp3);
            const [X, Y]: number[] = e.data;
            this.starBricks[X][Y].boom();
            this.starBricks[X][Y] = null;
            setTimeout(() => {
                this.sortOut();
                GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.HAMMER);
            }, 500);
        }

        /** 获取某个方向上相邻的同色星星 */
        protected getDirFrom(starA: StarBrick, dir: Direction) {
            let starB: StarBrick;
            switch (dir) {
                case 'L':
                    if (starA.X <= 0) return null;
                    starB = this.starBricks[starA.X - 1][starA.Y];
                    break;
                case 'R':
                    if (starA.X >= this.col - 1) return null;
                    starB = this.starBricks[starA.X + 1][starA.Y];
                    break;
                case 'T':
                    if (starA.Y >= this.col - 1) return null;
                    starB = this.starBricks[starA.X][starA.Y + 1];
                    break;
                case 'B':
                    if (starA.Y <= 0) return null;
                    starB = this.starBricks[starA.X][starA.Y - 1];
                    break;
            }
            if (!starB || starA.color !== starB.color) return null;
            return starB;
        }

        public getStorageData() {
            return this.starBricks.map((col) => col.map((item) => item && item.getStorageData()));
        }

        protected isGameOver(): boolean {
            for (let x = 0; x < this.col; x++) {
                for (let y = 0; y < this.col; y++) {
                    if (!this.starBricks[x][y]) continue;
                    if (
                        x > 0 &&
                        this.starBricks[x - 1][y] &&
                        this.starBricks[x][y].color === this.starBricks[x - 1][y].color
                    )
                        return false;
                    if (
                        y > 0 &&
                        this.starBricks[x][y - 1] &&
                        this.starBricks[x][y].color === this.starBricks[x][y - 1].color
                    )
                        return false;
                }
            }
            return true;
        }

        /** 显示提示 */
        public showTip() {
            type IDpItem = Set<StarBrick>;
            const dpTable: IDpItem[][] = [];
            let maxItem: IDpItem = new Set();
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    dpTable.push([]);
                    if (x === 0 && y === 0) {
                        dpTable[x][y] = new Set();
                    } else if (x === 0) {
                        const star = this.starBricks[x][y];
                        dpTable[x][y] =
                            star && this.getDirFrom(star, 'B') ? dpTable[x][y - 1] : new Set();
                    } else if (y === 0) {
                        const star = this.starBricks[x][y];
                        dpTable[x][y] =
                            star && this.getDirFrom(star, 'L') ? dpTable[x - 1][y] : new Set();
                    } else {
                        const star = this.starBricks[x][y];
                        if (star) {
                            const starL = this.getDirFrom(star, 'L');
                            const starB = this.getDirFrom(star, 'B');
                            if (starL && starB) {
                                if (dpTable[x - 1][y] === dpTable[x][y - 1]) {
                                    dpTable[x][y] = dpTable[x - 1][y];
                                } else {
                                    const set = dpTable[x - 1][y];
                                    dpTable[x][y] = set;
                                    dpTable[x][y - 1].forEach((item) => {
                                        set.add(item);
                                        dpTable[item.X][item.Y] = set;
                                    });
                                }
                            } else if (starL) {
                                dpTable[x][y] = dpTable[x - 1][y];
                            } else if (starB) {
                                dpTable[x][y] = dpTable[x][y - 1];
                            } else {
                                dpTable[x][y] = new Set();
                            }
                        } else {
                            dpTable[x][y] = new Set();
                        }
                    }
                    if (this.starBricks[x][y]) {
                        dpTable[x][y].add(this.starBricks[x][y]);
                    }
                    if (dpTable[x][y].size > maxItem.size) {
                        maxItem = dpTable[x][y];
                    }
                }
            }

            maxItem.forEach((item) => item.shake());
        }
    }
}
