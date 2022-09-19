<template>
  <div class="test-container">
    <h2>Test组件</h2>
    <p id="msg">当前一共有{{ books.length }}本书</p>
    <p>message的值是：{{ msg }}</p>
    <button @click="msg += '~'">点击修改msg</button>
  </div>
</template>

<script>
export default {
  props: {
    init: {
      default: 2,
      required: false,
      type: Number,
    },
  },
  data() {
    return {
      msg: "welcome!",
      books: [],
    };
  },
  methods: {
    show() {
      console.log("这是show函数");
    },
    initBookList() {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        const res = JSON.parse(xhr.responseText);
        this.books = res.data;
        console.log(res);
      });
      xhr.open("GET", "http://www.liulongbin.top:3006/api/getbooks");
      xhr.send();
    },
  },
  beforeCreate() {
    // 此时组件实例尚未被创建，props，data，methods都不可用
    // console.log(this.init);
    // console.log(this.show);
    // console.log(this.data);
  },
  created() {
    // 组件实例已被创建时，会触发该函数，此时props，data，methods都可用，这里常用ajax进行数据请求。但是template模板尚未生成，不能操作DOM元素
    console.log(this.init);
    this.initBookList();
    const dom = document.querySelector("#msg");
    console.log(dom);
  },
  beforeMount() {
    // 当vue-template-compiler将模板编译并存放在内存中时，触发该函数。注意此时html结构仍在内存中，并没有渲染到浏览器，所以dom元素也是不存在的
    const dom = document.querySelector("#msg");
    console.log(dom);
  },
  mounted() {
    // 当把内存中html结构渲染到浏览器中后，触发该函数，此时浏览器才有了DOM元素
    const dom = document.querySelector("#msg");
    console.log(dom);
    console.log(this.$el);
  },
  beforeUpdate() {
    // 当数据变化后，在把最新数据渲染到DOM元素之前，会触发该函数
  },
  updated() {
    // 当数据变化后，且已经把最新数据渲染到DOM元素里，会触发该函数。为了能够
    // 操作到最新的DOM元素，必须要把代码写在updated生命周期函数里
  },
};
</script>

<style lang="less" scoped>
.test-container {
  height: 200px;
  background-color: pink;
}
</style>