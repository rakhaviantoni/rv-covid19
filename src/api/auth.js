import axios from 'axios'

export default ({ url, config }) => {
  const endpoint = ''
  return {
    register: data => axios.post(`${url}${endpoint}/register`, data, config()),
    login: data => axios.post(`${url}${endpoint}/login`, data, config()),
  }
}
