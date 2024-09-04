function HardMan(name) {
  let jobQueue = [],
    after = 0;

  jobQueue.push(() => {
    console.log(`I am ${name}`);
    after = 0;
    next();
  });

  Promise.resolve().then(next);

  function next() {
    const fn = jobQueue.shift();
    fn && fn();
  }

  // 返回一个任务，这个任务能够使得在n秒后执行任务队列的任务
  // 也就是说，通过定时器来控制next的执行时机
  function sleep(second) {
    return () => {
      setTimeout(() => {
        after += second;
        console.log(`start learning after ${after}s `);
        after = 0;
        next();
      }, second * 1000);
    };
  }

  return {
    rest(second) {
      jobQueue.push(sleep(second));
      return this;
    },
    restFirst(second) {
      jobQueue.unshift(sleep(second));
      return this;
    },
    learn(task) {
      jobQueue.push(() => {
        console.log(`learning ${task}`);
        after = 0;
        next();
      });
      return this;
    },
  };
}

// 问题分析，case是同步调用，因此肯定不能直接执行调用的函数，而是每调用一个函数
// 都将其加入到任务队列里，而不是直接执行，否则无法实现sleep的效果。
// 通过微任务来等待同步任务执行完毕后，再逐个执行任务队列中的任务（通过next来调用）
// rest的原理是，像任务队列里加一个函数，这个函数会开启一个定时器，在定时器到期后才执行next执行后面的任务
// restFirst就是优先级比较高，将其放到任务队列队首而已

// HardMan("lilei");
//> i'm lilei
HardMan("lilei").rest(10).learn("ennglish");
//> i'm lilei
// 等待10秒
//> start learning after 10s
//> learning chinese
HardMan("jiabin").restFirst(5).learn("chinese");
// 等待5s
//> start learning after 5s
//> i'm lilei
//> learning chinese
