// 拒绝硬编码
const CONSTANT = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
// 手写Promise
class MyPromise {
  #state = "pending";
  #result = undefined;
  #handlers = []; // 因为可以调用多次then，所以应是数组，存放各个then的回调

  // 构造函数：参数传入一个Promise异步任务
  constructor(executor) {
    // 箭头函数的this指向？
    // 答：箭头函数的this在定义时就确定了，其this的指向是其父级程序的this指向，若没有父级程序或父级程序没有this指向，在非严格模式下指向window
    const resolve = (data) => {
      this.#changeState(CONSTANT.FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(CONSTANT.REJECTED, reason);
    };
    // 如果执行函数抛出异常，则需要更改Promise状态为rejected
    try {
      // 同步代码只能捕获同步异常，无法捕获异步错误，所以，异步报错不会影响promise的状态！
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
      // Promise执行器函数是同步函数时，执行这里的#run，因为在执行then之前状态就已经改变了
      this.#run();
    });
  }

  // 改变promise的状态
  #changeState(state, result) {
    // Promise对象状态一经更改，便不会再改变
    if (this.#state !== CONSTANT.PENDING) return;
    this.#state = state;
    this.#result = result;
    // Promise执行器函数是异步函数时，执行这里的#run
    this.#run();
  }

  // 调用then的回调，以及then的promise返回值
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

  #runOne(cb, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof cb === "function") {
        try {
          const data = cb(this.#result);
          if (this.#isPromiseLike(data)) {
            data.then(resolve, reject);
          } else {
            resolve(data);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        const settled = this.#state === CONSTANT.FULFILLED ? resolve : reject;
        settled(this.#result);
      }
    });
  }

  #isPromiseLike(value) {
    return false;
  }

  #runMicroTask(func) {
    setTimeout(func, 0);
  }
}

const p = new MyPromise((resolve, reject) => {
  // resolve(1);
  // reject(2);
  // throw 123;
  setTimeout(() => {
    resolve(1999);
    // reject("xxx");
  }, 1000);
  // 异步错误不会引起promise状态改变！
  // setTimeout(() => {
  //   throw 123;
  // }, 0);
});
p.then(
  (res) => {
    return new MyPromise((resolve, reject) => resolve(5647));
  },
  (err) => {
    console.log(err);
    return "qqq";
  }
).then((res) => console.log(111222));
console.log(p);
