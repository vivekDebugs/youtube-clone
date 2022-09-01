import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from 'constants/path.contants'

import { Typography, Card, CardMedia, CardContent } from 'components/basic'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const VideoCard = ({ video }) => {
  const navigate = useNavigate()

  const handleGoToChannel = (e, channelId) => {
    e.stopPropagation()
    navigate(`${PATH.CHANNEL}/${channelId}`)
  }

  const handleGoToVideo = video => {
    navigate(`${PATH.VIDEO}/${video.id.videoId}`)
  }

  return (
    <Card
      sx={{ width: 300, m: 1, cursor: 'pointer' }}
      variant='outlined'
      onClick={() => handleGoToVideo(video)}
    >
      <CardMedia
        component='img'
        image={video?.snippet?.thumbnails?.high?.url}
        alt={video?.snippet?.title}
        sx={{ width: '100%', objectFit: 'contain' }}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary' noWrap>
          {video?.snippet?.title}
        </Typography>
        <Typography
          variant='body1'
          onClick={e => handleGoToChannel(e, video?.snippet?.channelId)}
        >
          {video?.snippet?.channelTitle}
          <CheckCircleIcon fontSize='12' sx={{ color: 'gray', ml: 1 }} />
        </Typography>
      </CardContent>
    </Card>
  )
}

export default VideoCard
