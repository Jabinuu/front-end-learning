import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

// 全局配置axios的全局根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
// 把axios实例挂载到Vue.prototype中，供每个.vue组件的实例使用
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
