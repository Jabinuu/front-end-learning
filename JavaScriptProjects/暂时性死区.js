let tt = 1;
function fn(){
  // 报错。原因是，js引擎在解析代码时，也会注意到块中后面部分的let、const声明，
  // 如果声明的有let、const变量，那么在变量被声明之前不能以任何方式访问这个变量
  // （即便作用域链的上级有声明同名变量）。let、const变量被声明前的程序执行时间
  // 段 被称为“暂时性死区”
  console.log(tt);  
  let tt = 2
}
fn()