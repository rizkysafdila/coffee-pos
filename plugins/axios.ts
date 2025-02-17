// Axios
import defaultAxios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const axios = defaultAxios.create({
    baseURL: config.public.apiUrl,
    timeout: 15000,
  })

  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      return config
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    },
  )

  return {
    provide: {
      axios,
    },
  }
})
