<template>
  <div class="left-container">
    <h3>Left 组件</h3>

    <!-- slot的默认name为default，只有一个slot时name写不写都无所谓，但有多个slot的时候，必须要指定他的name属性，不然会造成混乱 -->

    <slot name="myslot">
      <!-- 如果该组件的使用者没有给插槽指定标签，那么会显示后备内容 -->
      <p style="font-size: 10px">这是插槽的后备内容</p>
    </slot>
  </div>
</template>

<script>
export default {
  // name: "MyLeft",
};
</script>

// scoped防止样式冲突
<style lang="less" scoped>
.left-container {
  padding: 0 20px 20px;
  background-color: orange;
  min-height: 250px;
  flex: 1;
}
</style>
