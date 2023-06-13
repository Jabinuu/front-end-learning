function myCreate(prototype, propertiesDesc) {
  if (typeof prototype !== "object" && typeof prototype !== "function") {
    throw "error";
  }
  const res = new Object();
  res.__proto__ = prototype;
  if (propertiesDesc) {
    Object.defineProperties(res, propertiesDesc);
  }
  return res;
}

// 测试
Object.prototype.myCreate = myCreate;
const obj = Object.myCreate(null, {
  name: {
    configurable: true,
    enumerable: true,
    value: "jiabin",
    writable: true,
  },
  age: {
    configurable: true,
    enumerable: true,
    value: 23,
    writable: true,
  },
});
console.log(obj);
