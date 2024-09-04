function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function foo() {
  console.log(Date.now());
  await sleep(1000);
  console.log(Date.now());
}

foo();
