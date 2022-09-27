<template>
    <div class="left-container">
        <h3>Left 组件--{{ count }}</h3>
        <button @click="count++">+1</button>
    </div>
</template>

<script>
export default {
    name: "MyLeft",
    data() {
        return {
            count: 0,
        };
    },
    created() {
        console.log("left组件被创建");
    },
    destroyed() {
        console.log("Left组件被销毁");
    },

    // 当组件第一次被创建的是偶，既会执行created生命周期函数，也会执行activated生命周期
    // 但是，当组件被激活的时候，只会触发activated生命周期，不再触发created，因为组件没有被重新创建
    activated() {
        console.log("Left组件被激活了");
    },
    deactivated() {
        console.log("组件被缓存了");
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
