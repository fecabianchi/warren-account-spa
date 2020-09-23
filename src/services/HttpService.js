import axios from 'axios'

export default (endpoint, requestConfig) => {
  const defaultConfig = {
    ...requestConfig,
    baseURL: setBaseURL(endpoint),
  }

  const instance = axios.create(defaultConfig)
  instance.interceptors.request.use(authorizationInterceptor)

  return instance
}

const authorizationInterceptor = async (config) => {
  if (!config.headers.Authorization) {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = token
    }
  }

  return config
}

const setBaseURL = (endpoint) => `${process.env.REACT_APP_BASE_URL}${endpoint}`
