<template>
  <div class="left-container">
    <h3>Left组件</h3>
    <button @click="getBookInfo">获得数据</button>
  </div>
</template>

<script>
export default {
  methods: {
    async getBookInfo() {
      const { data: res } = await this.$http.get("api/get");
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.left-container {
  background-color: orange;
  min-height: 200px;
  flex: 1;
}
</style>