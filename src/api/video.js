import axios from 'axios'

export default ({ url, config, defaultParams }) => {
  const endpoint = '/video'
  return {
    list: () => axios.get(`${url}${endpoint}`, config()),
  }
}