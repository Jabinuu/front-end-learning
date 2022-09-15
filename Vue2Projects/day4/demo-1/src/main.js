import Vue from 'vue'
import App from './App.vue'
// 导入全局组件
import Count from "@/components/Count.vue";
Vue.component('MyCount', Count);

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')
