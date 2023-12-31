/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'

import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { useKeepAlive } from './UseKeepAlive'

/** Store the URL so we can redirect after logging in */
const redirectUrl = ref('/')

/** User authorization state */
const isAuthenticated = ref(!!getAuthorizationToken())

/** Return token if exists */
function getAuthorizationToken() {
  return sessionStorage.getItem('TOKEN') || localStorage.getItem('TOKEN') || ''
}

/** Handle authentication like token, login and logout */
export function useAuth() {
  const { clearAliveComponents } = useKeepAlive()

  /**
   *  Set token if exists
   *
   * @param token token
   * @param localStorageMode save in local storage
   */
  function setAuthorizationToken(token: string, localStorageMode = false) {
    if (token) {
      if (localStorageMode) localStorage.setItem('TOKEN', token)
      else sessionStorage.setItem('TOKEN', token)
      isAuthenticated.value = true
    }
  }

  /**
   * Try to log in
   *
   * @param username username
   * @param password password
   */
  function logIn(username: string, password: string): Observable<boolean> {
    return of(!!(username && password)).pipe(delay(1380))
  }

  /** Try to log out */
  function logOut() {
    clearAliveComponents()
    sessionStorage.clear()
    localStorage.clear()
    isAuthenticated.value = false
  }

  return {
    redirectUrl,
    isAuthenticated,
    getAuthorizationToken,
    setAuthorizationToken,
    logIn,
    logOut
  }
}
