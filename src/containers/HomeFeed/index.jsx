import React, { useState, useEffect, useRef } from 'react'

import { Box, Stack, Typography } from 'components/basic'
import VideoCard from 'components/advanced/VideoCard'
import ChannelCard from 'components/advanced/ChannelCard'

import { useGlobalState } from 'contexts/globalStateContext'
import { getVideosByCategory } from 'api/videos'

const HomeFeed = () => {
  const {
    state: { videosCategory },
  } = useGlobalState()

  const loadHomeFeedVideos = useRef(() => {})

  const [videos, setVideos] = useState([])

  useEffect(() => {
    loadHomeFeedVideos.current()
  }, [videosCategory])

  loadHomeFeedVideos.current = async () => {
    try {
      const data = await getVideosByCategory(videosCategory)
      setVideos(data.items)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {videosCategory}
      </Typography>
      <Box>
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='flex-start'
          alignItems='flex-start'
          gap={1}
        >
          {videos?.map((v, idx) => {
            if (v.id.videoId) return <VideoCard video={v} key={idx} />
            else if (v.id.channelId)
              return <ChannelCard channel={v} key={idx} />
            else return null
          })}
        </Stack>
      </Box>
    </Box>
  )
}

export default HomeFeed
