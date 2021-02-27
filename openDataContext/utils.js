function byteLength(s) {
  let len = 0;
  for (let i = 0; i < s.length; i++) {
      len += s.charCodeAt(i) > 999 ? 2 : 1;
      if (s.codePointAt(i) > 0xffff) i++;
  }
  return len;
}

function  subByteLen(s, subLen) {
  let len = 0;
  let subStr = '';
  for (let i = 0; i < s.length; i++) {
      subStr += s[i];
      len += s.charCodeAt(i) > 999 ? 2 : 1;
      if (s.codePointAt(i) > 0xffff) {
          subStr += s[i + 1];
          i++;
      }
      if (len >= subLen) break;
  }
  return subStr;
}

exports.subNickName = function  subNickName(s) {
  return byteLength(s) > 10 ? subByteLen(s, 8) + '...' : s;
}

exports.vw = function (n) {
  const canvas = wx.getSharedCanvas()
  return ~~((n / 100) * canvas.width);
}

exports.vh = function (n) {
  const canvas = wx.getSharedCanvas()
  return ~~((n / 100) * canvas.height);
}
