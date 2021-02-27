const path = require('path');
const fs = require('fs');

console.log('正在读取资源...');
const assets = fs.readdirSync(`./resource/assets`);
const skins = fs.readdirSync(`./resource/eui_skins`);
const defaultRes = {
    groups: [
        {
            keys: '',
            name: 'preload',
        },
        {
            keys: '',
            name: 'loading',
        },
    ],
    resources: [],
};
const preloadGroup = defaultRes.groups[0];
const loadingGroup = defaultRes.groups[1];
const resources = defaultRes.resources;

console.log('资源分析中...');
assets.forEach((file) => {
    const type =
        file.endsWith('.png') || file.endsWith('.jpg')
            ? 'image'
            : file.endsWith('.sheet.json')
            ? 'sheet'
            : file.endsWith('.json')
            ? 'json'
            : file.endsWith('.mp3') || file.endsWith('.wav')
            ? 'sound'
            : '???';
    resources.push({
        url: `assets/${file}`,
        type,
        name: file,
    });
});

preloadGroup.keys = resources.map((res) => res.name).join(',');
loadingGroup.keys = resources
    .filter((res) => res.name.startsWith('Loading'))
    .map((res) => res.name)
    .join(',');

console.log('资源文件同步中...');
fs.writeFileSync('./resource/default.res.json', JSON.stringify(defaultRes, null, 4));
fs.writeFileSync(
    './resource/default.thm.json',
    JSON.stringify(
        {
            skins: {},
            autoGenerateExmlsList: true,
            exmls: skins.map((filename) => `resource/eui_skins/${filename}`),
            path: 'resource/default.thm.json',
        },
        null,
        '\t'
    )
);

function stringifyVar(str) {
    return str.replace(/[-._]\w/g, ($) => String($[1]).toUpperCase());
}

fs.writeFileSync(
    './src/Assets.ts',
    `
// WARNING: 本代码由 node ./build/syncAssetsToResJSON.js 生成，请勿手动修改
module Assets {
${resources.map((res) => `    export const ${stringifyVar(res.name)} = '${res.name}';`).join('\n')}
}

module Skins {
${skins
    .map(
        (filename) =>
            `    export const ${stringifyVar(filename)} = 'resource/eui_skins/${filename}';`
    )
    .join('\n')}
}
`.trim()
);

console.log('资源同步完毕!');
