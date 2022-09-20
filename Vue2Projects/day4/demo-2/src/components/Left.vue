<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <p>{{ msg }}</p>
    <p>{{ user }}</p>

    <button @click="send">将数据从lLeft传递到Right</button>
  </div>
</template>

<script>
import bus from "./eventBus.js";
export default {
  props: {
    msg: {
      required: false,
      type: String,
      default: "default",
    },
    user: {
      required: false,
      default: "default",
    },
  },
  data() {
    return {
      text: "jiabin zhangqing doubao bingbing",
    };
  },
  methods: {
    send() {
      bus.$emit("share", this.text);
    },
  },
};
</script>

<style lang="less">
.left-container {
  padding: 0 20px 20px;
  background-color: orange;
  min-height: 250px;
  flex: 1;
}
</style>
