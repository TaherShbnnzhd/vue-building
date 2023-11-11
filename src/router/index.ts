/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import {
  NavigationFailureType,
  createRouter,
  createWebHistory,
  isNavigationFailure
} from 'vue-router'
import { authenticationGuard } from './authenticationGuard'
import { useSidemenu } from '@/layouts/services/UseSidemenu'
import { useToast } from 'primevue/usetoast'

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
      component: () => import('../layouts/LayoutView.vue'),
      children: [
        { path: '/', redirect: '/home/dashboard' },
        {
          path: 'account',
          meta: {
            title: 'بنا | کاربری'
          },
          component: () =>
            import(/* webpackChunkName: "account-module" */ '../pages/account/AccountView.vue'),
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
          component: () =>
            import(/* webpackChunkName: "home-module" */ '../pages/home/HomeView.vue'),
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
          component: () =>
            import(/* webpackChunkName: "showcase-module" */ '../pages/showcase/ShowcaseView.vue'),
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

const { sidemenus } = useSidemenu()

router.afterEach((to, from, failure) => {
  // Assigning page title to different routes
  window.document.title = (to.meta['title'] as string) || 'بنا'

  // Highlight route menu in sidemenu if exists
  sidemenus.next(to.path.split('/')[1])

  // Detecting navigation failures
  if (isNavigationFailure(failure, NavigationFailureType.aborted))
    console.error('Login in order to access the admin panel')
})

export default router
