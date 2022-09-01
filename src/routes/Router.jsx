import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PATH, ROUTE_PARAMS } from 'constants/path.contants'

import HomeFeed from 'containers/HomeFeed'
import VideoDetails from 'containers/VideoDetails'
import ChannelDetails from 'containers/ChannelDetails'
import SearchFeed from 'containers/SearchFeed'

const Router = () => {
  return (
    <Routes>
      <Route path={PATH.HOME_FEED} element={<HomeFeed />} />
      <Route
        path={`${PATH.VIDEO}${ROUTE_PARAMS.VIDEO_ID}`}
        element={<VideoDetails />}
      />
      <Route
        path={`${PATH.CHANNEL}${ROUTE_PARAMS.CHANNEL_ID}`}
        element={<ChannelDetails />}
      />
      <Route
        path={`${PATH.SEARCH_FEED}${ROUTE_PARAMS.SEARCH_TERM}`}
        element={<SearchFeed />}
      />
    </Routes>
  )
}

export default Router
