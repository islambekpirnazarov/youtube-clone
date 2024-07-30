import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MainContext } from '../store/context';
import { ApiService } from '../service/api';
import { Box, Button, Heading, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { BiComment, BiLike, BiShow } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';

const PlaylistDetails = () => {
    const { id } = useParams()
    const { state, dispatch } = useContext(MainContext)
    const { colorMode, toggleColorMode } = useColorMode()
    const loadingBg = useColorModeValue('gray.200', 'gray.900')
    const url = `playlistItems?part=snippet&playlistId=${id}`
    const [playlistDetailsId, setPlaylistDetailsId] = useState(state.videos?.[0]?.snippet?.resourceId?.videoId)
    const [playlistChannelDetails, setPlaylistChannelDetails] = useState(state.videos?.[0]?.snippet?.channelId)
    const channelUrl = `channels?part=snippet,statistics&id=${playlistChannelDetails}`
    const videoDetailsUrl = `videos?part=contentDetails,snippet,statistics&id=${playlistDetailsId}`
    const commentsUrl = `commentThreads?part=snippet&videoId=${playlistDetailsId}`
    const [showComments, setShowComments] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [detailsIndex, setDetailsIndex] = useState(0)

    console.log(playlistDetailsId);
    useEffect(() => {
        ApiService.fetching(url, dispatch)
    }, [id])

    useEffect(() => {
        setPlaylistDetailsId(state.videos?.[0]?.snippet?.resourceId?.videoId)
    }, [])

    useEffect(() => {
        ApiService.channelDetails(channelUrl, dispatch)
        ApiService.getVideoDetails(videoDetailsUrl, dispatch)
        ApiService.getCommnetDetails(commentsUrl, dispatch)
    }, [playlistDetailsId])

    // console.log(state.videos);
    // console.log(state.channelDetails);

    const video = state.videos?.find(item => item?.snippet?.resourceId?.videoId == playlistDetailsId)

    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text?.replace(urlRegex, function (url) {
            return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }


    var text = urlify(state.videoDetails?.[0]?.snippet?.description);
    return (
        <Box display={'flex'} flexDirection={{ base: 'column', md: 'row' }} gap={'20px'}>
            <Box w={{ base: '100%', md: '70%' }}>
                <Box rounded={'20px'} h={{ base: '250px', sm: '400px', md: '500px' }}>
                    <ReactPlayer className='react-player' height={'100%'} width={'100%'} url={`https://youtube.com/watch?v=${playlistDetailsId}`} controls />
                </Box>
                {video &&
                    <Box>
                        <Heading my={'10px'} as={'h4'} fontSize={'25px'}>{video?.snippet?.title}</Heading>
                        <Link to={`/channel/${video?.snippet?.channelId}`}>
                            <Box display={'flex'} alignItems={'center'} gap={'10px'} >
                                <Image src={state.channelDetails?.[0]?.snippet?.thumbnails?.high?.url} w={'50px'} h={'50px'} rounded={'full'} />
                                <Box>
                                    <Box fontWeight={'700'}>{video.snippet?.channelTitle}</Box>
                                    <Box fontSize={'14px'}>{parseInt(state.channelDetails?.[0]?.statistics?.subscriberCount).toLocaleString()} subscribers</Box>
                                </Box>
                            </Box>
                        </Link>
                        <Box fontSize={{base : '13px', md : '16px'}} display={'flex'} alignItems={'center'} gap={'10px'}>
                            <Box fontWeight={'500'} display={'flex'} alignItems={'center'} gap={'5px'}><Box fontSize={'25px'}><BiShow /></Box> {parseInt(state.videoDetails?.[detailsIndex]?.statistics?.viewCount).toLocaleString()} Views</Box>
                            <Box fontWeight={'500'} display={'flex'} alignItems={'center'} gap={'5px'}><Box fontSize={'25px'}><AiOutlineLike /></Box> {parseInt(state.videoDetails?.[detailsIndex]?.statistics?.likeCount).toLocaleString()} Likes</Box>
                            <Box fontWeight={'500'} display={'flex'} alignItems={'center'} gap={'5px'}><Box fontSize={'25px'}><BiComment /></Box> {parseInt(state.videoDetails?.[detailsIndex]?.statistics?.commentCount).toLocaleString()} Comments</Box>
                        </Box>
                        <Box my={'20px'} bg={'gray.200'} pos={'relative'} pt={'15px'} pl={'15px'} pr={'30px'} rounded={'15px'} noOfLines={!showDescription && 2}>
                            <div className="description" dangerouslySetInnerHTML={{ __html: text }} />
                            <Button onClick={() => setShowDescription(prev => prev ? !prev : !prev)} pos={'absolute'} top={!showDescription && '25px'} bottom={showDescription && 0} right={0} bg={'transparent'} _hover={{ bg: 'transparent' }}>{showDescription ? <Text>show less</Text> : <Text>more</Text>}</Button>
                        </Box>
                        <Box>
                            <Box display={'flex'} gap={'5px'} alignItems={'center'}>
                                <Box my={'10px'} fontWeight={'600'} fontSize={'20px'}>{parseInt(state.videoDetails[0]?.statistics?.commentCount).toLocaleString()} Comments</Box>
                                <Button variant={'autline'} display={{ base: "inline-block", md: 'none' }} onClick={() => setShowComments(prev => prev ? !prev : !prev)}>Show More</Button>
                            </Box>
                            <Box display={{ base: showComments ? 'inline-block' : 'none', md: 'inline-block' }}>
                                {state?.commentDetails?.map(comment => (
                                    <Box key={comment?.id} display={'flex'} gap={'10px'} mb={'15px'}>
                                        <Box minW={'40px'}>
                                            <Image src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} w={'40px'} h={'40px'} rounded={'full'} />
                                        </Box>
                                        <Box>
                                            <Box display={'flex'} alignItems={'center'} gap={'3px'}>
                                                <Box fontWeight={'bold'} fontSize={{ base: '12px', sm: '14px' }}>{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</Box>
                                                <Box fontSize={{ base: '12px', sm: '14px' }}>{moment(comment?.snippet?.topLevelComment?.snippet?.publishedAt).fromNow()}</Box>

                                            </Box>
                                            <Box noOfLines={2}>{comment?.snippet?.topLevelComment?.snippet?.textOriginal}</Box>
                                            <Box>
                                                <Box display={'flex'} alignItems={'center'} gap={'4px'}>
                                                    <Box fontSize={'20px'}><BiLike /></Box>
                                                    <Text as={'span'}>{comment?.snippet?.topLevelComment?.snippet?.likeCount}</Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                }
            </Box>
            <Box w={{ base: '100%', md: '30%' }} display={'grid'}>
                {state?.videos?.map((video, index) => (

                    state.isVideosLoading ?
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
                        <Box cursor={'pointer'} onClick={() => setPlaylistDetailsId(video?.snippet?.resourceId?.videoId) && setPlaylistChannelDetails(video?.snippet?.channelId) && setDetailsIndex(index)}>
                            <Box lineHeight={'20px'} border={0} overflow={'hidden'}>
                                <Box>
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
                        </Box>

                ))}
            </Box>
        </Box>
    )
}

export default PlaylistDetails