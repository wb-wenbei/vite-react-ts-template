import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { notification } from 'antd'
import useUserStore from '@/stores/user'

const BASE_URL = ''

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use(
  (config) => {
    if (config.params) config.params = deleteNullParams(config.params)
    if (config.data) config.data = deleteNullParams(config.data)

    const token = useUserStore.getState().token
    if (token) config.headers['e-token'] = `${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  <T>(response: AxiosResponse<ApiRes<T>>) => {
    const { code, msg, data } = response.data

    if (code === 401) {
      notification.error({
        message: '登陆过期',
        description: '您的登陆凭证已过期，请重新登陆！',
      })
      location.replace('#/login')
    }

    if (code !== 200) {
      showNotify(response.config as AxiosRequestConfig & { errorTitle: string }, msg)

      return Promise.reject(msg)
    }

    return data
  },
  (error) => {
    const { config, data } = error.response

    if (data?.code === 401) {
      notification.error({
        message: '登陆过期',
        description: '您的登陆凭证已过期，请重新登陆！',
      })
      location.replace('#/login')
    } else {
      showNotify(config, data?.msg || error.message)
    }

    return Promise.reject(data?.msg || error.message)
  }
)

const showNotify = (config: AxiosRequestConfig & { errorTitle: string }, msg = '') => {
  const { method, errorTitle } = config

  let messageTitle = '请求失败'

  if (method === 'post' || method === 'put') messageTitle = '保存失败'

  if (method === 'delete') messageTitle = '删除失败'

  if (errorTitle) messageTitle = errorTitle

  notification.error({
    message: messageTitle,
    description: msg,
  })
}

export default http

export const get = <T>(url: string, params?: object, errorTitle?: string): Promise<T> => {
  return http.get(url, { params, errorTitle } as AxiosRequestConfig)
}

export const post = <T>(url: string, data?: object, errorTitle?: string): Promise<T> => {
  return http.post(url, data, { errorTitle } as AxiosRequestConfig)
}

export const put = <T>(url: string, data?: object, errorTitle?: string): Promise<T> => {
  return http.put(url, data, { errorTitle } as AxiosRequestConfig)
}

export const del = <T>(url: string, params?: object, data?: object): Promise<T> => {
  return http.delete(url, { params, data })
}

function deleteNullParams(params: { [key: string]: unknown }) {
  for (const key in params) {
    if (params[key] === null || params[key] === undefined || params[key] === '') {
      delete params[key]
    }
  }
  return params
}
