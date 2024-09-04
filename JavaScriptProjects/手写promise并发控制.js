class SpuerTask {
  constructor() {
    this.jobQueue = [];
    this.maxSize = 2; //最大并发数量
    this.runnigCount = 0; //当前正在执行的任务数量
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.jobQueue.push({
        task,
        resolve,
        reject,
      });
      this._run();
    });
  }

  // 模拟叫号的动作，初始化排队的时候执行，然后是任务完成时执行
  _run() {
    while (this.runnigCount < this.maxSize && this.jobQueue.length) {
      const { task, reject, resolve } = this.jobQueue.shift();
      this.runnigCount++;
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runnigCount--;
          this._run();
        });
    }
  }
}

const superTask = new SpuerTask();

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10000, 1); // 10s后输出：任务1完成
addTask(5000, 2); // 5s后输出：任务2完成
addTask(3000, 3); // 8s后输出：任务3完成
addTask(4000, 4); // 12s后输出：任务4完成
addTask(5000, 5); // 15s后输出：任务5完成
