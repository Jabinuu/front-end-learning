function instanceOf(obj, target) {
  let temp = obj.__proto__;
  while (temp !== null) {
    if (temp.constructor === target) {
      return true;
    }
    temp = temp.__proto__;
  }
  return false;
}

// 测试
class Car {}
class Animal {
  constructor() {}
}
class Person extends Animal {
  constructor(name, age) {
    super(); // 必须在派生类的构造函数中首先调用父类的构造函数，返回的实例赋值给this，否则this指向错误
    this.name = name;
    this.age = age;
  }
}
const p = new Person("jiabin", 23);
console.log(instanceOf(p, null));
