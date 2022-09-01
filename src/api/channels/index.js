import { httpGet } from 'api/http.service'
import { API_BASE_URL } from 'constants/api.constants'
import { getHeaders } from 'api/request.headers'

const headers = getHeaders()

export const getChannelDetails = async (channedId = '') => {
  const url = `${API_BASE_URL}/channels`
  const params = { part: 'snippet,statistics', id: channedId }

  return await httpGet(url, params, headers)
}

export const getChannelVideos = async (channelId = '') => {
  const url = `${API_BASE_URL}/search`
  const params = {
    channelId: channelId,
    part: 'snippet,id',
    maxResults: '50',
  }

  return await httpGet(url, params, headers)
}
