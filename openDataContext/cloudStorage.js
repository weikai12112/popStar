/** @type {WechatMinigame.UserInfo} */
exports.self = null;
/** @type {Friend[]} */
exports.friends = [];

function Friend(user) {
    this.avatarUrl = user.avatarUrl;
    this.nickname = user.nickname;
    const detail = JSON.parse(user.KVDataList.find((item) => item.key === 'score').value);
    this.score = detail.wxgame.score;
    this.updateTime = detail.wxgame.update_time;
}

exports.sortByScore = (a, b) => b.score - a.score || a.updateTime - b.updateTime;

exports.fetchFriends = function () {
    return new Promise((reslove, reject) => {
        wx.getFriendCloudStorage({
            keyList: ['score'],
            success(res) {
                exports.friends = res.data
                    .filter((user) => user.KVDataList.length > 0)
                    .map((user) => new Friend(user))
                    .sort(exports.sortByScore);
                // for (let i = 0; i < 10; i ++)
                //     exports.friends.push(users[0])
                reslove();
            },
            fail(res) {
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                });
                reject();
            },
        });
    });
};

exports.fetchSelf = function () {
    return new Promise((reslove) => {
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success(res) {
                exports.self = res.data[0];
                reslove();
            },
        });
    });
};

let maxScore = 0

exports.getScore = function () {
    if (maxScore) return Promise.resolve(maxScore)
    return new Promise((rs, rj) => {
        wx.getUserCloudStorage({
            keyList: ['score'],
            success(res) {
                const kvData = res.KVDataList[0];
                if (!kvData) {
                    rs(0);
                } else {
                    maxScore = JSON.parse(kvData.value).wxgame.score
                    rs(maxScore);
                }
            },
            fail: rj
        });
    })
}

exports.setScore = function (score) {
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
            success() {
                reslove();
                maxScore = score
                exports.fetchFriends();
            },
            fail: reject,
        });
    });
};
