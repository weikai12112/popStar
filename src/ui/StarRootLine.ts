module ui {
    export class StarRootLine extends StarLine {
        constructor(origin: StarBrick) {
            super(origin, null);
        }

        public async run(callback: () => void): Promise<void> {
            this.runChildren(callback);
        }
    }
}
