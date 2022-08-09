const path = require('path')

// extname方法返回的是扩展名
const extname = path.extname(path.join(__dirname, './files/成绩-ok.txt'));
console.log(extname);