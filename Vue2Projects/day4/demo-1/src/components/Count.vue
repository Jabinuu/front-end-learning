
<template>
  <div>
    <h5>count 组件</h5>
    <p>count的值为：{{ count }}</p>
    <button @click="count += 1">+1</button>
  </div>
</template>

<script>
export default {
  // props 是存放自定义属性的容器，允许使用者通过自定义属性，为当前组件指定初始值
  // 自定义属性的名字，是封装者自定义的，一般为init
  //   props: ["init"],
  props: {
    init: {
      default: 0, //如果使用者使用该组件时没有传递init的值，那么默认值生效
      type: Number, //规定init的值必须是NUmber，否则报错
      required: true, //必填项校验，如果使用该组件时没有写init属性，那么就会报错
    },
  },
  // vue规定：组件中封装的自定义属性是只读的，程序员不可修改它的值，因为它的作用主要是提供初始值
  data() {
    return {
      count: this.init,
    };
  },
  methods: {
    // 当事件处理函数只有一行时，可以简写到点击事件里
    // add() {
    //   this.count++;
    // },
  },
};
</script>

<style>
</style>