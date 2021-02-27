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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ui;
(function (ui) {
    var StarBrickMartix = (function (_super) {
        __extends(StarBrickMartix, _super);
        function StarBrickMartix() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.multiple = 1;
            _this.floorLayout = new eui.Component();
            _this.col = 10;
            /** 触摸模式：检测是否正在使用道具。 */
            _this.touchMode = null;
            return _this;
        }
        StarBrickMartix.prototype.doubleScore = function () {
            this.multiple = 2;
        };
        /** 获取结算分数 */
        StarBrickMartix.getSettleAccounts = function (count) {
            if (count > 9)
                return 0;
            var tI = 10 - count;
            for (var i = this.settleAccountsDp.length; i <= tI; i++)
                this.settleAccountsDp[i] = 60 + (9 - i) * 40 + this.settleAccountsDp[i - 1];
            return this.settleAccountsDp[tI];
        };
        StarBrickMartix.clearTouchMode = function () {
            GlobalEvent.dispatchEvent(GlobalEvent.TOUCH_MODE_CHANGE, null);
        };
        StarBrickMartix.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.width = this.height = StarBrickMartix.size;
            this.addChild(this.floorLayout);
            if (!this.starBricks)
                this.initMatrix();
            this.createView();
            this.startTip();
        };
        StarBrickMartix.prototype.setStars = function (stars) {
            this.starBricks = stars.map(function (col) {
                return col.map(function (item) { return item && new ui.StarBrick(item.color); });
            });
        };
        /** 初始化矩阵 */
        StarBrickMartix.prototype.initMatrix = function () {
            this.starBricks = [];
            for (var x = 0; x < this.col; x++) {
                this.starBricks.push([]);
                for (var y = 0; y < this.col; y++) {
                    this.starBricks[x][y] = new ui.StarBrick(utils.getRandomInteger(0, ui.StarBrick.colorCount - 1));
                }
            }
        };
        StarBrickMartix.prototype.createView = function () {
            var _this = this;
            this.starBricks.forEach(function (col, x) {
                col.forEach(function (item, y) {
                    var bg = new eui.Image(Assets.GameStarBgPng);
                    bg.x = ui.StarBrick.transX(x);
                    bg.y = ui.StarBrick.transY(y);
                    _this.floorLayout.addChild(bg);
                    bg.anchorOffsetX = bg.width / 2;
                    bg.anchorOffsetY = bg.height / 2;
                    if (item) {
                        item.setPosition(x, y);
                        _this.addChild(item);
                    }
                });
            });
        };
        StarBrickMartix.prototype.onTouchModeChange = function (e) {
            this.touchMode = e.data;
        };
        /** 星星被点击，逻辑入口 */
        StarBrickMartix.prototype.onStarTap = function (evt) {
            return __awaiter(this, void 0, void 0, function () {
                var star;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.touchEnabled)
                                return [2 /*return*/];
                            star = evt.data;
                            if (this.touchMode !== null) {
                                utils.audio.play(Assets.AudioClickWav);
                                switch (this.touchMode) {
                                    case EGamePropsType.BOMB:
                                        return [2 /*return*/, this.addChild(new ui.GameBoomSelect(star))];
                                    case EGamePropsType.HAMMER:
                                        return [2 /*return*/, this.addChild(new ui.GameHammerSelect(star))];
                                    case EGamePropsType.PEN:
                                        return [2 /*return*/, this.addChild(new ui.GameColorSelect(star))];
                                    default:
                                        return [2 /*return*/];
                                }
                            }
                            if (!this.isDestructible(star.X, star.Y))
                                return [2 /*return*/];
                            this.lockTouch();
                            utils.audio.play(Assets.AudioStarDisappearMp3);
                            return [4 /*yield*/, this.blastingFrom(star)];
                        case 1:
                            _a.sent();
                            this.sortOut();
                            this.checkGameOver();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** 点爆破 */
        StarBrickMartix.prototype.blastingFrom = function (star) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var rootLine, score, i, dfs, mcFactory, mc, _a;
                return __generator(this, function (_b) {
                    rootLine = new ui.StarRootLine(star);
                    score = 0;
                    i = 0;
                    dfs = function (star, line) {
                        star.remove();
                        _this.starBricks[star.X][star.Y] = null;
                        line.setTial(star);
                        score += 5 + 10 * i++;
                        for (var _i = 0, _a = ['T', 'R', 'B', 'L']; _i < _a.length; _i++) {
                            var dir = _a[_i];
                            var next = _this.getDirFrom(star, dir);
                            if (next) {
                                if (line.dir === dir) {
                                    dfs(next, line);
                                }
                                else {
                                    var nextLine = new ui.StarLine(star, dir);
                                    line.children.push(nextLine);
                                    _this.addChild(nextLine);
                                    dfs(next, nextLine);
                                }
                            }
                        }
                    };
                    dfs(star, rootLine);
                    GlobalEvent.dispatchEvent(GlobalEvent.STAR_COMBO, i);
                    mcFactory = new egret.MovieClipDataFactory(RES.getRes(Assets.shineJson), RES.getRes(Assets.shinePng));
                    mc = new egret.MovieClip(mcFactory.generateMovieClipData(EStarColor[star.color].toLowerCase()));
                    _a = [star.x + 3, star.y - 8], mc.x = _a[0], mc.y = _a[1];
                    this.addChild(mc);
                    /**双倍加分? */
                    score = score * this.multiple;
                    return [2 /*return*/, new Promise(function (rs) {
                            rootLine.run(function () {
                                GlobalEvent.dispatchEvent(GlobalEvent.SCORE_ADD, score);
                                mc.addEventListener(egret.Event.COMPLETE, rs, null);
                                mc.play();
                            });
                        })];
                });
            });
        };
        /** 连击达到6次，给你点个赞 */
        StarBrickMartix.prototype.good = function (e) {
            if (e.data >= 6) {
                utils.audio.play(Assets.AudioGoodMp3);
                var mc = utils.playGif(Assets.GameGifGoodPng);
                mc.x = this.stage.stageWidth / 2;
                mc.y = this.stage.stageHeight / 2;
            }
        };
        /** 整理 */
        StarBrickMartix.prototype.sortOut = function () {
            var _this = this;
            this.starBricks.forEach(function (col, x) {
                var p = 0;
                col.forEach(function (item, y) {
                    if (item && item.Y !== p) {
                        col[p] = item;
                        col[y] = null;
                        item.moveTo(x, p);
                    }
                    if (col[p])
                        p++;
                });
            });
            {
                var p_1 = 0;
                this.starBricks.forEach(function (col, x) {
                    if (col[0] && col[0].X !== p_1) {
                        _this.starBricks[p_1] = col;
                        _this.starBricks[x] = Array(_this.col).fill(null);
                        col.forEach(function (item, y) {
                            item && item.moveTo(p_1, y);
                        });
                    }
                    if (_this.starBricks[p_1][0])
                        p_1++;
                });
            }
        };
        StarBrickMartix.prototype.checkGameOver = function () {
            if (this.isGameOver())
                this.settleAccounts();
            else
                this.nextTurn();
        };
        /** 游戏结算 */
        StarBrickMartix.prototype.settleAccounts = function () {
            var _this = this;
            var booms = [];
            for (var x = 0; x < this.col; x++) {
                var _loop_1 = function (y) {
                    var starBrick = this_1.starBricks[x][y];
                    if (!starBrick)
                        return "break";
                    var promise = starBrick
                        .flash()
                        .then(function () { return starBrick.flash(); })
                        .then(function () { return new Promise(function (rs) { return setTimeout(rs, y * 100); }); })
                        .then(function () { return starBrick.boom(); });
                    booms.push(promise);
                };
                var this_1 = this;
                for (var y = 0; y < this.col; y++) {
                    var state_1 = _loop_1(y);
                    if (state_1 === "break")
                        break;
                }
            }
            var count = booms.length;
            var modal = new ui.GameSettleModal(count);
            this.addChild(modal);
            var score = StarBrickMartix.getSettleAccounts(count);
            GlobalEvent.dispatchEvent(GlobalEvent.SCORE_ADD, score);
            Promise.all(booms)
                .then(function () {
                if (count === 0)
                    return new Promise(function (rs) { return setTimeout(rs, 1000); });
            })
                .then(function () {
                _this.removeChild(modal);
                GlobalEvent.dispatchEvent(GlobalEvent.GAME_OVER);
            });
        };
        /** 获取相连集合 */
        StarBrickMartix.prototype.getSameColorSet = function (x, y) {
            var _this = this;
            var startBrick = this.starBricks[x][y];
            var set = new Set();
            set.add(startBrick);
            if (startBrick) {
                var cb_1 = function (item) {
                    if (!set.has(item)) {
                        set.add(item);
                        _this.forNearFrom(item.X, item.Y, cb_1);
                    }
                };
                this.forNearFrom(x, y, cb_1);
            }
            return set;
        };
        StarBrickMartix.prototype.forNearFrom = function (x, y, cb) {
            var _this = this;
            var startBrick = this.starBricks[x][y];
            if (!startBrick)
                return;
            var isLink = function (x, y) {
                return _this.starBricks[x][y] && _this.starBricks[x][y].color === startBrick.color;
            };
            if (x > 0 && isLink(x - 1, y))
                cb(this.starBricks[x - 1][y]);
            if (x < this.col - 1 && isLink(x + 1, y))
                cb(this.starBricks[x + 1][y]);
            if (y > 0 && isLink(x, y - 1))
                cb(this.starBricks[x][y - 1]);
            if (y < this.col - 1 && isLink(x, y + 1))
                cb(this.starBricks[x][y + 1]);
        };
        /** 是否可销毁 */
        StarBrickMartix.prototype.isDestructible = function (x, y) {
            var count = 0;
            this.forNearFrom(x, y, function () { return count++; });
            return count > 0;
        };
        StarBrickMartix.prototype.lockTouch = function () {
            this.touchEnabled = false;
            this.touchChildren = false;
        };
        StarBrickMartix.prototype.nextTurn = function () {
            this.touchEnabled = true;
            this.touchChildren = true;
            this.startTip();
        };
        StarBrickMartix.prototype.clearTip = function () {
            clearTimeout(this.tipTimeId);
        };
        StarBrickMartix.prototype.startTip = function () {
            var _this = this;
            clearTimeout(this.tipTimeId);
            this.tipTimeId = setTimeout(function () {
                _this.showTip();
            }, 5000);
        };
        StarBrickMartix.prototype.boomGrid9 = function (e) {
            var _this = this;
            var _a = e.data, X = _a[0], Y = _a[1];
            for (var x = X - 1; x <= X + 1; x++) {
                for (var y = Y - 1; y <= Y + 1; y++) {
                    var starBrick = this.starBricks[x][y];
                    if (!starBrick)
                        continue;
                    this.starBricks[x][y] = null;
                    starBrick.boom();
                }
            }
            utils.audio.play(Assets.AudioBoomMp3);
            setTimeout(function () {
                _this.sortOut();
                GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.BOMB);
            }, 500);
        };
        StarBrickMartix.prototype.onHammer = function (e) {
            var _this = this;
            utils.audio.play(Assets.AudioHammerMp3);
            var _a = e.data, X = _a[0], Y = _a[1];
            this.starBricks[X][Y].boom();
            this.starBricks[X][Y] = null;
            setTimeout(function () {
                _this.sortOut();
                GlobalEvent.dispatchEvent(GlobalEvent.USE_PROPS, EGamePropsType.HAMMER);
            }, 500);
        };
        /** 获取某个方向上相邻的同色星星 */
        StarBrickMartix.prototype.getDirFrom = function (starA, dir) {
            var starB;
            switch (dir) {
                case 'L':
                    if (starA.X <= 0)
                        return null;
                    starB = this.starBricks[starA.X - 1][starA.Y];
                    break;
                case 'R':
                    if (starA.X >= this.col - 1)
                        return null;
                    starB = this.starBricks[starA.X + 1][starA.Y];
                    break;
                case 'T':
                    if (starA.Y >= this.col - 1)
                        return null;
                    starB = this.starBricks[starA.X][starA.Y + 1];
                    break;
                case 'B':
                    if (starA.Y <= 0)
                        return null;
                    starB = this.starBricks[starA.X][starA.Y - 1];
                    break;
            }
            if (!starB || starA.color !== starB.color)
                return null;
            return starB;
        };
        StarBrickMartix.prototype.getStorageData = function () {
            return this.starBricks.map(function (col) { return col.map(function (item) { return item && item.getStorageData(); }); });
        };
        StarBrickMartix.prototype.isGameOver = function () {
            for (var x = 0; x < this.col; x++) {
                for (var y = 0; y < this.col; y++) {
                    if (!this.starBricks[x][y])
                        continue;
                    if (x > 0 &&
                        this.starBricks[x - 1][y] &&
                        this.starBricks[x][y].color === this.starBricks[x - 1][y].color)
                        return false;
                    if (y > 0 &&
                        this.starBricks[x][y - 1] &&
                        this.starBricks[x][y].color === this.starBricks[x][y - 1].color)
                        return false;
                }
            }
            return true;
        };
        /** 显示提示 */
        StarBrickMartix.prototype.showTip = function () {
            var dpTable = [];
            var maxItem = new Set();
            for (var x = 0; x < 10; x++) {
                var _loop_2 = function (y) {
                    dpTable.push([]);
                    if (x === 0 && y === 0) {
                        dpTable[x][y] = new Set();
                    }
                    else if (x === 0) {
                        var star = this_2.starBricks[x][y];
                        dpTable[x][y] =
                            star && this_2.getDirFrom(star, 'B') ? dpTable[x][y - 1] : new Set();
                    }
                    else if (y === 0) {
                        var star = this_2.starBricks[x][y];
                        dpTable[x][y] =
                            star && this_2.getDirFrom(star, 'L') ? dpTable[x - 1][y] : new Set();
                    }
                    else {
                        var star = this_2.starBricks[x][y];
                        if (star) {
                            var starL = this_2.getDirFrom(star, 'L');
                            var starB = this_2.getDirFrom(star, 'B');
                            if (starL && starB) {
                                if (dpTable[x - 1][y] === dpTable[x][y - 1]) {
                                    dpTable[x][y] = dpTable[x - 1][y];
                                }
                                else {
                                    var set_1 = dpTable[x - 1][y];
                                    dpTable[x][y] = set_1;
                                    dpTable[x][y - 1].forEach(function (item) {
                                        set_1.add(item);
                                        dpTable[item.X][item.Y] = set_1;
                                    });
                                }
                            }
                            else if (starL) {
                                dpTable[x][y] = dpTable[x - 1][y];
                            }
                            else if (starB) {
                                dpTable[x][y] = dpTable[x][y - 1];
                            }
                            else {
                                dpTable[x][y] = new Set();
                            }
                        }
                        else {
                            dpTable[x][y] = new Set();
                        }
                    }
                    if (this_2.starBricks[x][y]) {
                        dpTable[x][y].add(this_2.starBricks[x][y]);
                    }
                    if (dpTable[x][y].size > maxItem.size) {
                        maxItem = dpTable[x][y];
                    }
                };
                var this_2 = this;
                for (var y = 0; y < 10; y++) {
                    _loop_2(y);
                }
            }
            maxItem.forEach(function (item) { return item.shake(); });
        };
        StarBrickMartix.settleAccountsDp = [0];
        StarBrickMartix.size = 970;
        __decorate([
            decorator.globalEvent(GlobalEvent.DOUBLE_SCORE)
        ], StarBrickMartix.prototype, "doubleScore", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.TOUCH_MODE_CHANGE)
        ], StarBrickMartix.prototype, "onTouchModeChange", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.STAR_TAP)
        ], StarBrickMartix.prototype, "onStarTap", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.STAR_COMBO)
        ], StarBrickMartix.prototype, "good", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.COMMAND_CHECK_GAME_OVER)
        ], StarBrickMartix.prototype, "checkGameOver", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.COMMAND_LOCK_TOUCH)
        ], StarBrickMartix.prototype, "lockTouch", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.STAR_COMBO),
            decorator.event(egret.Event.REMOVED_FROM_STAGE)
        ], StarBrickMartix.prototype, "clearTip", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.USE_PROPS)
        ], StarBrickMartix.prototype, "startTip", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.COMMAND_BOOM_GRID9)
        ], StarBrickMartix.prototype, "boomGrid9", null);
        __decorate([
            decorator.globalEvent(GlobalEvent.COMMAND_HAMMER)
        ], StarBrickMartix.prototype, "onHammer", null);
        return StarBrickMartix;
    }(eui.Component));
    ui.StarBrickMartix = StarBrickMartix;
    __reflect(StarBrickMartix.prototype, "ui.StarBrickMartix");
})(ui || (ui = {}));
