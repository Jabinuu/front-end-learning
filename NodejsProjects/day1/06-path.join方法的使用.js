// 使用path模块处理路径
const path = require("path");
const fs = require("fs");
const { log } = require("console");
// join比 + 号更智能 能够识别./和../
// 所以在拼接字符串遇到./时，join会无视.而 + 号会把.也拼接进去而导致路径错误
// 所以在遇到../时，join会返回上一级目录，而 + 号会把..也拼接进去
fs.readFile(
  path.join(__dirname, "./files/成绩-ok.txt"),
  "utf8",
  function (err, dataStr) {
    if (err) {
      return console.log("文件读取失败！" + err.message);
    }
    console.log(dataStr);
  }
);
