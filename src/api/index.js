import { API_URL, API_KEY, SITE_COOKIES, MENU } from '../config';
import { setCookie } from '../utils/cookies';
import Car from './car';
import Reservation from './reservation';

export const configApi = ({ contentType } = {}) => {
  let params = {
    headers: {
      'Content-Type': contentType || 'application/json',
      'x-api-key': API_KEY,
    },
  }
  return params
}

export const configApiCustomProd = ({ contentType } = {}) => {
  let params = {
    headers: {
      'Content-Type': contentType || 'application/json',
      'x-api-key': API_KEY,
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

const params = { url: API_URL, config: configApi, configCustom: configApiCustomProd, defaultParams: { } }
// export const AuthApi = Auth(params)
export const CarApi = Car(params)
export const ReservationApi = Reservation(params)
