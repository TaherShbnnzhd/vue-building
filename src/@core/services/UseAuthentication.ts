/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref, computed } from 'vue'

import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

/** Store the URL so we can redirect after logging in */
const redirectUrl = ref('/')

/** Handle authentication like token, login and logout */
export function useAuthentication() {
  const hasAuthorization = computed(() => !!getAuthorizationToken())

  /**
   * Update redirectUrl
   * @param url redirect URL
   */
  function setRedirectUrl(url: string) {
    redirectUrl.value = url
  }

  /** Return token if exists */
  function getAuthorizationToken() {
    const sessionStorageToken = sessionStorage.getItem('TOKEN')
    const localStorageToken = localStorage.getItem('TOKEN')

    return sessionStorageToken || localStorageToken || ''
  }

  /**
   *  Set token if exists
   * @param token token
   * @param localStorageMode save in local storage
   */
  function setAuthorizationToken(token: string, localStorageMode = false) {
    if (token) {
      if (localStorageMode) localStorage.setItem('TOKEN', 'TOKEN')
      else sessionStorage.setItem('TOKEN', 'TOKEN')
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
    sessionStorage.removeItem('Token')
    localStorage.removeItem('Token')
  }

  return {
    redirectUrl,
    hasAuthorization,
    setRedirectUrl,
    getAuthorizationToken,
    setAuthorizationToken,
    logIn,
    logOut
  }
}
