/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { useAuthentication } from '@core/services/UseAuthentication'
import type { RouteLocationNormalized } from 'vue-router'
import router from '.'

export const authenticationGuard = (to: RouteLocationNormalized) => {
  const { authorized, redirectUrl } = useAuthentication()

  if (authorized.value) return true
  else {
    redirectUrl.value = to.path
    router.push('/account/login')
    return false
  }
}
