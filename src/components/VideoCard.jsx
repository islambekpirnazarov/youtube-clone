import { Box, Card, CardBody, HStack, Image, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import moment from 'moment'
import { MainContext } from '../store/context'
import { Link } from 'react-router-dom'
const VideoCard = ({ video }) => {
  const { state, dispatch } = useContext(MainContext)
  const { colorMode, toggleColorMode } = useColorMode()
  const loadingBg = useColorModeValue('gray.200', 'gray.900')
  return (
    <>
      {state.isVideosLoading ?
        <Box>
          <Box w={'full'} h={'200px'} bg={loadingBg} rounded={'12px'}></Box>
          <Box p={'10px'}>
            <Box display={'flex'} gap={'10px'}>
              <Box flex={'1'} rounded={'full'} width={'40px'} h={'40px'} bg={loadingBg}></Box>
              <Box flex={'7'} display={'flex'} flexDirection={'column'} gap={'10px'}>
                <Box width={'full'} h={'18px'} rounded={'3px'} bg={loadingBg}></Box>
                <Box width={'50%'} h={'18px'} rounded={'3px'} bg={loadingBg}></Box>
              </Box>
            </Box>
          </Box>
        </Box>
        :
        <Link to={`/video/${video?.id?.videoId || video?.id?.playlistId}`}>
          <Box lineHeight={'20px'} border={0} overflow={'hidden'}>
            <Box>
              <Image rounded={'12px'} src={video?.snippet?.thumbnails?.high?.url || video?.snippet?.thumbnails?.medium?.url || video?.snippet?.thumbnails?.default?.url} alt={video?.snippet?.title} w={{base : 'full', sm : '360px'}} h={'200px'} objectFit={'cover'} />
            </Box>
            <Link to={`/channel/${video?.id?.channelId}`}>
              <Box p={'10px'}>
                <Box>
                    <Box fontWeight={'600'} noOfLines={2}>{video?.snippet?.title}</Box>
                    <Box fontSize={'14px'} color={'gray'}>{video?.snippet?.channelTitle}</Box>
                    <Box color={'gray'}>{moment(video?.snippet?.publishedAt).fromNow()}</Box>
                </Box>
              </Box>
            </Link>
          </Box>
        </Link>}
    </>
  )
}

export default VideoCard