/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { useAuthentication } from '@core/services/UseAuthentication'
import type { RouteLocationNormalized } from 'vue-router'
import router from '.'

export const authenticationGuard = (to: RouteLocationNormalized) => {
  const { hasAuthorization, redirectUrl } = useAuthentication()

  if (hasAuthorization.value) return true
  else {
    redirectUrl.value = `${to.path.toString().replace(',', '/')}`
    router.push('/account/login')
    return false
  }
}
