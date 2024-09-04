// 一个延迟执行的柯里化函数
function add() {
  let args = Array.prototype.slice.call(arguments);

  function inner() {
    args.push(...arguments);
    return inner;
  }

  inner.toString = function () {
    return args.reduce((pre, cur) => pre + cur);
  };
  return inner;
}

console.log(+add(1)(2)(3));
console.log(+add(1, 2)(3));
console.log(+add(1)(2, 3)(4)(5));

// 一个可以实现参数复用的柯里化函数
function uri(protocal) {
  return function (hostname, pathname) {
    return `${protocal}${hostname}${pathname}`;
  };
}
const curringUri = uri("http://");

console.log(curringUri("www.baidu.com", "/dir"));
console.log(curringUri("www.taobao.com", "/dir"));
console.log(curringUri("www.tencent.com", "/dir"));

// 一个 提前确认/提前返回的柯里化函数
const watchEvent = (function () {
  if (window.addEventListener) {
    return function (element, type, listener, useCatpture) {
      element.addEventListener(
        type,
        function (e) {
          listener.call(element, e);
        },
        useCatpture
      );
    };
  } else if (window.attachEvent) {
    return function (element, type, listener) {
      element.attachEvent("on" + type, function (e) {
        listener.call(element, e);
      });
    };
  }
})();
