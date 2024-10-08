const cityData = [
  {
    id: "axzx",
    name: "广东省",
    children: [
      {
        id: "sdsd",
        name: "深圳市",
        children: [
          {
            id: "45dss",
            name: "南山区",
          },
          {
            id: "sdsd11",
            name: "福田区",
            children: [
              {
                id: "ddrr2",
                name: "A街道",
              },
            ],
          },
        ],
      },
      {
        id: "2323d",
        name: "东莞市",
        children: [
          {
            id: "xxs2",
            name: "A区",
          },
          {
            id: "kklio2",
            name: "B区",
          },
        ],
      },
    ],
  },
];

function fn(id) {
  let res = [];
  let isFound = false;
  function backTracking(root) {
    if (isFound) return;

    res.push(root.name);
    if (root.id === id) {
      isFound = true;
      return;
    }
    if (root.children) {
      for (let i = 0; i < root.children.length; i++) {
        backTracking(root.children[i]);
        if (!isFound) res.pop();
      }
    }
  }

  backTracking(cityData[0]);

  return res.join("");
}

console.log(fn("ddrr2"));
