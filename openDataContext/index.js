require('./ranking');
require('./gameover');

{
    const cloudStorage = require('./cloudStorage');
    cloudStorage.fetchFriends();
    cloudStorage.fetchSelf();
}