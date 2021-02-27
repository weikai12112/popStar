module GlobalEvent {
    /** 星星被点击 */
    export const STAR_TAP: string = 'STAR_TAP';
    /** 分数增加 */
    export const SCORE_ADD: string = 'SCORE_ADD';
    /** 游戏结束 */
    export const GAME_OVER: string = 'GAME_OVER';
    /** 星星连击 */
    export const STAR_COMBO: string = 'STAR_COMBO';

    /** 使用道具 */
    export const USE_PROPS: string = 'USE_PROPS';
    /** 触摸模式 */
    export const TOUCH_MODE_CHANGE: string = 'TOUCH_MODE';

    /** 双倍分数 */
    export const DOUBLE_SCORE: string = 'DOUBLE_SCORE';

    /** 签到 */
    export const SIGN_IN: string = 'SIGN_IN';

    /** 指令：检查游戏结束 */
    export const COMMAND_CHECK_GAME_OVER: string = 'COMMAND_CHECK_GAME_OVER';
    /** 指令：锁交互 */
    export const COMMAND_LOCK_TOUCH: string = 'COMMAND_LOCK_TOUCH';
    /** 指令：获得道具 (data: EGamePropsType) */
    export const COMMAND_GET_PROPS: string = 'COMMAND_GET_PROPS';
    /** 指令：九宫格爆炸 (data: [x: number, y: number]) */
    export const COMMAND_BOOM_GRID9: string = 'COMMAND_BOOM_GRID9';
    /** 指令：锤一个格子 (data: [x: number, y: number]) */
    export const COMMAND_HAMMER: string = 'COMMAND_HAMMER';
    /** 指令：保存游戏 */
    export const COMMAND_SAVE: string = 'COMMAND_SAVE';

    /** 虚拟节点 */
    export const VIRTUAL_NODE: egret.DisplayObject = new egret.DisplayObject();
    /** 分发事件 */
    export function dispatchEvent(event: string, data?: any) {
        VIRTUAL_NODE.dispatchEvent(new egret.Event(event, true, true, data));
    }
}
