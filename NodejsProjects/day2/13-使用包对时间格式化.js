// 注意：导入的名称就是装包的时候这个包的名称，不管他在哪个目录下，直接写包的名字就好了
const moment = require('moment')

console.log(moment().format('YYYY-MM-DD hh:mm:ss'));
