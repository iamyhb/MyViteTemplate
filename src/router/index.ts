import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/MyHome.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/components/MyAbout.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
