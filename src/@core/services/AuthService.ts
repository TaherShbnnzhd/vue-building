/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'

import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

/** Handle authentication like token, login and logout */
export function authService() {
  /** Store the URL so we can redirect after logging in */
  const redirectUrl = ref('boz')

  /**
   * Update redirectUrl
   * @param url redirect URL
   */
  function setRedirectUrl(url: string) {
    redirectUrl.value = url
  }

  /** Return token if exists */
  function getAuthorizationToken() {
    const sessionStorageToken = sessionStorage.getItem('Token')
    const localStorageToken = localStorage.getItem('Token')

    return sessionStorageToken || localStorageToken || ''
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
    setRedirectUrl,
    getAuthorizationToken,
    logIn,
    logOut
  }
}
