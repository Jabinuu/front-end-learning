import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/MyLogin.vue'
import Home from '@/components/MyHome.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Rights from '@/components/menus/MyRights.vue'
import Settings from '@/components/menus/MySettings.vue'
import Users from '@/components/menus/MyUsers.vue'
import Userinfo from '@/components/user/MyUserDetail.vue'
import arrPath from '@/router/pathArr.js'

// 通过Vue.use()给Vue安装vue-router插件
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home', component: Home, redirect: '/home/users', children: [
                { path: 'users', component: Users },
                { path: 'goods', component: Goods },
                { path: 'orders', component: Orders },
                { path: 'rights', component: Rights },
                { path: 'settings', component: Settings },
                // 路径参数 和查询字符串可由props传值给组件
                { path: 'userinfo/:id', component: Userinfo, props: true }
            ]
        }
    ],
})

// 导航前置守卫
router.beforeEach((to, from, next) => {
    if (arrPath.indexOf(to.path) !== -1) {
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