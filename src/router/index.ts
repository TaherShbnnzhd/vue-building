/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { createRouter, createWebHistory } from 'vue-router'
import { authenticationGuard } from './authenticationGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: {
        title: 'بنا'
      },
      // route level code-splitting
      // this generates a separate chunk (MainLayout.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/LayoutDefault.vue'),
      children: [
        { path: '/', redirect: '/home/dashboard' },
        {
          path: 'account',
          meta: {
            title: 'بنا | کاربری'
          },
          component: () => import('../pages/account/AccountDefault.vue'),
          children: [
            { path: '/', redirect: '/account/login' },
            {
              path: 'login',
              meta: {
                title: 'بنا | ورود'
              },
              component: () => import('../pages/account/subpages/AccountLogin.vue')
            }
          ]
        },
        {
          path: 'home',
          meta: {
            title: 'بنا | صفحه اصلی'
          },
          component: () => import('../pages/home/HomeDefault.vue'),
          beforeEnter: [authenticationGuard],
          children: [
            { path: '/', redirect: '/home/dashboard' },
            {
              path: 'dashboard',
              meta: {
                title: 'بنا | داشبورد'
              },
              component: () => import('../pages/home/subpages/HomeDashboard.vue')
            }
          ]
        },
        {
          path: 'showcase',
          meta: {
            title: 'بنا | پیش نمایش'
          },
          component: () => import('../pages/home/HomeDefault.vue'),
          beforeEnter: [authenticationGuard],
          children: [
            { path: '/', redirect: '/showcase/toast' },
            {
              path: 'toast',
              meta: {
                title: 'بنا | اعلان'
              },
              component: () => import('../pages/showcase/subpages/ShowcaseToast.vue')
            }
          ]
        }
      ]
    }
  ]
})

// Assigning page title to different routes
router.afterEach((to) => (window.document.title = (to.meta['title'] as string) || 'بنا'))

export default router
