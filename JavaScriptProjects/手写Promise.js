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

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // 不过promise的结果如何，只要落定了，就要执行onFinally
  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally();
        return data;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }

  static resolve(data) {
    if (data instanceof MyPromise) return data;
    let _resolve, _reject;
    // // 静态成员访问不到实例成员，所以要new一个实例出来，调用实例方法
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    if (p.#isPromiseLike(data)) {
      data.then(_resolve, _reject);
    } else {
      _resolve(data);
    }
    return p;
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  // 改变promise的状态
  #changeState(state, result) {
    // Promise对象状态一经更改，便不会再改变
    if (this.#state !== CONSTANT.PENDING) return; // 卫语句
    this.#state = state;
    this.#result = result;
    // Promise执行器函数是异步函数时，执行这里的#run生效
    this.#run();
  }

  // 调用then的回调，以及then的promise返回值
  #run() {
    if (this.#state === CONSTANT.PENDING) return; // 卫语句：将提前结束的else分支提前写，这样能少代码量和if嵌套层数，代码清爽易读
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

  // 判断是否是promise对象
  #isPromiseLike(value) {
    // 根据Promise/A+ 规范，只要含有then方法的变量都是Promise，因此自定义Promise便和官方Promise有了互操性
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function";
    }
    return false;
  }

  // 将任务放到微队列里。分环境，是浏览器的事件循环还是node的事件循环
  #runMicroTask(func) {
    // 如果有process对象，则是node环境
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(func); // node环境中，nextTick()充当微队列的作用
    }
    // 如果有MutationObserver 且是一个函数，那么就是在浏览器环境下
    else if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(func); // new一个观察者对象，是用来观察DOM元素变化的，一旦变化则将回调函数扔到微队列中
      const textNode = document.createTextNode("1"); // 创建一个DOM元素
      // 调用观察者对象的observe方法，启动对上述元素的观察
      observer.observe(textNode, {
        characterData: true, // 打开观察字符变化的选项
      });
      textNode.textContent = "2"; // 手动改变DOM元素，触发观察者把回调函数扔到微队列中
    } else {
      // 如果脱离了环境，就没有了环境提供的微队列api，就只能这样了模拟了，事件循环是环境能力而不是语言能力！
      setTimeout(func, 0);
    }
  }
}

// setTimeout(() => console.log(999877), 0);

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
// p.then(
//   (res) => {
//     return new Promise((resolve, reject) => resolve(5647));
//     // return 123;
//   },
//   (err) => {
//     console.log(err);
//     return "qqq";
//   }
// ).then((res) => console.log(111222));

// p.catch((error) => {
//   console.log(error);
// });

// p.finally(() => console.log("finally")).then(
//   (res) => console.log(res),
//   (err) => console.log(err)
// );

MyPromise.resolve(Promise.resolve(888)).then((res) => console.log(res));
// MyPromise.reject("aiya").catch((res) => console.log(res));
console.log(p);
