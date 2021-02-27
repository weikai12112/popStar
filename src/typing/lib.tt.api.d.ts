declare namespace TiaoTiaoGame {
    interface GameRecorderManagerOnStopCallbackRes {
        /** 录屏文件的临时路径 */
        videoPath: string;
    }
    type GameRecorderManagerOnStopCallback = (res: GameRecorderManagerOnStopCallbackRes) => void;
    interface GameRecorderManagerOnErrorCallbackRes {
        errMsg: string;
    }
    type GameRecorderManagerOnErrorCallback = (res: GameRecorderManagerOnErrorCallbackRes) => void;
    interface GameRecorderManager {
        start(option: any): void;
        stop(): void;
        onStart(callback: () => void): void;
        onStop(callback: GameRecorderManagerOnStopCallback): void;
        onError(callback: GameRecorderManagerOnErrorCallback): void;
    }
    interface TT {
        getGameRecorderManager(): GameRecorderManager;
        shareAppMessage(option: any): void;
        login(option: any): void;
    }
}

declare const tt: TiaoTiaoGame.TT;
