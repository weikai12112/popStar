const ctxUtil = require('./ctxUtil');
const utils = require('./utils');
const cloudStorage = require('./cloudStorage');
const ctx = ctxUtil.ctx;

let offsetY = 0;
const INIT_OFFSET_Y = 9; // vw

function UserUi() {
    this.height = utils.vw(14);
    this.marginTop = utils.vw(2);
}

function Area() {
    this.x = utils.vw(50 - 38.7);
    this.y = utils.vh(50) - utils.vw(55);
    this.width = utils.vw(77);
    this.height = utils.vw(103);
}

function render() {
    ctxUtil.setRender(render);
    const area = new Area();
    ctxUtil.clear();
    ctxUtil.save(() => {
        ctxUtil.clip(() => {
            ctxUtil.drawRect(area.x, area.y, area.width, area.height);
        });
        drawUsers();
    });
    ctxUtil.drawImage(
        'openDataContext/assets/medal.png',
        utils.vw(50),
        utils.vh(50) - utils.vw(63)
    );
    drawMyself();
}

/**
 * @param {WechatMinigame.UserGameData} user
 */
function drawUser(x, y, user, i, color0, color1 = color0, color2 = '#bababa', color3) {
    ctxUtil.save(() => {
        ctxUtil.translate(x, y);
        if (i < 3) {
            ctxUtil.drawImage(`openDataContext/assets/NO${i + 1}.png`, 85, utils.vw(7));
        } else {
            ctxUtil.drawGraphics(() => {
                ctx.arc(85, utils.vw(7), 25, 0, Math.PI * 2)
                ctxUtil.fill(color2)
            })
            ctxUtil.drawText(i + 1, 85, utils.vw(7.3), {
                size: utils.vw(2.8),
                color: color0,
                textAlign: 'center',
                textBaseline: 'middle',
                bold: true,
            });
        }
        ctxUtil.drawAvatar(user.avatarUrl, utils.vw(18), utils.vw(7), utils.vw(4.5), color3 || ['#ffcc3b','#b1c2dc','#ffaf6d'][i] || '#bcbcbc');
        ctxUtil.drawText(utils.subNickName(user.nickname), utils.vw(27), utils.vw(6), {
            color: color1,
            size: 41,
        });
        ctxUtil.drawText(`${user.score}`, utils.vw(69), utils.vw(6), {
            color: color1,
            size: 42,
            textAlign: 'right',
            bold: true
        });
    });
}

function drawUsers() {
    const area = new Area();
    const userUi = new UserUi();
    
    cloudStorage.friends.forEach((user, i) => {
        const x = area.x;
        const y = area.y + (userUi.height + userUi.marginTop) * i + offsetY;
        ctxUtil.drawImage('openDataContext/assets/oBg.png', utils.vw(50), y + userUi.height / 2);
        drawUser(x, y, user, i, 'ffffff', '666666');
    });
}

function drawMyself() {
    const area = new Area();
    if (!cloudStorage.self) return;
    const myself = cloudStorage.self;
    const i = cloudStorage.friends.findIndex(
        (user) => user.avatarUrl === myself.avatarUrl && user.nickname === myself.nickName
    );
    if (i === -1) return;
    const user = cloudStorage.friends[i];
    // ctxUtil.drawImage(
    //     'openDataContext/assets/myBg.png',
    //     utils.vw(50.1),
    //     utils.vh(50) + utils.vw(54)
    // );
    drawUser(area.x, utils.vh(50) + utils.vw(51), user, i, 'fece6c', '666666', '#fffffe', '#ffeecc');
}

function init() {
    offsetY = utils.vw(INIT_OFFSET_Y);
    render();
    cloudStorage.fetchFriends().then(render);
    cloudStorage.fetchSelf().then(render);
}

function scroll(value) {
    const area = new Area();
    const userUi = new UserUi();
    offsetY += value;
    offsetY = Math.max(
        offsetY,
        -(userUi.height + userUi.marginTop) * cloudStorage.friends.length + area.height - utils.vw(15)
    );
    offsetY = Math.min(offsetY, utils.vw(INIT_OFFSET_Y));
    render();
}

wx.onMessage((res) => {
    switch (res.command) {
        case 'ranking:render': {
            init();
            break;
        }
        case 'ranking:scroll': {
            scroll(res.value);
            break;
        }
    }
});
