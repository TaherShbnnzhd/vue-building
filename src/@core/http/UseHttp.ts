/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import type { RuntimeConfiguration } from '../plugins/runtimeConfiguration'
import { useHttpErrorHandler, type HandleError } from './UseHttpErrorHandler'
import { useAuth } from '../services/UseAuth'
import { inject } from 'vue'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { from, catchError, map, pipe, Observable } from 'rxjs'
import { useLogger } from '../services/UseLogger'

/** Extends the default AxiosRequestConfig and adds a new property retry */
interface RetryConfig extends AxiosRequestConfig {
  retry: number
  retryDelay: number
}

/** Implement HTTP client with Axios and RxJS */
export function useHttp() {
  const { createHandleError } = useHttpErrorHandler()
  const { getAuthorizationToken } = useAuth()
  const { addLogMessage } = useLogger()

  // Hold request send date time
  let started = Date.now()

  // Handle axios request erros
  const handleError: HandleError = createHandleError('UseHttp')

  /**
   * RxJs pipe for handling axios requests
   *
   * @param method method name as log message key
   */
  const handleRequest = <T>(method: string) =>
    pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError(handleError<T>(method))
    )

  /**
   * Log request with either complete or erro status
   *
   * @param ok request ok status
   * @param request request config
   */
  const handleLog = (ok: string, request: AxiosRequestConfig) => {
    const elapsed = Date.now() - started
    const message = `${request.method} "${request.url}" ${ok} in ${elapsed} ms.`

    addLogMessage(message)
  }

  // Runtime configurations
  const config = inject('runtimeConfiguration') as RuntimeConfiguration

  // Runtime configuration server address
  const SERVER_ADDRESS = config.serverAddress

  // Global retry and retry delay configuration
  const globalConfig: RetryConfig = {
    retry: 3,
    retryDelay: 1000
  }

  // Set config defaults when creating the instance
  const http = axios.create({
    baseURL: SERVER_ADDRESS,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthorizationToken()}`
    },
    responseType: 'json',
    // If the request takes longer than 15000ms (15 seconds), the request will be aborted.
    timeout: 15000
  })

  http.interceptors.request.use((request) => {
    // "secure" request with replace 'http://' with 'https://'
    request.url && request.url.replace('http://', 'https://')
    started = Date.now()
    return request
  }, Promise.reject)

  http.interceptors.response.use(
    (response) => {
      const { config } = response
      // Log when response observable completes
      handleLog('succeeded', config)
      return response
    },
    (error) => {
      const { config } = error

      // Retry the request a configurable number of times.
      if (!config || !config.retry) {
        // Log when response observable errors
        handleLog('failed', config)

        return Promise.reject(error)
      } else {
        config.retry -= 1

        const delayRetryRequest = new Promise<void>((resolve) => {
          setTimeout(() => {
            console.warn('** Retry the request:', config.url)
            resolve()
          }, config.retryDelay || 1000)
        })

        return delayRetryRequest.then(() => http(config))
      }
    }
  )

  /**
   * GET - Fetch data from server
   *
   * @param url Api address
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpGET<T>(url: string, config?: RetryConfig): Observable<T> {
    return from(http.get<T>(url, config || globalConfig)).pipe(handleRequest('httpGET'))
  }

  /**
   * POST - Pass params and fetch data from server
   *
   * @param url Api address
   * @param params Api paramiters
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpPOST<T>(url: string, params: AxiosRequestConfig, config?: RetryConfig) {
    return from(http.post<T>(url, params, config || globalConfig)).pipe(
      handleRequest<T>('httpPOST')
    )
  }

  /**
   * PUT - Pass params for updating data from server
   *
   * @param url Api address
   * @param params Api paramiters
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpPUT<T>(url: string, params: AxiosRequestConfig, config?: RetryConfig) {
    return from(http.put<T>(url, params, config || globalConfig)).pipe(handleRequest<T>('httpPUT'))
  }

  /**
   * PATCH - Pass params for updating data from server
   *
   * @param url Api address
   * @param params Api paramiters
   * @param config Custom config
   * @returns Observable of response typeS
   */
  function httpPATCH<T>(url: string, params: AxiosRequestConfig, config?: RetryConfig) {
    return from(http.patch<T>(url, params, config || globalConfig)).pipe(
      handleRequest<T>('httpPATCH')
    )
  }

  /**
   * DELETE - Pass params for deleting data from server
   *
   * @param url Api address
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpDELETE<T>(url: string, config?: RetryConfig) {
    return from(http.delete<T>(url, config || globalConfig)).pipe(handleRequest<T>('httpDELETE'))
  }

  return { SERVER_ADDRESS, httpGET, httpPOST, httpPUT, httpPATCH, httpDELETE }
}
