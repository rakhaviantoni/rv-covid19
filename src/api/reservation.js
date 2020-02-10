import axios from 'axios'

export default ({ url, config, defaultParams }) => {
  const endpoint = '/reservations/'
  return {
    reserve: data => axios.post(`${url}${endpoint}reserve`, data, config()),
    cancel: params => axios.delete(`${url}${endpoint}cancel`, { ...config(), params: { ...defaultParams, ...params } })
  }
}