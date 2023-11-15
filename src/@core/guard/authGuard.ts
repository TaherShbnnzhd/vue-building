/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { useAuth } from '@core/services/UseAuth'
import type { RouteLocationNormalized } from 'vue-router'
import router from '../../router'

export const authGuard = (to: RouteLocationNormalized) => {
  const { isAuthenticated, redirectUrl } = useAuth()

  if (isAuthenticated.value) return true
  else {
    redirectUrl.value = to.path
    router.push('/account/login')
    return false
  }
}
