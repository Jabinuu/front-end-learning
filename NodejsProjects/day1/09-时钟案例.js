const fs = require('fs');
const path = require('path');

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, './时钟案例/index.html'), (err, dataStr) => {
    if (err) {
        return console.log('读取文件失败！' + err.message);
    }
    resolveCss(dataStr);
    resloveJs(dataStr);
    resloveHtml(dataStr);
})

function resloveHtml(dataStr) {
    console.log('sss');
}

function resolveCss(dataStr) {

}

function resloveJs(dataStr) {

}