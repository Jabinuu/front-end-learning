Function.prototype.myCall = function (context) {
  context = context || globalThis;
  const args = [...arguments].slice(1);
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.myApply = function (context) {
  context = context || globalThis;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(arguments[1]);
  } else {
    result = context.fn();
  }
  return result;
};

// Function.prototype.myBind = function (context) {
//   context = context || globalThis;
//   const self = this;
//   const args = Array.from(arguments).slice(1);
//   return function F() {
//     if (this instanceof F) {
//       return new self(...args, ...arguments);
//     } else {
//       self.apply(context, args.concat(arguments));
//     }
//   };
// };

Function.prototype.myBind = function (context) {
  const args = Array.from(arguments).slice(1);
  context = context || globalThis;
  const self = this;
  return function F() {
    if (this instanceof F) {
      return new F(...args, ...arguments);
    } else {
      self.apply(context, args.concat(arguments));
    }
  };
};

function fn(a, b) {
  this.a = a;
  this.b = b;
  return a + b;
}

const obj = {};
let p = fn.myCall(obj, "jiabin", 23);
console.log(p, obj);

let p1 = fn.myApply(obj, ["bingbing", 23]);
console.log(p1, obj);

const bind = fn.myBind(obj, "doubao", 23);
let p2 = bind();
console.log(p2, obj);

function Fac(x, y) {
  this.x = x;
  this.y = y;
}
const AXisY = Fac.myBind(null, 0);
const obj1 = new AXisY(5);
console.log(obj1 instanceof Fac);
console.log(new Fac(1, 2));
