import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TunnelModelDisplay',
    component: () => import('@/components/TunnelModelDisplay.vue')
  },
  {
    path: '/TunnelEntranceModelDisplay',
    name: 'TunnelEntranceModelDisplay',
    component: () => import('@/components/TunnelEntranceModelDisplay.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
