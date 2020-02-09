import axios from 'axios'

export default ({ url, config, defaultParams }) => {
  const endpoint = '/reservations/'
  return {
    reserve: data => axios.post(`${url}${endpoint}reserve`, data, config()),
    cancel: id => axios.delete(`${url}${endpoint}cancel/${id}`, '', config())
  }
}