/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { useAuthentication } from '@core/services/UseAuthentication'
import type { RouteLocationNormalized } from 'vue-router'
import router from '.'

export const authenticationGuard = (to: RouteLocationNormalized) => {
  const { isAuthenticated, redirectUrl } = useAuthentication()

  if (isAuthenticated.value) return true
  else {
    redirectUrl.value = to.path
    router.push('/account/login')
    return false
  }
}
