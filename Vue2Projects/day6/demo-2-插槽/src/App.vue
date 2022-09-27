<template>
    <div class="app-container">
        <h1>App 根组件</h1>
        <hr />

        <div class="box">
            <!-- 渲染 Left 组件和 Right 组件 -->
            <Left style="display: none">
                <!-- 1. v-slot指令只能用在template里，因此要使用template标签进行包裹，否则报错 -->
                <!-- 2. slot的name属性表示这个插槽的名字，使用组件的人在tmeplate里用v-slot或#来说明要使用的插槽名字 -->
                <!-- <template v-slot:myslot> -->
                <template #myslot>
                    <p>我向插槽使用了p标签</p>
                </template>
            </Left>
        </div>
        <Article>
            <template #header>
                <p>这是标题</p>
            </template>
            <!-- 用等号即可接受插槽里的属性值 -->
            <template #content="{ msg }">
                <p>这是内容--{{ msg }}</p>
            </template>
            <template #footer>
                <p>这是底部区域</p>
            </template>
        </Article>
    </div>
</template>

<script>
import Left from "@/components/Left.vue";
import Article from "@/components/Article.vue";
export default {
    components: {
        Left,
        Article,
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
