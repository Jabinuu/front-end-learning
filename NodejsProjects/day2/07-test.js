const m1 = require('./06-m1');
// 这里的路径不会出现fs模块的路径问题，换言之，只有fs模块会出现路径问题
// require方法里的模块路径的文件名是可以不写扩展名的
console.log(m1);