<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr />

    <Test></Test>
    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left> </Left>
      <Right> </Right>
    </div>
  </div>
</template>

<script>
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";
import Test from "@/components/Test.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  // 注册组件，注册完就可以当标签用了
  components: {
    // Left:Left   键值对同名的话，可以简写成如下
    Left,
    Right,
    Test,
  },
};
</script>

<style lang="less">
.app-container {
  padding: 1px 20px 20px;
  background-color: #efefef;
}
.box {
  display: flex;
}
</style>
