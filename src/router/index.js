import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'dashdoard',
      component: import (/* webpackChunkName: "dashboard" */'@/views/Admin.vue'),
    },
    {
      path: '/admin/manager-product',
      name: 'managerProducut',
      component: import (/* webpackChunkName: "managerProducut" */'@/views/ManagerProduct.vue')
    },
    {
      path: '/admin/manager-category',
      name: 'managerCategory',
      component: import (/* webpackChunkName: "managerCategory" */'@/views/ManagerCategory.vue')
    },
    
  ]
})

export default router
