namespace utils {
    /** 获取随机数 */
    export function getRandomNumber(MIN: number, MAX: number): number {
        return Math.random() * (MAX - MIN) + MIN;
    }
    /** 获取随机整数 */
    export function getRandomInteger(MIN: number, MAX: number): number {
        return Math.floor(getRandomNumber(MIN, MAX + 1));
    }
    /** 获取随机数 */
    export function getRandomFrom<T>(arr: T[]): T {
        return arr[getRandomInteger(0, arr.length - 1)];
    }

    /** 是否为高占屏手机 */
    export const isHighRatioScreen = (() => {
        const systemInfo = wx.getSystemInfoSync();    
        return systemInfo.windowHeight / systemInfo.windowWidth > 2;
    })();

    /** 切换场景 */
    export function switchScene(scene: egret.DisplayObjectContainer): void {
        const { stage } = egret.MainContext.instance;
        stage.removeChildren();
        stage.addChild(scene);
    }

    /** 获取主场景 */
    export function getStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    export function vw(n: number) {
        return ~~((n / 100) * egret.MainContext.instance.stage.stageWidth);
    }
    export function vh(n: number) {
        return ~~((n / 100) * egret.MainContext.instance.stage.height);
    }

    /** 坐标转换*/
    export function pointTransform(x:number,y:number,obj:egret.DisplayObject) {
        return obj.localToGlobal(x,y)
    }
    class Audio {
        public mute: boolean = false;
        private group = new Map<string, egret.Sound>();
        public play(name: string, times: number = 1): egret.SoundChannel {
            if (this.mute) return;
            if (!this.group.has(name)) {
                this.group.set(name, RES.getRes(name));
            }
            const sound: egret.Sound = this.group.get(name);
            return sound.play(0, times);
        }
    }
    export const audio: Audio = new Audio();

    export function getGif(name: string, movieClipName: string = 'default'): egret.MovieClip {
        name = name.slice(0, name.lastIndexOf('.'));
        const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(
            RES.getRes(name.concat('.json')),
            RES.getRes(name.concat('.png'))
        );
        const mc: egret.MovieClip = new egret.MovieClip(
            mcFactory.generateMovieClipData(movieClipName)
        );
        const remove = () => mc.parent && mc.parent.removeChild(mc);
        mc.addEventListener(egret.MotionEvent.COMPLETE, remove, null);
        return mc;
    }
    export function playGif(name: string, movieClipName: string = 'default'): egret.MovieClip {
        const mc: egret.MovieClip = getGif(name, movieClipName);
        egret.MainContext.instance.stage.addChild(mc);
        mc.play();
        return mc;
    }

    export function setScore(score: number) {
        return new Promise((reslove, reject) => {
            wx.setUserCloudStorage({
                KVDataList: [
                    {
                        key: 'score',
                        value: JSON.stringify({
                            wxgame: {
                                score,
                                update_time: Date.now(),
                            },
                        }),
                    },
                ],
                success: reslove,
                fail: reject,
            });
        });
    }

    const shareAppMessageOption: WechatMinigame.ShareAppMessageOption = {
        title: '我现在遇到一些很坏的星星，需要你的帮助！',
        imageUrl: 'resource/shareCover.png',
    };
    export function shareApp() {
        wx.shareAppMessage(shareAppMessageOption);
    }
    export function showShareMenu() {
        if (typeof wx === 'undefined') return;
        wx.showShareMenu({});
        wx.onShareAppMessage(() => shareAppMessageOption);
    }
}
