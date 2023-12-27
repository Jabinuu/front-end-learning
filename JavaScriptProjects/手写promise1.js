const CONSTANT = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};
class MyPromisee {
  #state = CONSTANT.PENDING;
  #result = null;
  #handlers = [];

  constructor(exec) {
    const resolve = (res) => {
      this.#chagneState(res, CONSTANT.FULLFILLED);
    };
    const reject = (reason) => {
      this.#chagneState(reason, CONSTANT.REJECTED);
    };
    exec(resolve, reject);
  }

  #chagneState(val, state) {
    if (this.#state !== CONSTANT.PENDING) return;
    this.#state = state;
    this.#result = val;
    this.#run();
  }

  #runOne(cb, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof cb !== "function") {
        const settled = this.#state === CONSTANT.FULLFILLED ? resolve : reject;
        settled(this.#result);
      } else {
        try {
          const data = cb(this.#result);
          if (this.#isPromiseLike(data)) data.then(resolve, reject);
          else resolve(data);
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  #run() {
    if (this.#state === CONSTANT.PENDING) return;
    while (this.#handlers.length > 0) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === CONSTANT.FULLFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  #isPromiseLike(val) {
    if (val.then && typeof val.then === "function") return true;
    else return false;
  }

  #runMicroTask(task) {
    if (typeof process == "object" && typeof process.nextTick === "function") {
      process.nextTick(task);
    } else if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(task);
      const textNode = document.createTextNode("1");
      observer.observe(textNode, {
        characterData: true,
      });
      textNode.textContent = "2";
    } else setTimeout(task, 0);
  }

  then(onFulfilled, onRejected) {
    return new MyPromisee((resolve, reject) => {
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
    this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (res) => {
        onFinally();
        return res;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }

  static resolve(data) {
    if (data instanceof MyPromisee) return data;
    let _resolve, _reject;
    const p = new MyPromisee((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    if (p.#isPromiseLike(data)) {
      data.then(_resolve, _reject);
    } else _resolve(data);
    return p;
  }

  static reject(reason) {
    return new MyPromisee((resolve, reject) => {
      reject(reason);
    });
  }

  // 全部解决，则解决，解决值为解决值的数组
  // 没有全部解决，则拒绝，拒绝原因为第一个拒绝的原因
  static all(promises) {
    let _resolve, _reject;
    const p = new MyPromisee((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    let count = 0;
    const results = [];
    const onResolveOne = (data, index) => {
      results[index] = data;
      if (promises.length === ++count) {
        _resolve(results);
      }
    };
    promises.forEach((item, index) => {
      if (!p.#isPromiseLike(item)) onResolveOne(item, index);
      else item.then((res) => onResolveOne(res, index), _reject);
    });

    return p;
  }

  // 谁先落定就先返回谁的落定状态
  static race(promises) {
    let _resolve, _reject;
    const p = new MyPromisee((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    promises.forEach((item) => {
      if (!p.#isPromiseLike(item)) _resolve(item);
      else item.then(_resolve, _reject);
    });
    return p;
  }
}

// const p = new MyPromisee((resolve, reject) => {
//   setTimeout(() => {
//     resolve(888);
//   }, 1000);
// });

// p.then(
//   (res) => console.log(res),
//   () => console.log(1239)
// );
// p.then(
//   () => console.log(2),
//   () => console.log(123)
// );

// MyPromisee.race([
//   MyPromisee.race([]),
//   new MyPromisee((resolve) => {
//     setTimeout(() => {
//       resolve(111);
//     }, 3000);
//   }),
//   new MyPromisee((resolve, reject) => {
//     setTimeout(() => {
//       resolve(222);
//       // reject(333);
//     }, 1000);
//   }),
//   new MyPromisee((resolve, reject) => {
//     setTimeout(() => {
//       // resolve(333);
//       reject(999);
//     }, 2000);
//   }),
//   123,
//   MyPromisee.resolve(666),
// ]).then(
//   (res) => console.log(res),
//   (err) => console.log(err)
// );
