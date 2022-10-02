import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/components/MyLogin.vue'
import MyHome from '@/components/MyHome.vue'
import MyGoods from '@/components/menus/MyGoods.vue'
import MyOrders from '@/components/menus/MyOrders.vue'
import MyRights from '@/components/menus/MyRights.vue'
import MySettings from '@/components/menus/MySettings.vue'
import MyUsers from '@/components/menus/MyUsers.vue'

// 通过Vue.use()给Vue安装vue-router插件
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: MyLogin },
        {
            path: '/home', component: MyHome, children: [
                { path: 'users', component: MyUsers },
                { path: 'goods', component: MyGoods },
                { path: 'orders', component: MyOrders },
                { path: 'rights', component: MyRights },
                { path: 'settings', component: MySettings }
            ]
        }
    ],
})

// 导航前置守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/home') {
        const token = localStorage.getItem('token')
        // 有token才放行，否则强制跳转到login界面
        if (token) {
            next();
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router;