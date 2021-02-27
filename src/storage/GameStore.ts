module storage {
    export interface StartStoreState {
        color: EStarColor;
    }
    export interface GameStoreState {
        score: number;
        level: number;
        stars: (StartStoreState | null)[][];
    }
    class GameStore extends Storage {
        protected key: string = 'popStar.progress';
        public state: GameStoreState | undefined;

        constructor() {
            super();
            this.pull();
        }
    }

    export const game: GameStore = new GameStore();
}
