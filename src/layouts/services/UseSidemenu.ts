/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { useAuthentication } from '@core/services/UseAuthentication'
import { computed } from 'vue'

import { BehaviorSubject } from 'rxjs'
import { ref } from 'vue'

/** Sidemenu state. */
const state = ref(true)

/** Handle sidemenu actions */
export function useSidemenu() {
  const { hasAuthorization } = useAuthentication()

  /** Sidemenu menu name. */
  const menu = new BehaviorSubject<string>('')

  const _offcanvasMode = ref(false)
  const offcanvasMode = computed({
    get() {
      return _offcanvasMode.value
    },
    set(v: boolean) {
      if (v) close()
      else if (hasAuthorization.value) {
        menu.next(menu.getValue())
        open()
      }

      _offcanvasMode.value = v
    }
  })

  /** Open sidemenu. */
  function openSidemenu() {
    state.value = false
  }

  /** Close sidemenu. */
  function closeSidemenu() {
    state.value = true
  }

  /** Sidemenu close state. */
  function isClosedSidmenu() {
    return state
  }
  return {
    menu,
    offcanvasMode,
    openSidemenu,
    closeSidemenu,
    isClosedSidmenu
  }
}
