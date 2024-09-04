// 完全随机的洗牌算法，原地随机
function shuffle(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const r = Math.random();
    const random = Math.floor(r * (i + 1));
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
  return arr;
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
