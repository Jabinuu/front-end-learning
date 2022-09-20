<template>
  <div class="right-container">
    <h3>Right 组件</h3>
    <p>count的值为:{{ count }}</p>
    <button @click="add">+1</button>
    <p>从兄弟组件传递来的数据：{{ textFromLeft }}</p>
  </div>
</template>

<script>
import bus from "./eventBus.js";
export default {
  data() {
    return {
      count: 0,
      textFromLeft: "",
    };
  },
  methods: {
    add() {
      this.count++;
      // 自定义事件numChange，this.$emit负责发出这样一个事件，并把实参传递
      this.$emit("numChange", this.count);
    },
  },
  created() {
    bus.$on("share", (val) => {
      console.log(val);
      this.textFromLeft = val;
    });
  },
};
</script>

<style lang="less">
.right-container {
  padding: 0 20px 20px;
  background-color: lightskyblue;
  min-height: 250px;
  flex: 1;
}
</style>
