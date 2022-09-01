import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Divider, Grid, Stack, Typography } from 'components/basic'
import VideoCard from 'components/advanced/VideoCard'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { getChannelDetails, getChannelVideos } from 'api/channels'
import { CHANNEL_COVER_URL } from 'constants/app.constants'

const ChannelDetails = () => {
  const params = useParams()
  const [channelDetails, setChannelDetails] = useState(null)
  const [channelVideos, setChannelVideos] = useState([])

  const { channelId } = params

  useEffect(() => {
    loadChannelDetails(channelId)
    loadChannelVideos(channelId)
  }, [channelId])

  const loadChannelDetails = async channelId => {
    try {
      const data = await getChannelDetails(channelId)
      setChannelDetails(data.items[0])
    } catch (error) {
      console.log(error)
    }
  }

  const loadChannelVideos = async channelId => {
    try {
      const data = await getChannelVideos(channelId)
      setChannelVideos(data.items)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <img
          src={CHANNEL_COVER_URL}
          alt={channelDetails?.snippet?.title}
          style={{ height: 200, width: '100%' }}
        />
      </Box>
      <Grid container spacing={2} alignItems='center' sx={{ my: 2 }}>
        <Grid item>
          <img
            src={channelDetails?.snippet?.thumbnails?.default?.url}
            alt={channelDetails?.snippet?.title}
            style={{ borderRadius: '50%', border: '2px solid black' }}
          />
        </Grid>
        <Grid item>
          <Typography variant='h6'>
            {channelDetails?.snippet?.title}
            <CheckCircleIcon fontSize='12' sx={{ color: 'gray', ml: 1 }} />
          </Typography>
          <Typography variant='caption'>
            {channelDetails?.statistics?.subscriberCount} subscribers
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Stack
        direction='row'
        alignItems='flex-start'
        justifyContent='flex-start'
        flexWrap='wrap'
        gap={1}
      >
        {channelVideos?.map((v, idx) => {
          if (v.id.videoId) return <VideoCard video={v} key={idx} />
          else return null
        })}
      </Stack>
    </Box>
  )
}

export default ChannelDetails
