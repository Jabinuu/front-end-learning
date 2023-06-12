const CONSTANT = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
};

class MyPromise {
  #state = CONSTANT.PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(CONSTANT.FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(CONSTANT.REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally();
        return data;
      },
      (data) => {
        onFinally();
        return data;
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    if (p.#isPromiseLike(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }
    return p;
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    let count = 0;
    const resArray = [];
    const processArrayElem = (value, index) => {
      resArray[index] = value;
      if (++count === promises.length) {
        _resolve(resArray);
      }
    };
    promises.forEach((elem, index) => {
      if (!p.#isPromiseLike(elem)) {
        processArrayElem(elem, index);
      } else {
        elem.then((res) => processArrayElem(res, index), _reject);
      }
    });
    return p;
  }

  static race(promises) {
    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    promises.forEach((elem) => {
      if (p.#isPromiseLike(elem)) {
        if (elem.#state === CONSTANT.PENDING) {
          elem.then(_resolve, _reject);
        } else {
          elem.#state === CONSTANT.FULFILLED
            ? _resolve(elem.#result)
            : _reject(elem.#result);
        }
      } else {
        _resolve(elem);
      }
    });
    return p;
  }

  #changeState(state, value) {
    if (this.#state !== CONSTANT.PENDING) return;
    this.#state = state;
    this.#result = value;
    this.#run();
  }

  #run() {
    if (this.#state === CONSTANT.PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === CONSTANT.FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === CONSTANT.FULFILLED ? resolve : reject;
        settled(this.#result);
      } else {
        try {
          const data = callback(this.#result);
          if (this.#isPromiseLike(data)) {
            data.then(resolve, reject);
          } else {
            resolve(data);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  #isPromiseLike(data) {
    if (
      data !== null &&
      (typeof data === "object" || typeof data === "function")
    ) {
      return typeof data.then === "function";
    }
    return false;
  }

  #runMicroTask(func) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(func);
    } else if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode("1");
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.textContent = "2";
    } else {
      setTimeout(func, 0);
    }
  }
}

// setTimeout(() => console.log(12344444), 0);
const p = new MyPromise((resolve, reject) => {
  // resolve("解决了");
  // setTimeout(() => resolve("解决值"), 1000);
  setTimeout(() => reject("拒绝原因"), 1000);
});

// p.then(
//   (data) => console.log(data),
//   (reason) => console.log(xxx)
// );

// p.catch((res) => 222).then((res) => console.log(res));

// p.finally((res) => {
//   throw 555;
// }).catch((res) => console.log(res));

// MyPromise.resolve(p).then((res) => console.log(res));

const p1 = new MyPromise((resolve, reject) => {
  resolve("解决了1");
  // setTimeout(() => resolve("解决值1"), 3000);
  // setTimeout(() => reject("拒绝原因"), 1000);
});
const p2 = new MyPromise((resolve, reject) => {
  // resolve("解决了2");
  setTimeout(() => {
    resolve("解决值2");
    console.log("999");
  }, 2000);
  // setTimeout(() => reject("拒绝原因"), 1000);
});
const p3 = new MyPromise((resolve, reject) => {
  // resolve("解决了3");
  setTimeout(() => reject("解决值3"), 500);
  // reject("111222");
  // setTimeout(() => reject("拒绝原因"), 1000);
});
p1.then(2).then((res) => console.log(res));
// const promises = [p1, p2, p3];
// MyPromise.race([p1, 2]).then(
//   (res) => console.log(res),
//   (res) => console.log(res)
// );
console.log(p);
