function quickSort(arr) {
  if (arr <= 1) {
    return arr;
  }
  const pivot = arr.pop();
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([1, 34, 2, 34, 2, 35, 5, 76, 98, 67, 34]));
