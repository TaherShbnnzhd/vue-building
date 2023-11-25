/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import type { RuntimeConfiguration } from '../plugins/runtimeConfiguration'
import { useHttpErrorHandler, type HandleError } from './UseHttpErrorHandler'
import { BaseResponse } from '@shared/models/baseResponse'
import { useAuth } from '../services/UseAuth'
import { inject } from 'vue'
import axios, { type AxiosRequestConfig } from 'axios'
import { from, catchError, take } from 'rxjs'

/** Extends the default AxiosRequestConfig and adds a new property retry */
interface RetryConfig extends AxiosRequestConfig {
  retry: number
  retryDelay: number
}

const globalConfig: RetryConfig = {
  retry: 3,
  retryDelay: 1000
}

/** Implement HTTP client with Axios and RxJS */
export function useHttp() {
  const { createHandleError } = useHttpErrorHandler()
  const { getAuthorizationToken } = useAuth()

  const handleError: HandleError = createHandleError('UseHttp')

  const config = inject('runtimeConfiguration') as RuntimeConfiguration
  const SERVER_ADDRESS = config.serverAddress

  // Set config defaults when creating the instance
  const http = axios.create({
    baseURL: SERVER_ADDRESS,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json',
    // If the request takes longer than 15000ms (15 seconds), the request will be aborted.
    timeout: 15000
  })

  // Alter defaults after instance has been created
  http.defaults.headers.common['Authorization'] = `Bearer ${getAuthorizationToken()}`

  // Add a response interceptor
  http.interceptors.response.use(
    // Do something with response data
    (response) => response,
    (error) => {
      // Retry the request a configurable number of times.
      const { config } = error

      if (!config || !config.retry) return Promise.reject(error)
      else {
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
   * GET: Fetch data from server
   * @param url Api address
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpGET<T>(url: string, config?: RetryConfig) {
    return from(http.get<BaseResponse<T>>(url, config || globalConfig)).pipe(
      catchError(handleError('httpGET', new BaseResponse<T>()))
    )
  }

  /**
   * POST: Pass params and fetch data from server
   * @param url Api address
   * @param params Api paramiters
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpPOST<T>(url: string, params: AxiosRequestConfig, config?: RetryConfig) {
    return from(http.post<BaseResponse<T>>(url, params, config || globalConfig)).pipe(
      take(1),
      catchError(handleError('httpPOST', new BaseResponse<T>()))
    )
  }

  /**
   * PUT: Pass params for updating data from server
   * @param url Api address
   * @param params Api paramiters
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpPUT<T>(url: string, params: AxiosRequestConfig, config?: RetryConfig) {
    return from(http.put<BaseResponse<T>>(url, params, config || globalConfig)).pipe(
      catchError(handleError('httpPUT', new BaseResponse<T>()))
    )
  }

  /**
   * PATCH: Pass params for updating data from server
   * @param url Api address
   * @param params Api paramiters
   * @param config Custom config
   * @returns Observable of response typeS
   */
  function httpPATCH<T>(url: string, params: AxiosRequestConfig, config?: RetryConfig) {
    return from(http.patch<BaseResponse<T>>(url, params, config || globalConfig)).pipe(
      catchError(handleError('httpPATCH', new BaseResponse<T>()))
    )
  }

  /**
   * PUT: Pass params for deleting data from server
   * @param url Api address
   * @param config Custom config
   * @returns Observable of response type
   */
  function httpDELETE<T>(url: string, config?: RetryConfig) {
    return from(http.delete<BaseResponse<T>>(url, config || globalConfig)).pipe(
      catchError(handleError('httpDELETE', new BaseResponse<T>()))
    )
  }

  return { SERVER_ADDRESS, httpGET, httpPOST, httpPUT, httpPATCH, httpDELETE }
}
