function myCall(obj, ...args) {
  obj.fn = this;
  const res = obj.fn(...args);
  delete obj.fn;
  return res;
}

function myApply(obj, args) {
  return this.myCall(obj, ...args);
}

function myBind(obj, ...args) {
  const bindFn = this;
  return () => bindFn.myApply(obj, args);
}

function fn(a, b) {
  this.a = a;
  this.b = b;
  return a + b;
}

const obj = {};
fn.__proto__.myCall = myCall;
fn.__proto__.myApply = myApply;
fn.__proto__.myBind = myBind;
let p = fn.myCall(obj, "jiabin", 23);
console.log(p, obj);

let p1 = fn.myApply(obj, ["bingbing", 23]);
console.log(p1, obj);

const bind = fn.myBind(obj, "doubao", 23);
let p2 = bind();
console.log(p2, obj);
