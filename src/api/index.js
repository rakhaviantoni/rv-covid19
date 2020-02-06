import { API_URL, SITE_COOKIES, MENU } from '../config';
import { getCookie, setCookie } from '../utils/cookies';
import Auth from './auth'
import Video from './video';

export const configApi = ({ contentType } = {}) => {
  let params = {
    headers: {
      'Content-Type': contentType || 'application/json',
      'Authorization': `${getCookie(SITE_COOKIES.TOKEN)}`,
    },
  }
  return params
}

export const configApiCustomProd = ({ contentType } = {}) => {
  let params = {
    headers: {
      'Content-Type': contentType || 'application/json',
      'Authorization': `${getCookie(SITE_COOKIES.TOKEN)}`,
    },
  }
  return params
}

// Destroy access
export const BACK_TO_LOGIN = (isExpired = false) => {
  Object.keys(SITE_COOKIES).forEach( async key => {
    await setCookie(SITE_COOKIES[key], null, -1)
  })
  const target = isExpired ? MENU.LOGIN : MENU.APP
  window.location.reload(true)
  window.location = target
}

// For handle 401 status
// axios.interceptors.response.use(
//   response => response,
//   (err) => {
//     if (err.response && err.response.status === 401)
//       BACK_TO_LOGIN(true)
//     return Promise.reject(err)
//   },
// )

const params = { url: API_URL, config: configApi, configCustom: configApiCustomProd, defaultParams: { limit: 10 } }
export const AuthApi = Auth(params)
export const VideoApi = Video(params)
