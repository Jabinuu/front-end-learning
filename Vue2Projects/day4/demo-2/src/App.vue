<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <p>子向父传值：{{ countFromSon }}</p>
    <button @click="console.log(this)">打印this</button>
    <!-- 用DOM引用比父子组件传值方便多了 -->
    <button @click="resetCount">重置Right组件的count的值</button>
    <hr />

    <input
      type="text"
      v-if="iptVisible"
      @blur="iptVisible = false"
      ref="iptRef"
    />
    <button @click="showInput" v-else>点击显示输入框</button>

    <hr />
    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left :msg="msg" :user="userinfo"></Left>
      <Right @numChange="getCount" ref="Right"></Right>
    </div>
  </div>
</template>

<script>
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";

export default {
  data() {
    return {
      msg: "贾宾你好~",
      userinfo: { name: "jiabin", age: 18 },
      countFromSon: 0,
      iptVisible: false,
    };
  },
  components: {
    Left,
    Right,
  },
  methods: {
    getCount(val) {
      this.countFromSon = val;
    },
    showThis() {
      console.log(this);
    },
    resetCount() {
      this.$refs.Right.count = 0;
    },
    showInput() {
      this.iptVisible = true;

      // $nextTick()的作用是：将回调函数延迟执行，延迟到刚更新的DOM元素已经渲染到页面后
      this.$nextTick(() => {
        this.$refs.iptRef.focus();
      });
    },
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
