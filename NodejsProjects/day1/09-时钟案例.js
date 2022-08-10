const fs = require('fs');
const path = require('path');

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, './时钟案例/index.html'), 'utf-8', (err, dataStr) => {
    if (err) {
        return console.log('读取文件失败！' + err.message);
    }
    resolveCss(dataStr);
    resloveJs(dataStr);
    resloveHtml(dataStr);
})

function resloveHtml(dataStr) {
    const r1 = dataStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>');
    fs.writeFile(path.join(__dirname, './时钟案例/index.html'), r1, function (err) {
        if (err) {
            return console.log('html文件写入失败' + err.message);
        }
        console.log('html文件写入成功！');
    })
}

function resolveCss(dataStr) {
    const r1 = regStyle.exec(dataStr);
    const css = r1[0].replace('<style>', '').replace('</style>', '').replace('\n', '');

    fs.writeFile(path.join(__dirname, './时钟案例/index.css'), css, function (err) {
        if (err) {
            return console.log('css文件写入失败' + err.message);
        }
        console.log('css文件写入成功！');
    })
}

function resloveJs(dataStr) {
    const r1 = regScript.exec(dataStr);
    const css = r1[0].replace('<script>', '').replace('</script>', '').replace('\n', '');

    fs.writeFile(path.join(__dirname, './时钟案例/index.js'), css, function (err) {
        if (err) {
            return console.log('js文件写入失败' + err.message);
        }
        console.log('js文件写入成功！');
    })
}