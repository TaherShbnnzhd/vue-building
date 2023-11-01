/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { createRouter, createWebHistory } from 'vue-router'
import { authenticationGuard } from './authenticationGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home/dashboard' },
    {
      path: '/',
      name: 'بنا',
      // route level code-splitting
      // this generates a separate chunk (MainLayout.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/LayoutDefault.vue'),
      children: [
        {
          path: '/',
          redirect: '/home/dashboard'
        },
        {
          path: 'account',
          name: 'بنا | کاربری',
          component: () => import('../pages/account/AccountDefault.vue'),
          children: [
            {
              path: 'login',
              name: 'بنا | ورود',
              component: () => import('../pages/account/AccountLogin.vue')
            }
          ]
        },
        {
          path: 'home',
          name: 'بنا | صفحه اصلی',
          component: () => import('../pages/home/HomeDefault.vue'),
          beforeEnter: [authenticationGuard],
          children: [
            {
              path: 'dashboard',
              name: 'بنا | داشبورد',
              component: () => import('../pages/home/HomeDashboard.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
