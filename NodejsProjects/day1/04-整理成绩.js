const fs = require('fs');

fs.readFile('./files/成绩.txt', 'utf-8', function (err, dataStr) {
    if (err) {
        return console.log('读取文件失败' + err.message);
    }
    const oldArr = dataStr.split(' ');
    const newArr = [];
    oldArr.forEach(item => {
        newArr.push(item.replace('=', '：'));
    });
    const newStr = newArr.join('\n');
    fs.writeFile('./files/成绩-ok.txt', newStr, function (err) {
        if (err) {
            return console.log('写入文件失败！' + err.message);
        }
        console.log('成绩整理完成');
    })
});
