// 递归法
function flaten(nums) {
  let res = [];
  nums.forEach((item) => {
    if (Array.isArray(item)) {
      res = res.concat(flaten(item));
    } else {
      res.push(item);
    }
  });
  return res;
}

// 迭代法
function flaten1(nums) {
  const res = [];
  stack = [...nums];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.unshift(next);
    }
  }
  return res;
}

console.log(flaten1([1, 2, 3, ["a", "b", "c", [4, 5]], 6, 7]));
