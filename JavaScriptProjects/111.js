Promise.myAll = function (promises) {
  const result = Array(promises.length);
  let cnt = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      if (item.then && typeof item.then === "function") {
        item.then((res) => {
          result[index] = res;
          if (++cnt === promises.length) {
            resolve(result);
          }
        }, reject);
      } else {
        result[index] = item;
        if (++cnt === promises.length) {
          resolve(result);
        }
      }
    });
  });
};

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      if (item.then && typeof item.then === "function") {
        item.then((res) => {
          resolve(res);
        }, reject);
      } else {
        resolve(item);
      }
    });
  });
};

const p1 = 1;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3);
  }, 2000);
});

Promise.myAll([p1, p2, p3]).then((res) => {
  console.log(res);
});
