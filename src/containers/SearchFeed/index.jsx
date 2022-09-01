import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Stack } from 'components/basic'
import VideoCard from 'components/advanced/VideoCard'
import ChannelCard from 'components/advanced/ChannelCard'

import { getVideosByCategory } from 'api/videos'

const SearchFeed = () => {
  const params = useParams()
  const [searchResults, setSearchResults] = useState()

  const loadSearchResults = useRef(() => {})

  const { searchTerm } = params

  useEffect(() => {
    loadSearchResults.current()
  }, [searchTerm])

  loadSearchResults.current = async () => {
    try {
      const data = await getVideosByCategory(searchTerm)
      setSearchResults(data.items)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='flex-start'
        alignItems='flex-start'
        gap={1}
      >
        {searchResults?.map((result, idx) => {
          if (result.id.videoId) return <VideoCard video={result} key={idx} />
          if (result.id.channedId)
            return <ChannelCard channel={result} key={idx} />
          else return null
        })}
      </Stack>
    </Box>
  )
}

export default SearchFeed
