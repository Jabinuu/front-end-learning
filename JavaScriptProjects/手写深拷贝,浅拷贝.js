function shallowCopy(source) {
  if (typeof source !== "object" && typeof source !== "function") {
    return source;
  }
  const res = {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      res[key] = source[key];
    }
  }
  return res;
}

// 用一个WeakMap防止出现因循环引用导致的无限递归栈溢出，map中以要拷贝的数据为键，以拷贝结果为值，只会在出现循环引用时，才此值为返回值。
// 用弱映射比映射好，因为当键没有被任何变量引用时，会被垃圾回收程序及时清除，不会驻留内存
function deepCopy(source, map = new WeakMap()) {
  if (typeof source !== "object" && typeof source !== "function") {
    return source;
  }
  const res = Array.isArray(source) ? [] : {};
  if (map.has(source)) {
    return map.get(source);
  }
  map.set(source, res);
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      res[key] = deepCopy(source[key], map);
    }
  }
  return res;
}

// 测试
const person = {
  name: "jiabin",
  age: 23,
  friends: ["doubao", "zhangqing", "bingbing"],
  job: {
    corporation: "bytedance",
    level: 13,
    salary: "￥22000",
  },
};
person.person = person; // 如果对象中有循环引用，那么递归版本的深拷贝会无限递归，进而爆栈
person.__proto__.sex = "male";

const shalloCopying = shallowCopy(person);
const deepCopying = deepCopy(person);
console.log(deepCopying);
console.log(
  deepCopying.friends === person.friends,
  shalloCopying.friends === person.friends
);
console.log(deepCopying.job === person.job, shalloCopying.job === person.job);
