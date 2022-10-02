<template>
  <div class="movie-container">
    <h3>Movie 组件---{{ $route.params.id }}---{{ id }}</h3>
    <button @click="showThis">打印this</button>
    <button @click="gotoFulian">push导航跳转至复联</button>
    <button @click="gotoFulian2">replace导航跳转至复联</button>
    <!-- back()和forward()分别是后退一步，前进一步 -->
    <button @click="$router.back()">后退</button>
    <button @click="$router.forward()">前进</button>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    id: {
      type: String,
      default: 0,
    },
  },
  methods: {
    showThis() {
      console.log(this);
    },
    // 以下是编程式导航。即不通过点击a或router-link链接实现导航（声明式导航）的一种方式
    gotoFulian() {
      this.$router.push("/movie/2"); // push是会产生新的历史记录的
    },
    gotoFulian2() {
      this.$router.replace("/movie/2"); //replace不会产生新的记录，而是替换原先的网页
    },
  },
};
</script>

<style lang="less" scoped>
.movie-container {
  min-height: 200px;
  background-color: lightsalmon;
  padding: 15px;
}
</style>
