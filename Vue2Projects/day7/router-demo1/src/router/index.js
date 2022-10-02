import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Movie from '@/components/Movie.vue'
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'
import Main from '@/components/Main.vue'
import Login from '@/components/Login.vue'

// 通过Vue.use()给Vue安装vue-router插件
Vue.use(VueRouter)
// 向外暴露vue-router的实例
const router = new VueRouter({
    routes: [
        // 重定向的路由规则
        { path: '/', redirect: '/home' },

        // 路由规则
        // 与VueRouter有关的地方，写hash地址是不带#号的，只有/xxx
        { path: '/home', component: Home },
        { path: '/movie/:id', component: Movie, props: true },    //props:true意为开启props传参，将“路径参数”作为自定义属性传递给组件，同样实现了动态路由，并且使用更简单
        {
            path: '/about',
            component: About,
            redirect: '/about/tab1',
            children: [
                { path: 'tab1', component: Tab1 },    //嵌套子路由的path连 / 都不用写
                { path: 'tab2', component: Tab2 }
            ]
        },
        { path: '/login', component: Login },
        { path: '/main', component: Main }
    ]
});

// 为router实例对象声，声明全局前置导航守卫
// 只要发生了路由的跳转，必然会触发beforEach指定的function回调函数（有3个形参分别为to，from，next）
router.beforeEach((to, from, next) => {
    // to表示要访问的路由的信息对象
    // from 表示将要离开的路由的信息对象
    // next（）函数表示放行的意思。如果不调用next，那么所有路由都无法跳转
    if (to.path === '/main') {
        const token = localStorage.getItem('token')
        if (token) {
            next()
        }
        else {
            next('/login')
        }
    }
    else {
        next();
    }
})

export default router;