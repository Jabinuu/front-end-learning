<template>
    <div class="app-container">
        <h1>App 根组件</h1>
        <hr />

        <button @click="comName = 'Left'">渲染Left</button>
        <button @click="comName = 'Right'">渲染Right</button>
        <div class="box">
            <!-- 1. component标签是vue内置的，作用：组件的占位符 -->
            <!-- 2. is属性的值，表示要渲染的组件的名字 -->
            <!-- 3. is属性的值，应该是组件在components节点下注册的名称 -->

            <!-- keep-alive可以把内部的组件进行缓存，而不是销毁组件 -->
            <!-- 在使用keep-alive的时候，可以通过include指定哪些组件需要被缓存 -->
            <!-- 或者通过exclude属性指定哪些组件不需要被缓存。但是，不要同时用 -->
            <keep-alive include="MyRight,MyLeft">
                <component :is="comName"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";
export default {
    data() {
        return {
            comName: "",
        };
    },
    // 组件的名称默认为注册时的名称。可以在组件的name节点自定义他的名称
    components: {
        Left,
        Right,
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
