import React, { useContext, useEffect } from 'react'
import { ApiService } from '../service/api'
import { useParams } from 'react-router-dom'
import { MainContext } from '../store/context'
import { Box, Heading, Image } from '@chakra-ui/react'

const Channel = () => {
  const { id } = useParams()
  const { state, dispatch } = useContext(MainContext)
  const channelDetailsUrl = `channels?part=snippet,statistics&id=${id}`
  useEffect(() => {
    ApiService.channelDetails(channelDetailsUrl, dispatch)
  }, [id])
  console.log(state.channelDetails);
  console.log(id);
  return (
    <Box width={'90%'} mx={'auto'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Image src={state.channelDetails[0]?.brandingSettings?.image?.bannerExternalUrl} backgroundSize={'100%'} rounded={'20px'} w={'full'} height={'200px'} objectFit={'cover'} />
      </Box>
      <Box display={'flex'} gap={'20px'}>
        <Image width={'170px'} h={'170px'} objectFit={'cover'} rounded={'full'} src={state.channelDetails[0].snippet.thumbnails.high.url}/>
        <Box>
          <Heading>{state.channelDetails[0]?.snippet.title}</Heading>
          <Box my={'10px'} display={'flex'} alignItems={'center'} gap={'10px'} fontSize={'14px'} color={'gray'}>
            <Box>{state.channelDetails[0]?.snippet.customUrl}</Box>
            <Box>{parseInt(state.channelDetails[0]?.statistics.subscriberCount).toLocaleString()} subscribers</Box>
            <Box>{state.channelDetails[0]?.statistics.videoCount} videos</Box>
          </Box>
          <Box>{state.channelDetails[0]?.snippet.description}</Box>
          <Box>{parseInt(state.channelDetails[0]?.statistics.viewCount).toLocaleString()} views</Box>
          <Box>Joined {state.channelDetails[0]?.snippet.publishedAt.slice(0, 10)}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Channel