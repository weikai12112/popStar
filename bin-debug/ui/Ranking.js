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
    var Ranking = (function (_super) {
        __extends(Ranking, _super);
        function Ranking() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Ranking.prototype.createChildren = function () {
            this.skinName = Skins.RankingSkinExml;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.addChild(new lib.OpenDataContext());
            var dCtx = wx.getOpenDataContext();
            dCtx.postMessage({
                command: 'ranking:render',
            });
        };
        Ranking.prototype.onScrollStart = function (e) {
            this.lastStageY = e.stageY;
        };
        Ranking.prototype.onScroll = function (e) {
            var dCtx = wx.getOpenDataContext();
            dCtx.postMessage({
                command: 'ranking:scroll',
                value: e.stageY - this.lastStageY,
            });
            this.lastStageY = e.stageY;
        };
        Ranking.prototype.onStopScroll = function (e) {
            this.lastStageY = null;
        };
        Ranking.prototype.close = function () {
            this.parent && this.parent.removeChild(this);
        };
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_BEGIN)
        ], Ranking.prototype, "onScrollStart", null);
        __decorate([
            decorator.event(egret.TouchEvent.TOUCH_MOVE)
        ], Ranking.prototype, "onScroll", null);
        __decorate([
            decorator.event(egret.TouchEvent.ENDED)
        ], Ranking.prototype, "onStopScroll", null);
        Ranking = __decorate([
            decorator.fullScreen
        ], Ranking);
        return Ranking;
    }(eui.Component));
    ui.Ranking = Ranking;
    __reflect(Ranking.prototype, "ui.Ranking");
})(ui || (ui = {}));
