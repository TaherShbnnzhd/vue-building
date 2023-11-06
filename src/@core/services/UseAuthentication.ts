/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref, computed } from 'vue'

import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

/** Store the URL so we can redirect after logging in */
const redirectUrl = ref('/')

/** User authorization state */
const authorized = computed(() => !!getAuthorizationToken())

/** Return token if exists */
function getAuthorizationToken() {
  return sessionStorage.getItem('TOKEN') || localStorage.getItem('TOKEN') || ''
}

/** Handle authentication like token, login and logout */
export function useAuthentication() {
  /**
   *  Set token if exists
   * @param token token
   * @param localStorageMode save in local storage
   */
  function setAuthorizationToken(token: string, localStorageMode = false) {
    if (token) {
      if (localStorageMode) localStorage.setItem('TOKEN', token)
      else sessionStorage.setItem('TOKEN', token)
    }
  }

  /**
   * Try to log in
   * @param username username
   * @param password password
   */
  function logIn(username: string, password: string): Observable<boolean> {
    return of(!!(username && password)).pipe(delay(1380))
  }

  /** Try to log out */
  function logOut() {
    sessionStorage.clear()
    localStorage.clear()
  }

  return {
    redirectUrl,
    authorized,
    getAuthorizationToken,
    setAuthorizationToken,
    logIn,
    logOut
  }
}
