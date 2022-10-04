<template>
  <div class="home-container">
    <!-- <van-nav-bar title="黑马头条" :fixed="true" /> -->
    <!-- 如果属性的值类型是Boolean如果需要把他变成true的话，只需要把这个属性甩上去即可 -->
    <van-nav-bar title="黑马头条" fixed />

    <!-- 该组件实现了瀑布流滚动加载 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArtItem
        v-for="item in artlist"
        :key="item.id"
        :title="item.title"
        :author="item.aut_name"
        :cmtCount="item.comm_count"
        :date="item.pubdate"
        :cover="item.cover"
      ></ArtItem>
    </van-list>
  </div>
</template>

<script>
import { getArticleList } from "@/api/articleAPI";
import ArtItem from "@/components/Article/ArtItem.vue";
export default {
  name: "Home",
  components: {
    ArtItem,
  },
  data() {
    return {
      // 切记：vue组件的data变量命名不能以_和$开头，因为会跟vue内置的property和API冲突
      page: 1,
      limit: 10,
      artlist: [],

      // 当loading为true时，可以避免多余的下拉列表操作反复触发load事件。值为false时才会触发load事件
      loading: true,
      // 当finished为true时，表明所有数据都请求完了
      finished: false,
    };
  },
  methods: {
    async initArticleList() {
      const { data: res } = await getArticleList(this.page, this.limit);
      // 当请求到的res为空时，说明所有数据已经请求完毕，将finished设置为true
      if (res.length === 0) {
        this.finished = true;
      }
      // 数组拼接的写法！！！
      // 注意：不能用push，使用push的后果是[1,2,3,[4,5,6]]
      this.artlist = [...this.artlist, ...res];
      this.loading = false;
    },
    async onLoad() {
      this.loading = true;
      // 页码加一，表明要请求下一页的数据了
      this.page++;
      // 重新调用获取数据的接口
      this.initArticleList();
    },
  },
  created() {
    this.initArticleList();
  },
};
</script>

<style lang='less' scoped>
.home-container {
  padding: 46px 0 50px;
}
.van-nav-bar {
  background-color: #007bff;
}

// 样式穿透。用于修改被scoped控制的元素的子元素。
// 因为只有该组件的tmeplate里的元素会被标上scoped标记类号，他的子元素是没有的，而直接写选择器默认是 .vant[v-data-001] {} 这是交集选择器，那么子元素当然无法没选中。
// 而加上/deep/ 后选择器就成为了[v-data-001] .vant{} 这是后代选择器，就能选中到子元素了
/deep/ .van-nav-bar__title {
  color: #fff;
}
</style>