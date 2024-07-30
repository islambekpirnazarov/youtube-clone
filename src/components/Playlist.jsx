import { Box, Image } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

const Playlist = ({ video }) => {
    
    return (
        <Link to={`/playlist/${video?.id?.playlistId}`}>
            <Box  lineHeight={'20px'} border={0} overflow={'hidden'}>

                <Box position={'relative'}>
                    <Box position={'absolute'} color={'white'} right={'10px'} bottom={'0px'} bg={'black'} p={'5px'} rounded={'10px'} opacity={'0.7'}>Playlist</Box>
                    <Image rounded={'12px'} src={video?.snippet?.thumbnails?.high?.url || video?.snippet?.thumbnails?.medium?.url || video?.snippet?.thumbnails?.default?.url} alt={video?.snippet?.title} w={{ base: 'full', sm: '360px' }} h={'200px'} objectFit={'cover'} />
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
        </Link>
    )
}

export default Playlist