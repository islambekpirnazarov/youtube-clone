import { Box, Grid, GridItem } from '@chakra-ui/react';
import React, { useContext } from 'react'
import VideoCard from './VideoCard';
import { MainContext } from '../store/context';
import ChannelCard from './ChannelCard';

const Videos = () => {
  const {state, dispatch} = useContext(MainContext)
  
  return (
    <Box my={'40px'} w={'100%'} display={'grid'}  gridTemplateColumns={{sm: '1fr 1fr', md: '1fr 1fr 1fr' , lg: '1fr 1fr 1fr 1fr'}} gap={'15px'}>
      {state.videos.map(video => (
        <Box  key={video.id.videoId || video.id.channelId || video.id.playlistId}>
          {video.id.videoId  && <VideoCard video={video}/>}
          {video.id.channelId && <ChannelCard video={video}/>}
          {video.id.playlistId && <VideoCard video={video}/>}
        </Box>
      ))}
    </Box>
  )
}

export default Videos