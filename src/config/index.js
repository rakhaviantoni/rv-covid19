let apiUrl = process.env.REACT_APP_API_URL
let apiVersion = process.env.REACT_APP_API_VERSION
let apiKey = process.env.REACT_APP_API_KEY
let siteUrl = '/'

if(!process.env.DEVELOPMENT){
  apiUrl = process.env.REACT_APP_API_URL_PROD
  siteUrl = process.env.REACT_APP_SITE_URL_PROD
}

export const SITE_URL = siteUrl
export const API_VERSION = apiVersion
export const API_KEY = apiKey
export const API_URL = `${apiUrl}${apiVersion}`

export const SITE_COOKIES = { 
}

export const MENU = {
  APP: `${SITE_URL}/app`
}

export const ASSETS = {
  LOGO: {
    brand: '',
  }
}