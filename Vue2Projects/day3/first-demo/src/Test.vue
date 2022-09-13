// tmeplate里写组件
<template>
  <div>
    <h1>这是用户自定义.vue文件---{{ username }}</h1>
    <h2>ssss</h2>
  </div>
</template>

// script写操作组件的代码
<script>
export default {
  // 默认导出，固定写法
  // 注意：.vue组件里的data不能像之前那样，给data赋值对象
  //   .vue里data应该是一个函数，return一个数据源对象
  data() {
    return {
      username: "jiabin",
    };
  },
  methods: {},
  watch: {},
  computed: {},
  filters: {},
};
</script>

// style里写样式
<style lang="less">
// 加上lang="less" 才能启用less语句
h1 {
  background: pink;
}
</style>