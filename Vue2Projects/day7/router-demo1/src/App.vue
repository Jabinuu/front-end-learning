<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <!-- href的内容就是所谓的hash地址 -->
    <a href="#/home">首页</a>
    <a href="#/movie">电影</a>
    <a href="#/about">关于</a>
    <hr />

    <component :is="comName"></component>
  </div>
</template>

<script>
// 导入组件
import Home from "@/components/Home.vue";
import Movie from "@/components/Movie.vue";
import About from "@/components/About.vue";

export default {
  name: "App",
  // 注册组件
  components: {
    Home,
    Movie,
    About,
  },
  data() {
    return {
      comName: "Home",
    };
  },
  created() {
    // 在app组件创建好后，就开始让windew对象监听hash地址的变化
    window.onhashchange = () => {
      switch (location.hash) {
        case "#/home":
          this.comName = Home;
          break;
        case "#/movie":
          this.comName = Movie;
          break;
        case "#/about":
          this.comName = About;
          break;
      }
    };
  },
};
</script>

<style lang="less" scoped>
.app-container {
  background-color: #efefef;
  overflow: hidden;
  margin: 10px;
  padding: 15px;
  > a {
    margin-right: 10px;
  }
}
</style>
