<template>
  <div
    class="number-container d-flex justify-content-center align-items-center"
  >
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="subCount">
      -
    </button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ count }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="addCount">
      +
    </button>
  </div>
</template>

<script>
import bus from "@/components/eventBus.js";
export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addCount() {
      const obj = { id: this.id, count: this.count + 1 };
      bus.$emit("share", obj);
    },
    subCount() {
      if (this.count >= 1) {
        const obj = { id: this.id, count: this.count - 1 };
        bus.$emit("share", obj);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
}

.btn-sm {
  width: 30px;
}
</style>
