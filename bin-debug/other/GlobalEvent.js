var GlobalEvent;
(function (GlobalEvent) {
    /** 星星被点击 */
    GlobalEvent.STAR_TAP = 'STAR_TAP';
    /** 分数增加 */
    GlobalEvent.SCORE_ADD = 'SCORE_ADD';
    /** 游戏结束 */
    GlobalEvent.GAME_OVER = 'GAME_OVER';
    /** 星星连击 */
    GlobalEvent.STAR_COMBO = 'STAR_COMBO';
    /** 使用道具 */
    GlobalEvent.USE_PROPS = 'USE_PROPS';
    /** 触摸模式 */
    GlobalEvent.TOUCH_MODE_CHANGE = 'TOUCH_MODE';
    /** 双倍分数 */
    GlobalEvent.DOUBLE_SCORE = 'DOUBLE_SCORE';
    /** 签到 */
    GlobalEvent.SIGN_IN = 'SIGN_IN';
    /** 指令：检查游戏结束 */
    GlobalEvent.COMMAND_CHECK_GAME_OVER = 'COMMAND_CHECK_GAME_OVER';
    /** 指令：锁交互 */
    GlobalEvent.COMMAND_LOCK_TOUCH = 'COMMAND_LOCK_TOUCH';
    /** 指令：获得道具 (data: EGamePropsType) */
    GlobalEvent.COMMAND_GET_PROPS = 'COMMAND_GET_PROPS';
    /** 指令：九宫格爆炸 (data: [x: number, y: number]) */
    GlobalEvent.COMMAND_BOOM_GRID9 = 'COMMAND_BOOM_GRID9';
    /** 指令：锤一个格子 (data: [x: number, y: number]) */
    GlobalEvent.COMMAND_HAMMER = 'COMMAND_HAMMER';
    /** 指令：保存游戏 */
    GlobalEvent.COMMAND_SAVE = 'COMMAND_SAVE';
    /** 虚拟节点 */
    GlobalEvent.VIRTUAL_NODE = new egret.DisplayObject();
    /** 分发事件 */
    function dispatchEvent(event, data) {
        GlobalEvent.VIRTUAL_NODE.dispatchEvent(new egret.Event(event, true, true, data));
    }
    GlobalEvent.dispatchEvent = dispatchEvent;
})(GlobalEvent || (GlobalEvent = {}));
