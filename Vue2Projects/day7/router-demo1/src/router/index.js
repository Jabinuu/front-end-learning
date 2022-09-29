import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Movie from '@/components/Movie.vue'

// 通过Vue.use()给Vue安装vue-router插件
Vue.use(VueRouter)
// 向外暴露vue-router的实例
export default new VueRouter({
    routes: [
        // 重定向的路由规则
        { path: '/', redirect: '/home' },

        // 路由规则
        // 与VueRouter有关的地方，写hash地址是不带#号的，只有/xxx
        { path: '/home', component: Home },
        { path: '/movie', component: Movie },
        { path: '/about', component: About }
    ]
}); 