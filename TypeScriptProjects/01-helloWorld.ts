export { }
console.log('hello Ts');
let a: number = 111;     //显式声明变量类型 并设初始值
let b: string = 'koanom';
let aa = 12;             //不显示声明类型，ts会根据初始值的类型进行类型检测
function sum(a: number, b: number): number {    // 返回值也是number
  return a + b;
}

let res = sum(a, aa)
console.log(res);

