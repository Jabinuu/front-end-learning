// exports的作用就是共享成员，挂载在export里的数据是可以跨越模块作用域而被require所捕获的，即暴露出去了
module.exports.uname = 'jiabin';
module.exports.sex = 'male';
module.exports.setAge = function () {
    console.log('123');
}
// 为了方便，module.exports和exports是等价的哟
exports.age = 20;
console.log(exports === module.exports);   //结果为true，说明他们指向的对象（堆地址）是同一个

// 看这个，因为没有挂载到exports上，所以因为模块作用域而不会暴露在外面
hobby = 'baseball';

const uu = 'sss';
function fn() {
    console.log('ss');
}
// 如果直接赋值module.exports以对象，那么会改变module.exports的默认指向，而指向了另一个对象所在的内存块
module.exports = { uu, fn }
// 但如果是直接赋值exports以对象 则不生效，理由在下一句注释
exports = { ss: '123' }

// 时刻谨记，require()对象时，返回的永远一定是module.exports而不是exports
