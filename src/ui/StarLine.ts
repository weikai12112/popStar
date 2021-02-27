module ui {
    export class StarLine extends eui.Image {
        public children: StarLine[] = [];
        public dir: Direction;
        public origin: StarBrick;
        protected rate: number = 60;
        constructor(origin: StarBrick, dir: Direction) {
            super(
                `Connect${
                    EStarColor[origin.color][0] + EStarColor[origin.color].slice(1).toLowerCase()
                }.png`
            );
            this.alpha = 0;
            this.scale9Grid = new egret.Rectangle(80, 0, 844, 84);
            this.origin = origin;
            this.dir = dir;
            switch (dir) {
                case 'T':
                    this.rotation = 90;
                    this.left = origin.getBoundary('L');
                    this.bottom = StarBrickMartix.size - origin.getBoundary('B');
                    break;
                case 'B':
                    this.rotation = -90;
                    this.left = origin.getBoundary('L');
                    this.top = origin.getBoundary('T');
                    break;
                case 'L':
                    this.rotation = 0;
                    this.top = origin.getBoundary('T');
                    this.right = StarBrickMartix.size - origin.getBoundary('R');
                    break;
                case 'R':
                    this.rotation = 180;
                    this.top = origin.getBoundary('T');
                    this.left = origin.getBoundary('L');
                    break;
            }
        }
        public setTial(tial: StarBrick) {
            this.width =
                Math.abs(
                    this.dir === 'T' || this.dir === 'B'
                        ? this.origin.y - tial.y
                        : this.origin.x - tial.x
                ) + StarBrick.size;
        }
        public show(): Promise<void> {
            return new Promise((rs) => {
                egret.Tween.get(this).to({ alpha: 1 }, 200).call(rs);
            });
        }
        public async run(cb: () => void) {
            const run = () => {
                const timeid = setInterval(() => {
                    this.width -= this.rate;
                    if (this.width <= StarBrick.size) {
                        clearInterval(timeid);
                        this.remove();
                        cb();
                    }
                }, 16);
            };
            if (this.children.length > 0) {
                this.show();
                this.runChildren(run);
            } else {
                this.show().then(run);
            }
        }
        protected runChildren(cb: () => void) {
            let count = 0;
            this.children.forEach((chil) =>
                chil.run(() => {
                    if (++count === this.children.length) cb();
                })
            );
        }
        public remove() {
            this.parent && this.parent.removeChild(this);
        }
    }
}
