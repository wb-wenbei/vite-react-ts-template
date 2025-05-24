import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
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
    if (token) config.headers['X-Authorization'] = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    if (response.status !== 200) {
      showNotify()
      return Promise.reject(response.statusText)
    }

    return response.data
  },
  (error) => {
    if (!error.response) {
      // showNotify(error.code, error.message)
      return Promise.reject(false)
    }

    const { data } = error.response
    const { status, message } = data as ApiError

    showNotify(status, message)

    if (status === 401) {
      useUserStore.getState().clear()
      window.location.href = '/login'
    }

    return Promise.reject(data as ApiError)
  }
)

const showNotify = (status?: number, description = 'Server Error ！') => {
  notification.error({
    message: `Reuest Error ${status ? status : ''}`,
    description,
  })
}

export default http

export const get = <T>(url: string, params?: object): Promise<T> => {
  return http.get(url, { params })
}

export const post = <T>(url: string, data?: object): Promise<T> => {
  return http.post(url, data)
}

export const put = <T>(url: string, data?: object): Promise<T> => {
  return http.put(url, data)
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
