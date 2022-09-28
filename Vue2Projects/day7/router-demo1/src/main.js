import Vue from 'vue'
import App from './App2.vue'

// 模块化导入的时候，如果只给了文件夹，那么会默认导入该文件夹下的index.js文件
import router from '@/router'
// 导入 bootstrap 样式
import 'bootstrap/dist/css/bootstrap.min.css'
// 全局样式
import '@/assets/global.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router    // 将vue-router的实例挂载到Vue实例下的router属性
}).$mount('#app')
