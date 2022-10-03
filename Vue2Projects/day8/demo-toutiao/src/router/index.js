import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '@/components/User/User.vue'
import Home from '@/components/Home/Home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes
})

export default router
