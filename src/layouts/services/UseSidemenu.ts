/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'
import { BehaviorSubject } from 'rxjs'

import { useAuthentication } from '@core/services/UseAuthentication'

/** Sidemenu state. */
const state = ref(true)
/** Sidemenu offcanvas state. */
const isOffcanvas = ref(true)

/** Handle sidemenu actions */
export function useSidemenu() {
  const { isAuthenticated } = useAuthentication()

  /** Sidemenu menu name. */
  const menus = new BehaviorSubject<string>('')

  /** Set sidemenu offcanvas state. */
  function setOffcanvas(value: boolean) {
    if (value) close()
    else if (isAuthenticated.value) {
      menus.next(menus.getValue())
      open()
    }
    isOffcanvas.value = value
  }

  /** Open sidemenu. */
  function open() {
    state.value = false
  }

  /** Close sidemenu. */
  function close() {
    state.value = true
  }

  /** Sidemenu close state. */
  function hasCloseState() {
    return state.value
  }
  return {
    menus,
    isOffcanvas,
    setOffcanvas,
    open,
    close,
    hasCloseState
  }
}
