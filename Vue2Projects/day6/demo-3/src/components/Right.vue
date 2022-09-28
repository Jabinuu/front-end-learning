<template>
  <div class="right-container">
    <h3>Right组件</h3>
    <button @click="postRequest">发起post请求</button>
  </div>
</template>

<script>
export default {
  methods: {
    async postRequest() {
      const { data } = await this.$http.post("api/post", {
        name: "zs",
        age: 20,
      });
      console.log(data);
    },
  },
};
</script>

<style lang="less" scoped>
.right-container {
  background-color: skyblue;
  min-height: 200px;
  flex: 1;
}
</style>