import React from 'react'
import { Link } from 'react-router-dom'
import { PATH } from 'constants/path.contants'

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from 'components/basic'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ChannelCard = ({ channel: { id, snippet } }) => {
  return (
    <Link
      to={`${PATH.CHANNEL}/${id.channelId}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        variant='outlined'
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
        }}
      >
        <CardMedia
          component='img'
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.channelTitle}
          sx={{
            width: 180,
            height: 180,
            objectFit: 'contain',
            borderRadius: '50%',
            border: '2px solid lightgray',
          }}
        />
        <CardContent>
          <Grid container alignItems='center'>
            <Grid item>
              <Typography variant='h6'>{snippet?.channelTitle}</Typography>
            </Grid>
            <Grid item>
              <CheckCircleIcon fontSize='12' sx={{ color: 'gray', ml: 1 }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ChannelCard
