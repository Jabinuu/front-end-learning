// 对于频繁触发的事件，每隔一个internal才响应一次
function throttle(fn, internal) {
  const last = 0;
  return function () {
    const now = Date.now();
    if (now - last >= internal) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}

// 对于频繁触发的事件，在当前触发之后一个delay之后才响应一次
// 优化饥饿现象
function debounce(fn, delay) {
  let timer = null,
    last = 0;
  return function () {
    const now = Date.now();
    if (now - last < delay) {
      if (timer) {
        clearTimeout(timer);
      }
      setTimeout(() => {
        fn.apply(this, arguments);
        last = now;
      }, delay);
    } else {
      fn.apply(this, arguments);
      last = now;
    }
  };
}
