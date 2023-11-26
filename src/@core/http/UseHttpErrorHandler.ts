/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { Observable, of } from 'rxjs'
import type { AxiosError } from 'axios'
import { usePersianNumber } from '@/@shared/utils/UsePersianNumber'
import { useToast } from 'primevue/usetoast'
import { useLogger } from '../services/UseLogger'

/**
 * Type of the handleError function returned by
 * HttpErrorHandler.createHandleError
 */
export type HandleError = <T>(
  operation?: string,
  result?: T
) => (error: AxiosError) => Observable<T>

/** Handles Axios errors */
export function useHttpErrorHandler() {
  const { addLogMessage } = useLogger()
  const { toPersian } = usePersianNumber()
  const toast = useToast()

  /**
   * Create curried handleError function that already knows the service name
   *
   * @tip If `T` didnt mentioned, the compiler will figure out based on the value passed in.
   */
  const createHandleError =
    (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T) =>
      handleError(serviceName, operation, result)

  /**
   * Returns a function that handles Http operation failures
   * This error handler lets the app continue to run as if no error occurred
   *
   * @param serviceName - name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  function handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: AxiosError): Observable<T> => {
      const code = error.response?.status
      const message =
        error instanceof ErrorEvent
          ? error.error.message
          : `server returned code ${code} with body "${error.message}"`

      // transforming error for user consumption
      let userMessage = ''

      switch (code) {
        case -1:
          userMessage = `اتصال به سرور برقرار نیست`
          break
        case 400:
          userMessage = `اطلاعات با قالب اشتباه ارسال شده است`
          break
        case 401:
          userMessage = `شما برای ارسال اطلاعات دسترسی ندارید`
          break
        case 403:
          userMessage = `شما برای دریافت اطلاعات دسترسی ندارید`
          break
        case 404:
        case 405:
          userMessage = `سرویس موجود نیست`
          break
        case 412:
          userMessage = `شرایط ارتباط با سرویس فراهم نیست`
          break
        case 500:
          userMessage = `سرویس دچار مشکل شده است`
          break
        case 503:
          userMessage = `سرویس مورد نظر از دسترسی خارج شده است`
          break
        default:
          userMessage = 'خطا در دریافت/ارسال اطلاعات'
      }

      toast.add({
        group: 'HttpErrorMessage',
        life: 8000,
        severity: 'error',
        detail: `خطا ${toPersian(code || 0)}`,
        summary: userMessage
      })

      // Log error.
      addLogMessage(`${serviceName}: ${operation} failed: ${message}`)

      // Let the app keep running by returning a safe result:
      return of(result)
    }
  }

  return {
    createHandleError,
    handleError
  }
}
