<template>
  <div class="right-container">
    <h3>Right 组件</h3>
    <!-- 注意：给标签的属性赋值时，默认时字符串类型。 -->
    <!-- 当我们需要他是数字型的的话，需要配合v-bind，因为v-bind的属性里写的js语句，单写9，就是数字9而不是字符串"9"" -->
    <MyCount :init="6"></MyCount>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.right-container {
  padding: 0 20px 20px;
  background-color: lightskyblue;
  min-height: 250px;
  flex: 1;
}
</style>
