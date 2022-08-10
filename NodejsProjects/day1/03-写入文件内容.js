const fs = require('fs');

// 像文件中写入内容，若没有文件将创建这个文件并写入内容（覆盖）
// 但是他只会创建文件，而不会创建一个本不存在的文件夹（即目录）
fs.writeFile('./files/2.txt', 'adf', function (err) {
    if (err) {
        return console.log('写入该文件失败' + err.message);
    }
    console.log('写入文件成功！');
})