import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'

import { Box, Grid, Stack, Typography } from 'components/basic'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import VideoCard from 'components/advanced/VideoCard'
import ChannelCard from 'components/advanced/ChannelCard'

import { getRelatedVideos, getVideoDetails } from 'api/videos'

import { PATH } from 'constants/path.contants'
import { getReadableDate } from 'utils'

const VideoDetails = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [videoDetails, setVideoDetails] = useState()
  const [relatedVideos, setRelatedVideos] = useState()

  const { videoId } = params

  useEffect(() => {
    loadVideoDetails()
    loadRelatedVideos()
  }, [videoId])

  const loadVideoDetails = async () => {
    try {
      const data = await getVideoDetails(videoId)
      setVideoDetails(data.items[0])
    } catch (error) {
      console.log(error)
    }
  }

  const loadRelatedVideos = async () => {
    try {
      const data = await getRelatedVideos(videoId)
      setRelatedVideos(data.items)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoToChannel = channelId => {
    navigate(`${PATH.CHANNEL}/${channelId}`)
  }

  if (!videoDetails) return <></>

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            maxHeight: { xs: 'auto', md: 'calc(100vh - 80px)' },
            overflow: 'auto',
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoDetails?.id}`}
            controls
            playing
            width='100%'
          />
          <Typography variant='h6' sx={{ my: 1 }}>
            {videoDetails?.snippet?.title}
          </Typography>
          <Grid container alignItems='center' spacing={1} sx={{ my: 1 }}>
            <Grid item>
              <Typography variant='subtitle2'>
                {parseInt(videoDetails?.statistics?.likeCount).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item>
              <ThumbUpOffAltIcon sx={{ color: 'gray' }} />
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>
                {parseInt(videoDetails?.statistics?.viewCount).toLocaleString()}{' '}
                views
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>
                {getReadableDate(new Date(videoDetails?.snippet?.publishedAt))}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant='body2' sx={{ my: 2 }}>
            {videoDetails?.snippet?.description}
          </Typography>
          <Box sx={{ border: '2px solid lightgray', p: 1 }}>
            <Typography
              variant='body2'
              color='primary'
              onClick={() =>
                handleGoToChannel(videoDetails?.snippet?.channelId)
              }
              sx={{ cursor: 'pointer' }}
            >
              {videoDetails?.snippet?.channelTitle}
              <CheckCircleIcon fontSize='12' sx={{ color: 'gray', ml: 1 }} />
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            maxHeight: { xs: 'auto', md: 'calc(100vh - 80px)' },
            overflow: 'auto',
          }}
        >
          <Stack direction='row' flexWrap='wrap'>
            {relatedVideos?.map((v, idx) => {
              if (v.id.videoId && v.snippet)
                return <VideoCard video={v} key={idx} />
              if (v.id.channelId && v.snippet)
                return <ChannelCard channed={v} key={idx} />
              else return null
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default VideoDetails
