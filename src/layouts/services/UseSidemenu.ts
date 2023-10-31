/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */


import { useAuthentication } from '@core/services/UseAuthentication'

import { BehaviorSubject } from 'rxjs'

/** Handle sidemenu actions */
export function useSidemenu() {
  const { getAuthorizationToken } = useAuthentication()

  /** Sidemenu state. */
  let state = true

  /** Sidemenu menu name. */
  const menu = new BehaviorSubject<string>('')

  let offcanvasMode = false

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

  function getOffcanvasMode() {
    return offcanvasMode
  }

  function setOffcanvasMode(value: boolean) {
    if (value) close()
    else if (getAuthorizationToken()) {
      menu.next(menu.getValue())
      open()
    }

    offcanvasMode = value
  }

  return {
    menu,
    open,
    close,
    isClose,
    getOffcanvasMode,
    setOffcanvasMode
  }
}
