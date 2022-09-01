import { httpGet } from 'api/http.service'
import { API_BASE_URL } from 'constants/api.constants'
import { getHeaders } from 'api/request.headers'

const headers = getHeaders()

export const getVideosByCategory = async (category = '') => {
  const url = `${API_BASE_URL}/search`
  const params = {
    maxResults: '50',
    part: 'snippet',
    q: category,
  }

  return await httpGet(url, params, headers)
}

export const getVideoDetails = async (videoId = '') => {
  const url = `${API_BASE_URL}/videos`
  const params = {
    part: 'contentDetails,snippet,statistics',
    id: videoId,
  }

  return await httpGet(url, params, headers)
}

export const getRelatedVideos = async (videoId = '') => {
  const url = `${API_BASE_URL}/search`
  const params = {
    part: 'snippet',
    relatedToVideoId: videoId,
    type: 'video',
  }

  return await httpGet(url, params, headers)
}
