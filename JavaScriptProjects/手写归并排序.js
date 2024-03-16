function mergeSort(nums) {
  if (nums.length === 1) {
    return nums;
  }
  const mid = nums.length >> 1;
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

// 讲两部分有序数组进行合并
function merge(left, right) {
  let leftIndex = 0,
    rightIndex = 0;
  const res = [];
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      res.push(left[leftIndex]);
      leftIndex++;
    } else {
      res.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return res.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
console.log(mergeSort([3, 4, 7, 2, 1, 4, 43, 7, 23, 64, 34, 6, 24, 67, 3]));
