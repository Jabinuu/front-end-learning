import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/components/MyLogin.vue'
import MyHome from '@/components/MyHome.vue'

// 通过Vue.use()给Vue安装vue-router插件
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: MyLogin },
        { path: '/home', component: MyHome }
    ]
})


export default router;