<template>
  <div class="app-container">
    <h1>App2 组件</h1>

    <!-- <a href="#/home">首页</a>
    <a href="#/movie">电影</a>
    <a href="#/about">关于</a> -->

    <!--当你有了Vue Router时，使用router-link代替a标签是一个专业的写法 -->
    <!-- 同样，这里的hash地址的#是不需要写的，运行时Vue Router会自动补上 -->
    <router-link to="/home">首页</router-link>

    <!-- this.$route.params.XX 是路径参数 
         this.$route.query.XX 是查询字符串的参数-->
    <router-link to="/movie/1?name=zs&age=20">雷神</router-link>
    <router-link to="/movie/2">复联</router-link>
    <router-link to="/movie/3">蚁人</router-link>
    <router-link to="/about">关于</router-link>

    <hr />

    <!-- router-view是占位符，给经router路由模块选择到的组件使用 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
