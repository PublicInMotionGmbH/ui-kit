import axios from 'axios'

import { getLanguage } from './locale'
import packageJson from '../package.json'

const getClient = (addLanguage, additionalUrl) => {
  const version = window.navigator.platform.replace(' ', '_') + ' OnePageBooking ' + packageJson.version
  const language = getLanguage()
  let baseUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : '/'
  if (addLanguage) baseUrl += language.concat('/')
  if (additionalUrl) baseUrl += additionalUrl

  return axios.create({
    baseURL: baseUrl,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Version: version,
      'Content-Type': 'application/json'
    }
  })
}
const mapiClient = getClient(true, 'mapi')
const client = getClient(false)

export { getClient, client, mapiClient }
