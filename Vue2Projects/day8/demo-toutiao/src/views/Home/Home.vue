<template>
  <div class="home-container">
    <!-- <van-nav-bar title="黑马头条" :fixed="true" /> -->
    <!-- 如果属性的值类型是Boolean如果需要把他变成true的话，只需要把这个属性甩上去即可 -->
    <van-nav-bar title="黑马头条" fixed />
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>xxx</h1>
    <h1>zzz</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang='less' scoped>
.home-container {
  padding: 46px 0 50px;
}
.van-nav-bar {
  background-color: #007bff;
}

// 样式穿透。用于修改被scoped控制的元素的子元素。
// 因为只有该组件的tmeplate里的元素会被标上scoped标记类号，他的子元素是没有的，而直接写选择器默认是 .vant[v-data-001] {} 这是交集选择器，那么子元素当然无法没选中。
// 而加上/deep/ 后选择器就成为了[v-data-001] .vant{} 这是后代选择器，就能选中到子元素了
/deep/ .van-nav-bar__title {
  color: #fff;
}
</style>