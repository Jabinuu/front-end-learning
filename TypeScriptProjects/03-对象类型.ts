export { }
let obj: object;   // 这种方式不常用，没什么约束

let b: { name: string, age?: number };   // 指定有且仅有这两个属性，?是可选的意思

let c: { name: string, [prppName: string]: any }  //指定必须有的属性，但是可添加其他属性

let d: (a: number, b: number) => number;     // 声明函数，指明参数类型 数量和返回值类型
d = function (a: number, b: number): number {
  return a + b
}

let e: string[];   // 1. 指明字符串数组
let f: Array<number>  // 2. 指明数字类型的数组，两种方式

// 元组：就是固定长度的数组，效率比数组高
let h: [string, number];
h = ['jia', 1];

// 枚举enum
enum Gender {
  Male = 0,
  Female = 1
}
let i: { name: string, gender: Gender };    // 用枚举对象代替 0|1
i = {
  name: 'jiain',
  gender: Gender.Male    // 用枚举可以代替直接写0、1，更语义化
}


// & 表示既是 又是
let j: { name: string } & { age: number }  // 常用于合并对象
j = { name: 'jiabin', age: 18 };

// 自定义类型的别名
type myType = 1 | 2 | 3 | 4 | 5;
// let k = 1 | 2 | 3 | 4 | 5;   // 对于一个比较长的类型，复用性很差，用类型别名实现复用性
// let l = 1 | 2 | 3 | 4 | 5;
let k: myType = 2;    // 简介多了
let l: myType = 3;
