const utils = require('./utils');

const canvas = wx.getSharedCanvas();
/** @type { CanvasRenderingContext2D } */
const ctx = canvas.getContext('2d');

exports.ctx = ctx;

let render = () => {};

const assets = new Map();
function wxImage(source) {
    const image = wx.createImage();
    image.onload = () => {
        render();
    };
    image.src = source;
    assets.set(source, image);
    return image;
}
function resLoader(source) {
    return assets.has(source) ? assets.get(source) : wxImage(source);
}

exports.clear = function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

exports.clip = function (cb) {
    ctx.beginPath();
    cb();
    ctx.clip();
};

exports.drawRect = function (x, y, width, height) {
    ctx.rect(x, y, width, height);
};

exports.drawRoundRect = function (x, y, width, height, radius) {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, -Math.PI, -Math.PI / 2);
};

exports.drawGraphics = function (cb) {
    ctx.beginPath()
    cb(ctx)
}

exports.translate = function (x, y) {
    ctx.translate(x, y);
};

exports.drawImage = function drawImage(source, x, y, dw, dy) {
    const image = resLoader(source);
    ctx.drawImage(image, x - image.width / 2, y - image.height / 2);
};
exports.drawAvatar = function drawAvatar(source, x, y, radius = utils.vw(4.5), color = '#bcbcbc') {
    exports.drawGraphics(() => {
        ctx.arc(x, y, radius * 1.1, 0, 2 * Math.PI )
        exports.fill(color)
    })
    exports.save(() => {
        exports.clip(() => {
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
        })
        const image = resLoader(source);
        try {
            ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
        } catch (e) {

        }
    });
};

exports.fill = function (color) {
    ctx.fillStyle = color;
    ctx.fill();
};

exports.stroke = function (lineWidth, color) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
};

/**
 * 绘制文本
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {object} options
 * @param {number} options.size
 * @param {string} options.color
 * @param {CanvasTextAlign} [options.textAlign]
 * @param {CanvasTextBaseline} [options.textBaseline]
 * @param {number} [options.maxWidth]
 * @param {boolean} [options.bold]
 */
exports.drawText = function drawText(text, x, y, options) {
    exports.save(() => {
        ctx.font = `${options.size}px MicrosoftYaHei`;
        if (options.bold) ctx.font = 'bold ' + ctx.font
        ctx.fillStyle = '#' + options.color;
        ctx.textAlign = options.textAlign || 'left';
        ctx.textBaseline = options.textBaseline || 'top';
        ctx.fillText(text, x, y, options.maxWidth);
    });
};

exports.save = function (draw) {
    ctx.save();
    draw();
    ctx.restore();
};

exports.setRender = function (_render) {
    render = _render;
};
