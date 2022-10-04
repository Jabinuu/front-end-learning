<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ title }}</span>
          <!-- 单张图片 -->
          <img
            v-if="cover.type === 1"
            :src="cover.images[0]"
            alt=""
            class="thumb"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="cover.type === 3">
          <img
            :src="item"
            v-for="(item, index) in cover.images"
            :key="index"
            alt=""
            class="thumb"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >作者：{{ author }} &nbsp;&nbsp; {{ cmtCount }}评论 &nbsp;&nbsp;
            {{ date }}</span
          >
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArtItem",
  props: {
    title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    cmtCount: {
      type: [String, Number],
      default: 0,
    },
    date: {
      type: String,
      default: "",
    },
    cover: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  /*  矩形黄金比例：0.618 */
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>