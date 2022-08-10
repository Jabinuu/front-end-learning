const fs = require('fs');

// nodejs里的./和../是执行nodejs所在的目录的相对路径，而不是当前这个js文件的相对路径，
// 这是有差别的，比如你可能在文件的上上级目录打开终端执行这个js，这就会导致路径错误
fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
    console.log(err);
    console.log('-------------------------')
    console.log(dataStr);
})

// 所以以后都这样写文件路径，__dirname：是当前js文件所处的目录，然后将它和文件子目录进行字符串拼接，从而得到最终路径
// 不要用+号拼接，用path的join方法拼接是常态
fs.readFile(__dirname + '/files/成绩-ok.txt', 'utf8', function (err, dataStr) {
    console.log(err);
    console.log('-------------------------')
    console.log(dataStr);
})