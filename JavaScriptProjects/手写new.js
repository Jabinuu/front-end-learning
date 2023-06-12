function newObj(constructor, args) {
  const res = Object.create(constructor.prototype);
  res.constructor = constructor;
  const tmp = constructor.apply(res, args);
  if (tmp !== null && (typeof tmp === "object" || typeof tmp === "function")) {
    res = tmp;
  }
  return res;
}

const obj = newObj(Person, ["zhangqing", 23]);
console.log(obj);

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const arr = new Person("jiabin", 23);
console.log(arr);
