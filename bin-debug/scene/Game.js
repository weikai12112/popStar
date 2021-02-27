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
var scene;
(function (scene) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(level, initScore, stars) {
            if (level === void 0) { level = 1; }
            if (initScore === void 0) { initScore = 0; }
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.commonFontSize = 1.1;
            _this.doubleFontSize = 1.4;
            _this.useDoubleProp = false;
            _this.newScore = 0;
            ui.StarBrick.colorCount = level <= 10 ? 4 : 5;
            _this.skinName = utils.isHighRatioScreen
                ? Skins.GameGigScreenSkinExml
                : Skins.GameSkinExml;
            _this.pauseBtn.source = Assets.GamePauseBtnPng;
            _this.targetScore = Game.getTargetScore(level);
            _this.score = initScore;
            _this.level = level;
            _this.levelUI.text = "\u5173\u5361 " + level;
            _this.brickMatrix;
            _this.progressUI.setProgress(_this.score / _this.targetScore);
            if (stars)
                _this.brickMatrix.setStars(stars);
            _this.superProp.addChild(new ui.GameProps(EGamePropsType.DOUBLESCORE));
            return _this;
        }
        Game.getTargetScore = function (level) {
            for (var i = this.targetScoreDp.length; i <= level; i++)
                this.targetScoreDp[i] = 1000 + (i - 1) * 500 + this.targetScoreDp[i - 1];
            return this.targetScoreDp[level];
        };
        Game.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.stage;
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
            this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openPauseModal, this);
        };
        Game.prototype.openPauseModal = function () {
            var modal = new ui.PauseModal();
            modal.horizontalCenter = 0;
            this.addChild(modal);
        };
        Game.prototype.onScoreAdd = function (e) {
            var _this = this;
            if (!e.data)
                return;
            var score = this.score + e.data;
            this.newScore += e.data;
            egret.Tween.removeTweens(this.scoreLabel);
            egret.Tween.get(this.scoreLabel)
                .to({ scaleX: this.useDoubleProp ? this.doubleFontSize : this.commonFontSize, scaleY: this.useDoubleProp ? this.doubleFontSize : this.commonFontSize }, 100)
                .to({ scaleX: 1, scaleY: 1 }, 100);
            var fixScore = function () { return (_this.score = ~~_this.score); };
            if (this.score < this.targetScore)
                this.progressUI.setProgress(score / this.targetScore);
            egret.Tween.get(this, { onChange: fixScore }).to({ score: score }, 200);
            if (this.useDoubleProp) {
                this.doubleScoreSmallFrame.x = 200 + score.toString().length * 47.5 / 2;
                this.doubleScoreSmallFrame.visible = true;
                this.addScoreLabel.text = e.data;
                egret.Tween.get(this.doubleScoreSmallFrame)
                    .to({ scaleX: this.useDoubleProp ? this.doubleFontSize : this.commonFontSize, scaleY: this.useDoubleProp ? this.doubleFontSize : this.commonFontSize }, 80)
                    .to({ scaleX: 1, scaleY: 1 }, 80).wait(500)
                    .call(function () {
                    _this.doubleScoreSmallFrame.visible = false;
                });
                egret.Tween.get(this.addScoreGroup)
                    .to({ alpha: 1 }, 20).wait(300)
                    .to({ alpha: 0 }, 400);
                // let frame = new ui.DoubleScoreSmallFrame(e.data)
                // this.addChild(frame)
                // frame.x = 200+score.toString().length*47.5/2;
                // frame.y = this.scoreLabel.y;
            }
        };
        Game.prototype.onGameOver = function () {
            if (this.score >= this.targetScore)
                this.nextLevel();
            else
                this.addChild(new ui.GameOver(this.score));
        };
        Game.prototype.nextLevel = function () {
            utils.switchScene(new Game(this.level + 1, this.score));
        };
        Game.prototype.save = function () {
            storage.game.state = {
                score: this.score,
                level: this.level,
                stars: this.brickMatrix.getStorageData(),
            };
            storage.game.push();
        };
        Game.prototype.showDoubleScoreBigFrame = function () {
            var _this = this;
            this.useDoubleProp = true;
            if (this.newScore != 0) {
                var frame = new ui.DoubleScoreBigFrame('+' + this.newScore, this.scoreLabel.x, this.scoreLabel.y);
                frame.verticalCenter = frame.horizontalCenter = 0;
                this.addChild(frame);
                setTimeout(function () {
                    var score = _this.score + _this.newScore;
                    egret.Tween.removeTweens(_this.scoreLabel);
                    egret.Tween.get(_this.scoreLabel)
                        .to({ scaleX: _this.useDoubleProp ? _this.doubleFontSize : _this.commonFontSize, scaleY: _this.useDoubleProp ? _this.doubleFontSize : _this.commonFontSize }, 100)
                        .to({ scaleX: 1, scaleY: 1 }, 100);
                    var fixScore = function () { return (_this.score = ~~_this.score); };
                    if (_this.score < _this.targetScore)
                        _this.progressUI.setProgress(score / _this.targetScore);
                    egret.Tween.get(_this, { onChange: fixScore }).to({ score: score }, 200);
                }, frame.timeOut);
            }
        };
        Game.targetScoreDp = [0];
        __decorate([
            decorator.globalEvent(GlobalEvent.SCORE_ADD)
        ], Game.prototype, "onScoreAdd", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.GAME_OVER)
        ], Game.prototype, "onGameOver", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.COMMAND_SAVE)
        ], Game.prototype, "save", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.DOUBLE_SCORE)
        ], Game.prototype, "showDoubleScoreBigFrame", null);
        return Game;
    }(eui.Component));
    scene.Game = Game;
    __reflect(Game.prototype, "scene.Game");
})(scene || (scene = {}));
