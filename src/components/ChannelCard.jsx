import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ChannelCard = ({ video }) => {
    return (
        <Link to={`/channel/${video?.id?.channelId}`}>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                <Box display={'flex'} justifyContent={'center'}>
                    <Image width={'200px'} rounded={'full'} src={video?.snippet?.thumbnails?.medium.url} />
                </Box>
                <Box textAlign={'center'} fontWeight={'700'} fontSize={'18px'}>{video?.snippet?.title}</Box>
            </Box>
        </Link>
    )
}

export default ChannelCard