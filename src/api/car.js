import axios from 'axios'

export default ({ url, config, defaultParams }) => {
  const endpoint = '/cars/'
  return {
    list: () => axios.get(`${url}${endpoint}`, config()),
    status: (data, params) => axios.get(`${url}${endpoint}status/${data.date}`, { ...config(), params: { ...defaultParams, ...params } }),
    add: data => axios.post(`${url}${endpoint}`, data, config()),
    update: data => axios.put(`${url}${endpoint}${data.old_registration_no}`, data, config()),
    delete: data => axios.delete(`${url}${endpoint}${data.registration_no}`, config())
  }
}