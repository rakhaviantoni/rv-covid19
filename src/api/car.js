import axios from 'axios'

export default ({ url, config, defaultParams }) => {
  const endpoint = '/cars/'
  return {
    list: () => axios.get(`${url}${endpoint}`, config()),
    status: data => axios.get(`${url}${endpoint}status/${data.date}`, config()),
    add: data => axios.post(`${url}${endpoint}`, data, config()),
    update: data => axios.put(`${url}${endpoint}`, data, config()),
    delete: data => axios.delete(`${url}${endpoint}`, data, config())
  }
}