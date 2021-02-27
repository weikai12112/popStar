//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends scene.Home implements RES.PromiseTaskReporter {
    private label: eui.Label = new eui.Label();
    private process: eui.Image;
    private star: eui.Image;
    protected startBtn: lib.ImageButton;

    protected createChildren(): void {
        super.createChildren();
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.startBtn.visible = false;
        const processBack: eui.Image = new eui.Image(Assets.LoadingProgressBgPng);
        const processFront: eui.Image = new eui.Image(Assets.LoadingProgressFrontPng);
        const star: eui.Image = new eui.Image(Assets.LoadingStarPng);
        this.horizontalCenter = 0
        processBack.horizontalCenter = processFront.horizontalCenter = 0;
        processBack.verticalCenter = processFront.verticalCenter = star.verticalCenter = utils.vw(
            28
        );
        this.process = processFront;
        this.star = star;
        this.addChild(processBack);
        this.addChild(processFront);
        this.addChild(star);
        star.anchorOffsetX = star.width / 2;

        // const label: eui.Label = this.label;
        // label.size = utils.vw(4.3);
        // label.horizontalCenter = 0;
        // label.verticalCenter = utils.vw(35.3);
        // this.addChild(label);

        this.setProcess(0);
    }

    protected createStartButton(): void {}

    public onProgress(current: number, total: number): void {
        this.setProcess(current / total);
    }

    private setProcess(percent: number) {
        const mask = new egret.Rectangle(0, 0, this.process.width * percent, this.process.height);
        this.process.mask = mask;
        this.star.x = 242 + mask.width;
        this.label.text = `${~~(percent * 100)}%...`;
    }
}
