// 参考资料：https://juejin.cn/post/7080131411503972366?searchId=202409072122518B60BBE8A57CFB569EF7#heading-3

// 1. 属性命名为_开头，比如_name,_age
//    历史比较悠久，包括vue在内的许多第三方包都用的这种方式，但这并不是强约束

// 2. 用闭包来实现
function Dog(name, ageVal) {
  this.name = name;
  let age = ageVal;

  this.getAge = function () {
    return age;
  };

  this.hello = function () {
    return `I am ${this.name} and ${age} years old.`;
  };
}

let dog = new Dog("qiqi", 2);
console.log(dog.hello()); //I am qiqi and 2 years old.
console.log(dog.name); // qiqi
console.log(dog.age); // undefined

// 3. 用Symbol来实现
function Dog1(name, ageVal) {
  const ageSymbol = Symbol("age");
  this.name = name;
  this[ageSymbol] = ageVal;

  this.getAge = function () {
    return this[ageSymbol];
  };

  this.hello = function () {
    return `I am ${this.name} and ${this[ageSymbol]} years old.`;
  };
}

const dog1 = new Dog1("baba", 2);
console.log(dog1.hello()); //I am baba and 2 years old.
console.log(dog1.name); // baba
console.log(dog1.age); // undefined
console.log(Object.keys(dog1)); // [ 'name', 'getAge', 'hello' ] keys()拿不到符号属性，符合预期
console.log(dog1[Object.getOwnPropertySymbols(dog1)[0]]); // 2 符号属性可以由getOwnPropertySymbols获取，这里是个缺陷

// 4. WeakMap 实现，也是Babel把#propName编译为es5的实现方式
function Dog2(nameVal, ageVal) {
  const age = new WeakMap();
  const name = new WeakMap();

  name.set(this, nameVal);
  age.set(this, ageVal);

  this.hello = function () {
    return `I am ${name.get(this)} and ${age.get(this)} years old.`;
  };
}

const dog2 = new Dog2("jiujiu", 3);
console.log(dog2.hello()); //I am baba and 2 years old.
console.log(dog2.name); // baba
console.log(dog2.age); // undefined

//  5. #propName
class Dog3 {
  #name = "shishi";
  #age = 3;

  constructor() {}

  hello() {
    return `I am ${this.#name} and ${this.#age} years old.`;
  }
}

const dog3 = new Dog3();
console.log(dog3.hello());
console.log(dog3.name);

// 6. ts虽然也有private但那只是静态下的约束，运行时还是能访问到的，而上面我们实现的是真正运行时的私有属性
