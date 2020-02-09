let apiUrl = process.env.REACT_APP_API_URL
let apiVersion = process.env.REACT_APP_API_VERSION
let apiKey = process.env.REACT_APP_API_KEY
let siteUrl = ''

if(process.env.NODE_ENV === 'production'){
  apiUrl = process.env.REACT_APP_API_URL
  siteUrl = process.env.REACT_APP_SITE_URL
}

export const SITE_URL = siteUrl
export const API_VERSION = apiVersion
export const API_KEY = apiKey
export const API_URL = `${apiUrl}${apiVersion}`

export const SITE_COOKIES = { 
  TOKEN: '_CarRentalToken',
  USERNAME: '_CarRentalUsername'
}

export const MENU = {
  REGISTER: `${SITE_URL}/register`,
  LOGIN: `${SITE_URL}/login`,
  APP: `${SITE_URL}/app`
}

export const ASSETS = {
  LOGO: {
    brand: '',
  }
}