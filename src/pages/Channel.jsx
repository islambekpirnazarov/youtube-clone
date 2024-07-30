import React, { useContext, useEffect } from 'react'
import { ApiService } from '../service/api'
import { useParams } from 'react-router-dom'
import { MainContext } from '../store/context'
import { Box, Heading, Image, Spinner } from '@chakra-ui/react'
import Videos from '../components/Videos'

const Channel = () => {
  const { id } = useParams()
  const { state, dispatch } = useContext(MainContext)
  const url = `search?channelId=${id}&part=snippet`
  const channelDetailsUrl = `channels?part=snippet,statistics&id=${id}`
  useEffect(() => {
    ApiService.channelDetails(channelDetailsUrl, dispatch)
    ApiService.fetching(url, dispatch)
  }, [id])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  // console.log(state.channelDetails);
  // console.log(state.videos);
  // console.log(id);
  return (
    <Box width={'90%'} mx={'auto'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      {state.isVideosLoading ?
        <Box w={'full'} h={'30vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          /></Box>
        :
        <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Image src={state.channelDetails?.[0]?.brandingSettings?.image?.bannerExternalUrl} backgroundSize={'150%'} rounded={'20px'} w={'full'} height={{base : '100px', sm : '150px', md : '200px'}} objectFit={'cover'} />
          </Box>
          <Box display={'flex'} flexDirection={{base : 'column', sm : 'row'}} gap={'20px'} alignItems={{base : 'center', md : 'start'}}>
            <Image width={{base : '100px', md : '170px'}} h={{base : '100px', md : '170px'}} objectFit={'cover'} rounded={'full'} src={state.channelDetails[0]?.snippet?.thumbnails?.high?.url} />
            <Box lineHeight={{base : '15px', md : '20px'}}>
              <Heading fontSize={{base : '22px', md : '30px'}}>{state.channelDetails?.[0]?.snippet.title}</Heading>
              <Box my={'10px'} display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={'10px'} fontSize={'14px'} color={'gray'}>
                <Box>{state.channelDetails[0]?.snippet.customUrl}</Box>
                <Box>{parseInt(state.channelDetails[0]?.statistics.subscriberCount).toLocaleString()} subscribers</Box>
                <Box>{state.channelDetails[0]?.statistics.videoCount} videos</Box>
              </Box>
              <Box fontSize={{base : '14px', md : '16px'}}>{state.channelDetails[0]?.snippet.description}</Box>
              <Box fontSize={{base : '14px', md : '16px'}}>{parseInt(state.channelDetails[0]?.statistics.viewCount).toLocaleString()} views</Box>
              <Box fontSize={{base : '14px', md : '16px'}}>Joined {state.channelDetails[0]?.snippet.publishedAt.slice(0, 10)}</Box>
            </Box>
          </Box>
        </Box>}
      <Videos />
    </Box>
  )
}

export default Channel