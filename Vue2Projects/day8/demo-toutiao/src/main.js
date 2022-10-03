import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createApp } from "vue";
// 1. 引入你需要的组件
import { Button } from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";
const app = createApp();
// 3. 注册你需要的组件
app.use(Button);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
