let apiUrl = process.env.REACT_APP_API_URL
let apiVersion = process.env.REACT_APP_API_VERSION
let socketUrl = process.env.REACT_APP_SOCKET_URL
let siteUrl = ''

if(process.env.NODE_ENV === 'production'){
  apiUrl = process.env.REACT_APP_API_URL
  siteUrl = process.env.REACT_APP_SITE_URL
}

export const SITE_URL = siteUrl
export const API_VERSION = apiVersion
export const API_URL = `${apiUrl}${apiVersion}`
export const SOCKET_URL = socketUrl

export const SITE_COOKIES = { 
  TOKEN: '_BagidataToken',
  USERNAME: '_BagidataUsername'
}

export const MENU = {
  REGISTER: `${SITE_URL}/register`,
  LOGIN: `${SITE_URL}/login`,
  APP: `${SITE_URL}/app`
}

export const ASSETS = {
  LOGO: {
    brand: `${SITE_URL}/images/logo-bagidata.jpg`,
  }
}