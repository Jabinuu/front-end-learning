function myNew(constructor, ...args) {
  // const res = {};
  // res.__proto__ = constructor.prototype;
  // 2-3 等价于
  const res = Object.create(constructor.prototype);
  const tmp = constructor.apply(res, args);
  if (tmp !== null && (typeof tmp === "object" || typeof tmp === "function")) {
    return tmp;
  }
  return res;
}

const obj = newObj(Person, "zhangqing", 23);
console.log(obj);

function Person(name, age) {
  this.name = name;
  this.age = age;
}
