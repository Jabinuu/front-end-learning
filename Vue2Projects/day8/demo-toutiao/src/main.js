import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 直接在这里引用全部的vant组件
import Vant from 'vant';
import 'vant/lib/index.less';    //引入vant的样式

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
