const path = require('path')
const basename = path.basename(path.join(__dirname, './files/成绩-ok.txt'));
console.log(basename);

// basename的参数2是可选参数，意为屏蔽扩展名 只获取文件名
const noExt = path.basename(path.join(__dirname, './files/成绩-ok.txt'), '.txt')
console.log(noExt);

const test = path.basename(path.join(__dirname, './files/成绩-ok.txt')).split('.')[0];
console.log(test);