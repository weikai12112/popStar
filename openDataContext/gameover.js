const utils = require('./utils');
const ctxUtil = require('./ctxUtil');
const cloudStorage = require('./cloudStorage');

const ctx = ctxUtil.ctx;

function Area() {
    this.width = 978;
    this.height = 403;
    this.radius = utils.vw(2);
    this.itemWidth = 300;
    this.gap = 27;
    this.x = utils.vw(50) - this.width / 2;
    this.y = utils.vh(50) - utils.vw(7);
}

let iconScource = '';

function render() {
    ctxUtil.setRender(render);
    ctxUtil.clear();
    drawUsers();
    if (iconScource) ctxUtil.drawImage(iconScource, utils.vw(50), utils.vh(50) - utils.vw(48));
}

function drawUsers() {
    const { self, friends } = cloudStorage;
    if (!self) return;
    const selfIndex = friends.findIndex((friend) => friend.avatarUrl === self.avatarUrl);
    const startIndex =
        friends.length <= 3
            ? 0
            : selfIndex === 0
            ? 0
            : selfIndex === friends.length - 1
            ? friends.length - 3
            : selfIndex - 1;
    const area = new Area();
    for (let i = startIndex; i < startIndex + 3 && i < friends.length; i++) {
        ctxUtil.save(() => {
            const friend = friends[i];
            ctxUtil.translate(area.x + (area.itemWidth + area.gap) * (i - startIndex), area.y);
            drawUser(friend, i, selfIndex === i);
        });
    }
}

function drawUser(user, i, isSelf) {
    const area = new Area();
    ctxUtil.drawGraphics(() => {
        ctxUtil.drawRoundRect(0, 0, area.itemWidth, area.height, area.radius);
        if (isSelf) ctxUtil.fill('#f0f0f0');
        else ctxUtil.stroke(4, '#f0f0f0');
    });
    {
        const x = utils.vw(4);
        const y = utils.vw(4.6);
        if (i < 3) {
            ctxUtil.drawImage(`openDataContext/assets/NO${i + 1}.png`, x, y);
        } else {
            ctxUtil.drawGraphics(() => {
                ctx.arc(x, y, 25, 0, Math.PI * 2);
                ctxUtil.fill('#bababa');
            });
            ctxUtil.drawText(i + 1, x, y + utils.vw(0.3), {
                size: utils.vw(2.8),
                color: 'ffffff',
                textAlign: 'center',
                textBaseline: 'middle',
                bold: true,
            });
        }
    }
    const color = '666666';
    const centerX = area.itemWidth / 2;
    ctxUtil.drawAvatar(
        user.avatarUrl,
        centerX,
        utils.vw(14),
        utils.vw(6),
        ['#ffcc3b', '#b1c2dc', '#ffaf6d'][i] || '#bcbcbc'
    );
    ctxUtil.drawText(utils.subNickName(user.nickname), centerX, utils.vw(24), {
        color: color,
        size: utils.vw(3),
        textAlign: 'center',
        textBaseline: 'middle',
    });
    ctxUtil.drawGraphics(() => {
        ctxUtil.drawRoundRect(30, 316, 255, 50, 25);
        ctxUtil.fill(isSelf ? '#fefefe' : '#f0f0f0');
    });
    ctxUtil.drawImage(`openDataContext/assets/scoreIcon.png`, 65, utils.vw(30.2));
    ctxUtil.drawText(`${user.score}`, centerX + 5, utils.vw(30.7), {
        color: color,
        size: utils.vw(3.2),
        textAlign: 'center',
        textBaseline: 'middle',
        bold: true,
    });
}

function fetch() {
    cloudStorage.fetchFriends().then(render);
    if (!cloudStorage.self) cloudStorage.fetchSelf().then(render);
}

wx.onMessage((res) => {
    switch (res.command) {
        case 'gameover:render': {
            cloudStorage.getScore().then((maxScore) => {
                if (res.value > maxScore) {
                    cloudStorage.setScore(res.value).then(fetch);
                    iconScource = 'openDataContext/assets/gameOverIcon1.png';
                } else {
                    iconScource = 'openDataContext/assets/gameOverIcon0.png';
                }
                render();
            });
            fetch();
            render();
            break;
        }
    }
});
