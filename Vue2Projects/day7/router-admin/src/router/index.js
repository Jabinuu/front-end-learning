import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/components/MyLogin.vue'

// 通过Vue.use()给Vue安装vue-router插件
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/login', component: MyLogin }
    ]
})


export default router;