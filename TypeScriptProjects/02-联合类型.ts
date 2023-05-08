let a: 10;   //这样写a的值就定死了，不能修改，即便是同类型也不行

let b: 10 | 'jiabin';   // 联合类型，b可以取10或‘jiabin’ 这两个特定的值

let c: number | string;   // 联合类型，变量c只能取数字类型或字符串类型

let d: any;   //any表示任意类型，相当于不给这个变量做约束了. 用any类型复制给其他变量也会导致其他变量变成any！！！！
let e;        //如果啥不写，默认是any，一定要避免这两种写法！！尽量不用

let f: unknown;   // unknown也表示任意类型，但是它不祸害别人，用它赋值给其他变量，编译器会报错阻止
f = 10; f = 'jiabin';
// c = f; 报错，因为unknown直接赋值给string|number类型
c = f as string;   // 类型断言，认定unknown是个字符串，然后再赋值，从而不报错
c = <string>f;     // 跟上面等价，也是类型断言
c = 'jiabin';
c = 'jia';