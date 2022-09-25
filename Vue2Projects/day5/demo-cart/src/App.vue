<template>
  <div class="app-container">
    <Header :title="'购物车案例'"></Header>
    <Goods
      v-for="item in list"
      :key="item.id"
      :title="item.goods_name"
      :pic="item.goods_img"
      :price="item.goods_price"
      :state="item.goods_state"
      :id="item.id"
      :count="item.goods_count"
      @state-change="getNewState"
    ></Goods>
    <Footer
      :fullCheck="fullState"
      :total="total"
      @clickFull="getFullState"
      :amt="amount"
    ></Footer>
    <!-- <h1>App 根组件</h1> -->
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header/Header.vue";
import Goods from "@/components/Goods/Goods.vue";
import Footer from "@/components/Footer/Footer.vue";
import bus from "@/components/eventBus.js";

export default {
  components: {
    Header,
    Goods,
    Footer,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async initCartList() {
      const { data: res } = await axios.get("https://www.escook.cn/api/cart");
      if (res.status === 200) {
        this.list = res.list;
      }
    },
    getNewState(e) {
      this.list.some((item) => {
        if (item.id === e.id) {
          item.goods_state = e.state;
          return true;
        }
      });
    },
    getFullState(val) {
      this.list.some((item) => {
        item.goods_state = val;
      });
    },
  },
  created() {
    this.initCartList();
    bus.$on("share", (val) => {
      this.list[val.id - 1].goods_count = val.count;
      if (val.count === 0) {
        this.list[val.id - 1].goods_state = false;
      }
    });
  },
  // 当某个值是由多个其他的值决定的时候，要用计算属性
  computed: {
    fullState() {
      return this.list.every((item) => item.goods_state === true);
    },
    amount() {
      return this.list
        .filter((item) => item.goods_state)
        .reduce(
          (total, item) => (total += item.goods_price * item.goods_count),
          0
        );
    },
    total() {
      return this.list
        .filter((item) => item.goods_state)
        .reduce((t, item) => (t += item.goods_count), 0);
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
