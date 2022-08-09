const fs = require('fs');

// 参数2（可选）：编码格式，如果不算utf8的话中文字会乱码
fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
    console.log(err);
    console.log('-------------------------')
    console.log(dataStr);
})