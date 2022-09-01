import { API_KEY } from 'constants/envar.constants'
import { API_DOMAIN } from 'constants/api.constants'

export const getHeaders = () => ({
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': API_DOMAIN,
})
