var o = (function () {
  var obj = {
    a: 1,
    b: 2
  };
  return {
    get: function (x) {
      return obj[x]
    }
  }
})();

// Q：在不改变以上代码前提下，修改 obj 对象
Object.defineProperty(Object.prototype, 'abc', {
  get() {
    return this;
  }
})
var obj2 = o.get('abc')
obj2.a = 'aasaaffa';
obj2.c = 3;
console.log(o.get('a'));

