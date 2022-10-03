<template>
  <div class="app-container">
    <router-view> </router-view>
    <van-tabbar route>
      <van-tabbar-item replace icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item replace icon="user-o" to="/user">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>