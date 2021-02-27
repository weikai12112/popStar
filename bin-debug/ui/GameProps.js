var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ui;
(function (ui) {
    var GameProps = (function (_super) {
        __extends(GameProps, _super);
        function GameProps(type) {
            var _this = _super.call(this) || this;
            _this.type = type;
            // if(this.type == EGamePropsType.DOUBLESCORE)this.visible = storage.props.todaySignTimes < 3;
            _this.skinName = Skins.GamePropsSkinExml;
            _a = _this.getIcon(), _this.button.source = _a[0], _this.button.disableSource = _a[1];
            _this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
            _this.watchVideoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.watchVideo, _this);
            _this.setNum(storage.props.getNum(_this.type));
            _this.lightCircle.visible = false;
            return _this;
            var _a;
        }
        GameProps.prototype.watchVideo = function () {
            var _this = this;
            this.watchVideoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.watchVideo, this);
            ad.showRewardedVideo().then(function (res) {
                _this.watchVideoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.watchVideo, _this);
                if (res.isEnded) {
                    storage.props.getProp(_this.type);
                    _this.getPropAnimate(storage.props.getNum(_this.type));
                }
            });
        };
        GameProps.prototype.getIcon = function () {
            switch (this.type) {
                case EGamePropsType.BOMB:
                    return [Assets.GamePropsBombPng, Assets.GamePropsBombXPng];
                case EGamePropsType.HAMMER:
                    return [Assets.GamePropsHammerPng, Assets.GamePropsHammerXPng];
                case EGamePropsType.RANDOM:
                    return [Assets.GamePropsRandomPng, Assets.GamePropsRandomXPng];
                case EGamePropsType.PEN:
                    return [Assets.GamePropsPenPng, Assets.GamePropsPenXPng];
                case EGamePropsType.DOUBLESCORE:
                    return [Assets.doubleScorePng, Assets.doubleScorePng];
            }
        };
        GameProps.prototype.onClick = function () {
            var _this = this;
            //是否双倍积分道具
            if (this.type == EGamePropsType.DOUBLESCORE) {
                // GlobalEvent.dispatchEvent(GlobalEvent.DOUBLE_SCORE);
                //观看广告
                this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                ad.showRewardedVideo().then(function (res) {
                    _this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
                    if (res.isEnded) {
                        _this.visible = false;
                        // storage.props.sign()
                        GlobalEvent.dispatchEvent(GlobalEvent.DOUBLE_SCORE);
                    }
                });
            }
            else {
                if (!this.lightCircle.visible) {
                    if (this.type === EGamePropsType.RANDOM) {
                        GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.RANDOM);
                        utils.audio.play(Assets.AudioRandomMp3);
                    }
                    else {
                        GlobalEvent.dispatchEvent(GlobalEvent.TOUCH_MODE_CHANGE, this.type);
                    }
                }
                else {
                    GlobalEvent.dispatchEvent(GlobalEvent.TOUCH_MODE_CHANGE, null);
                }
            }
        };
        GameProps.prototype.active = function () {
            var _this = this;
            this.lightCircle.visible = true;
            this.lightCircle.rotation = 0;
            egret.Tween.get(this.lightCircle)
                .to({ rotation: 360 }, 1000)
                .call(function () { return _this.active(); });
        };
        GameProps.prototype.deactive = function () {
            this.lightCircle.visible = false;
            egret.Tween.removeTweens(this.lightCircle);
        };
        GameProps.prototype.setNum = function (count) {
            if (count < 0)
                count = 0;
            if (this.type != EGamePropsType.DOUBLESCORE && count == 0) {
                this.watchVideoButton.visible = true;
                this.numUI.visible = false;
            }
            else {
                this.watchVideoButton.visible = false;
                this.numUI.visible = true;
            }
            if (this.type == EGamePropsType.DOUBLESCORE)
                this.numUI.visible = false;
            storage.props.state[this.type] = count;
            storage.props.push();
            this.button.enabled = count > 0;
            this.numUI.removeChildren();
            this.numUI.addChild(new eui.Image(Assets.NumSet1SheetJson + "#x"));
            for (var _i = 0, _a = String(count); _i < _a.length; _i++) {
                var n = _a[_i];
                this.numUI.addChild(new eui.Image(Assets.NumSet1SheetJson + "#" + n));
            }
        };
        GameProps.prototype.onUseProps = function (e) {
            if (e.data === this.type) {
                this.setNum(storage.props.getNum(this.type) - 1);
                ui.StarBrickMartix.clearTouchMode();
                setTimeout(function () {
                    GlobalEvent.dispatchEvent(GlobalEvent.COMMAND_CHECK_GAME_OVER);
                }, 50);
            }
        };
        GameProps.prototype.onTouchModeChange = function (e) {
            if (e.data === this.type) {
                this.active();
            }
            else {
                this.deactive();
            }
        };
        GameProps.prototype.onGetProps = function (e) {
            if (e.data === this.type) {
                this.getPropAnimate(storage.props.getNum(this.type) + 1);
            }
        };
        //添加道具动画
        GameProps.prototype.getPropAnimate = function (num) {
            var _this = this;
            var icon = new eui.Image(this.getIcon()[0]);
            icon.alpha = 0.3;
            icon.horizontalCenter = 0;
            icon.verticalCenter = -150;
            this.addChild(icon);
            egret.Tween.get(icon)
                .to({ verticalCenter: 0, alpha: 1 }, 500)
                .call(function () {
                _this.removeChild(icon);
                _this.setNum(num);
            });
        };
        __decorate([
            decorator.globalEvent(GlobalEvent.USE_PROPS)
        ], GameProps.prototype, "onUseProps", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        ], GameProps.prototype, "onTouchModeChange", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.COMMAND_GET_PROPS)
        ], GameProps.prototype, "onGetProps", null);
        return GameProps;
    }(eui.Component));
    ui.GameProps = GameProps;
    __reflect(GameProps.prototype, "ui.GameProps");
})(ui || (ui = {}));
