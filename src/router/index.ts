/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import {
  NavigationFailureType,
  createRouter,
  createWebHistory,
  isNavigationFailure
} from 'vue-router'
import { authenticationGuard } from './authenticationGuard'
import { useSidemenu } from '@/layouts/services/UseSidemenu'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (MainLayout.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../layouts/LayoutView.vue'),
      children: [
        { path: '/', redirect: '/home/dashboard' },
        {
          path: 'account',
          meta: {
            title: 'کاربری'
          },
          children: [
            { path: '/', redirect: '/account/login' },
            {
              path: 'login',
              name: 'AccountLogin',
              meta: {
                title: 'ورود',
                ignoreTab: true
              },
              component: () => import('../pages/account/AccountLogin.vue')
            }
          ]
        },
        {
          path: 'home',
          meta: {
            title: 'صفحه اصلی'
          },
          beforeEnter: [authenticationGuard],
          children: [
            { path: '/', redirect: '/home/dashboard' },
            {
              path: 'dashboard',
              name: 'HomeDashboard',
              meta: {
                title: 'داشبورد',
                ignoreTab: true
              },
              component: () => import('../pages/home/HomeDashboard.vue')
            }
          ]
        },
        {
          path: 'showcase',
          meta: {
            title: 'پیش نمایش'
          },
          beforeEnter: [authenticationGuard],
          children: [
            { path: '/', redirect: '/showcase/toast' },
            {
              path: 'toast',
              name: 'ShowcaseToast',
              meta: {
                title: 'اعلان'
              },
              component: () => import('../pages/showcase/ShowcaseToast.vue')
            },
            {
              path: 'form',
              name: 'ShowcaseForm',
              meta: {
                title: 'فرم'
              },
              component: () => import('../pages/showcase/ShowcaseForm.vue')
            }
          ]
        }
      ]
    }
  ]
})

const { sidemenus } = useSidemenu()

router.afterEach((to, from, failure) => {
  // Assigning page title to different routes
  window.document.title = `بنا | ${(to.meta['title'] as string) || 'خانه'}`

  // Highlight route menu in sidemenu if exists
  sidemenus.next(to.path.split('/')[1])

  // Detecting navigation failures
  if (isNavigationFailure(failure, NavigationFailureType.aborted))
    console.warn('** Login in order to access the admin panel')
})

export default router
