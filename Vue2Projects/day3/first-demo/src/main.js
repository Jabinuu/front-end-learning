// 导入vue这个包，得到Vue构造函数
import Vue from 'vue'

// 导入 App.vue 根组件，将来要把 APp.vue 中的模板结构，渲染到 HTML页面中
import App from './App.vue'
import Test from './Test.vue'

Vue.config.productionTip = false

// 创建vue实例
new Vue({
  // el: '#app',
  // 把 render属性指定的组件。渲染到HTML页面中，替换掉index.html的<div id="app"></div>
  render: h => h(Test),
}).$mount('#app')   // 作用与el属性完全一样
