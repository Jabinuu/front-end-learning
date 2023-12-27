const CONSTANT = {
  pending: "pending",
  resolve: "resolved",
  reject: "rejected",
};

class MyPromise {
  #state = CONSTANT.pending;
  #result = null;
  #handlers = [];

  constructor(exec) {
    const resolve = (res) => this.#changeState(res, CONSTANT.resolve);
    const reject = (reason) => this.#changeState(reason, CONSTANT.reject);
    exec(resolve, reject);
  }

  #changeState(value, state) {
    if (this.#state !== CONSTANT.pending) return;
    this.#state = state;
    this.#result = value;
    this.#run();
  }

  #runOne(cb, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof cb !== "function") {
        const settle = this.#state === CONSTANT.resolve ? resolve : reject;
        settle(this.#result);
      } else {
        try {
          const data = cb(this.#result);
          if (this.#isPromiseLike(data)) {
            data.then(resolve, reject);
          } else resolve(data);
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  #runMicroTask(task) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(task);
    } else if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(task);
      const node = document.createTextNode("1");
      observer.observe(node, {
        characterData: true,
      });
      node.textContent = "2";
    } else {
      setTimeout(task, 0);
    }
  }

  // 取出handlers里的东西一一执行
  #run() {
    if (this.#state === CONSTANT.pending) return;
    while (this.#handlers.length) {
      const { onRejected, onResolved, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === CONSTANT.resolve) {
        this.#runOne(onResolved, resolve, reject);
      } else if (this.#state === CONSTANT.reject) {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  #isPromiseLike(val) {
    if (val.then && typeof val.then === "function") return true;
    return false;
  }

  then(onResolved, onRejected) {
    return MyPromise((resolve, reject) => {
      this.#handlers.push({
        onRejected,
        onResolved,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  // 全部解决则返回一个解决的promise，值为按原顺序排列的解决值数组
  // 有一个拒绝则返回拒绝的promise，值为拒绝理由
  static all(promises) {
    const result = [];
    let cnt = 0;
    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    const resolveOne = (data, index) => {
      result[index] = data;
      if (++cnt === promises.length) {
        _resolve(result[index]);
      }
    };
    promises.forEach((item, index) => {
      if (!p.#isPromiseLike(item)) {
        resolveOne(item, index);
      } else {
        item.then((res) => resolveOne(res, index), _reject);
      }
    });
    return p;
  }

  // 返回第一个落定状态的promise
  static race(promises) {
    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    promises.forEach((item) => {
      if (!p.#isPromiseLike(item)) {
        _resolve(item);
      } else {
        item.then(_resolve, _reject);
      }
    });
    return p;
  }
}

const pp = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
  // reject(222);
});

pp.then();
