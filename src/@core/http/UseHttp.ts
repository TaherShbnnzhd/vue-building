/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { inject } from 'vue'
import { catchError } from 'rxjs'
import Axios from 'axios-observable'
import type { AxiosRequestConfig } from 'axios'
import type { RuntimeConfiguration } from '../plugins/runtimeConfiguration'
import { useHttpErrorHandler, type HandleError } from './UseHttpErrorHandler'
import { BaseResponse } from '@shared/models/baseResponse'

/** Implement HTTP client with Axios and RxJS */
export function useHttp() {
  const { createHandleError } = useHttpErrorHandler()

  const config = inject('runtimeConfiguration') as RuntimeConfiguration
  const SERVER_ADDRESS = config.serverAddress

  const handleError: HandleError = createHandleError('UseHttp')

  const httpClient = Axios.create({
    baseURL: SERVER_ADDRESS,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  })

  /**
   * GET: Fetch data from server
   * @param type Api response type
   * @param url Api address
   * @returns Observable of response type
   */
  function httpGET<T>(type: { new (): T }, url: string) {
    return httpClient
      .get<BaseResponse<T>>(url)
      .pipe(catchError(handleError('httpGET', new BaseResponse<T>())))
  }

  /**
   * POST: Pass params and fetch data from server
   * @param type Api response type
   * @param url Api address
   * @param params Api paramiters
   * @returns Observable of response type
   */
  function httpPOST<T>(url: string, params: AxiosRequestConfig) {
    return httpClient
      .post<BaseResponse<T>>(url, params)
      .pipe(catchError(handleError('httpPOST', new BaseResponse<T>())))
  }

  /**
   * PUT: Pass params for updating data from server
   * @param type Api response type
   * @param url Api address
   * @param params Api paramiters
   * @returns Observable of response type
   */
  function httpPUT<T>(url: string, params: AxiosRequestConfig) {
    return httpClient
      .put<BaseResponse<T>>(url, params)
      .pipe(catchError(handleError('httpPUT', new BaseResponse<T>())))
  }

  /**
   * PATCH: Pass params for updating data from server
   * @param type Api response type
   * @param url Api address
   * @param params Api paramiters
   * @returns Observable of response type
   */
  function httpPATCH<T>(url: string, params: AxiosRequestConfig) {
    return httpClient
      .patch<BaseResponse<T>>(url, params)
      .pipe(catchError(handleError('httpPATCH', new BaseResponse<T>())))
  }

  /**
   * PUT: Pass params for deleting data from server
   * @param type Api response type
   * @param url Api address
   * @param params Api paramiters
   * @returns Observable of response type
   */
  function httpDELETE<T>(url: string, params: AxiosRequestConfig) {
    return httpClient
      .delete<BaseResponse<T>>(url, params)
      .pipe(catchError(handleError('httpDELETE', new BaseResponse<T>())))
  }

  return {
    SERVER_ADDRESS,
    httpGET,
    httpPOST,
    httpPUT,
    httpPATCH,
    httpDELETE
  }
}
