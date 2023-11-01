/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { useAuthentication } from '@core/services/UseAuthentication'
import { computed } from 'vue'

import { BehaviorSubject } from 'rxjs'
import { ref } from 'vue'

/** Handle sidemenu actions */
export function useSidemenu() {
  const { getAuthorizationToken } = useAuthentication()

  /** Sidemenu state. */
  let state = true

  /** Sidemenu menu name. */
  const menu = new BehaviorSubject<string>('')

  const _offcanvasMode = ref(false)
  const offcanvasMode = computed({
    get() {
      return _offcanvasMode.value
    },
    set(v: boolean) {
      if (v) close()
      else if (getAuthorizationToken()) {
        menu.next(menu.getValue())
        open()
      }

      _offcanvasMode.value = v
    }
  })

  /** Open sidemenu. */
  function open() {
    state = false
  }

  /** Close sidemenu. */
  function close() {
    state = true
  }

  /** Sidemenu close state. */
  function isClose() {
    return state
  }
  return {
    menu,
    offcanvasMode,
    open,
    close,
    isClose
  }
}
