<template>
    <!-- 每一个组件的template里必须且仅有一个根节点div，约定命名为class=xxx-container -->
    <div class="article-container">
        <div class="header-box">
            <!-- 有name的这个叫：具名插槽 -->
            <slot name="header"></slot>
        </div>
        <div class="content-box">
            <slot name="content" msg="hello vue.js"></slot>
        </div>
        <div class="footer-box">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Article",
};
</script>

// scoped防止样式冲突
<style lang="less" scoped>
.article-container {
    > div {
        height: 150px;
    }
    .header-box {
        background-color: pink;
    }
    .content-box {
        background-color: lightblue;
    }
    .footer-box {
        background-color: lightsalmon;
    }
}
</style>