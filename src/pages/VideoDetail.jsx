import { BiLike } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";

import { BiShow } from "react-icons/bi";
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../store/context'
import { ApiService } from '../service/api'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Heading, Image, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import '../App.css'
import VideoCard from "../components/VideoCard";
import moment from "moment";


const VideoDetail = () => {
  const { id } = useParams()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const { state, dispatch } = useContext(MainContext)
  const url = `videos?part=contentDetails,snippet,statistics&id=${id}`
  const relatedVideosUrl = `search?part=snippet&relatedToVideoId=${id}&type=video`
  const channelDetailsUrl = `channels?part=snippet,statistics&id=${state.videoDetails[0]?.snippet?.channelId}`
  const commentUrl = `commentThreads?part=snippet&videoId=${id}`
  const [showComments, setShowComments] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const descriptionBg = useColorModeValue('gray.200', '#222')

  useEffect(() => {
    ApiService.getVideoDetails(url, dispatch)
    ApiService.relatedVideo(relatedVideosUrl, dispatch)
    ApiService.getCommnetDetails(commentUrl, dispatch)

  }, [id])
  useEffect(() => {
    ApiService.channelDetails(channelDetailsUrl, dispatch)
  }, [state.videoDetails?.[0]?.snippet?.channelId])
  // console.log(state.videoDetails);
  // console.log(state.relatedVideos);
  // console.log(state.channelDetails);
  // console.log(state.commentDetails);
  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text?.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }


  var text = urlify(state.videoDetails?.[0]?.snippet?.description);

  console.log(text)
  return (
    <Box key={state.videoDetails?.[0]?.id} my={'30px'} display={'flex'} flexDirection={{ base: 'column', md: 'row' }} gap={'20px'}>

      <Box flex={'70%'} width={'70%'}>
        <Box rounded={'20px'} h={{ base: '250px', sm: '400px', md: '500px' }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          {state.isVideosLoading ? <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
            : <ReactPlayer className='react-player' height={'100%'} width={'100%'} url={`https://youtube.com/watch?v=${id}`} controls />}
        </Box>
        <Heading my={'10px'} as={'h4'} fontSize={'25px'}>{state.videoDetails?.[0]?.snippet?.title}</Heading>
        <Link to={`/channel/${state.videoDetails?.[0]?.snippet?.channelId}`}>
          <Box display={'flex'} alignItems={'center'} gap={'10px'} >
            <Image src={state.channelDetails?.[0]?.snippet?.thumbnails?.high?.url} w={{ base: '35px', sm: '40px', md: '50px' }} h={{ base: '35px', sm: '40px', md: '50px' }} rounded={'full'} />
            <Box fontSize={{ base: '14px', md: '16px' }}>
              <Box fontWeight={'700'}>{state.channelDetails?.[0]?.snippet?.title}</Box>
              <Box>{parseInt(state.channelDetails?.[0]?.statistics?.subscriberCount).toLocaleString()} subscribers</Box>
            </Box>
          </Box>
        </Link>
        <Box>
          <Box display={'flex'} alignItems={'center'} gap={'10px'}>
            <Box fontSize={{ base: '14px', md: '16px' }} fontWeight={'500'} display={'flex'} alignItems={'center'} gap={'5px'}><Box fontSize={'25px'}><BiShow /></Box> {parseInt(state.videoDetails?.[0]?.statistics?.viewCount).toLocaleString()} Views</Box>
            <Box fontSize={{ base: '14px', md: '16px' }} fontWeight={'500'} display={'flex'} alignItems={'center'} gap={'5px'}><Box fontSize={'25px'}><AiOutlineLike /></Box> {parseInt(state.videoDetails?.[0]?.statistics?.likeCount).toLocaleString()} Likes</Box>
            <Box fontSize={{ base: '14px', md: '16px' }} fontWeight={'500'} display={'flex'} alignItems={'center'} gap={'5px'}><Box fontSize={'25px'}><BiComment /></Box> {parseInt(state.videoDetails?.[0]?.statistics?.commentCount).toLocaleString()} Comments</Box>
          </Box>
          <Box my={'20px'} bg={descriptionBg} pos={'relative'} pt={'15px'} pl={'15px'} pr={'30px'} rounded={'15px'} noOfLines={!showDescription && 2}>
            <div className="description" dangerouslySetInnerHTML={{ __html: text }} />
            <Button onClick={() => setShowDescription(prev => prev ? !prev : !prev)} pos={'absolute'} top={!showDescription && '25px'} bottom={showDescription && 0} right={0} bg={'transparent'} _hover={{ bg: 'transparent' }}>{showDescription ? <Text>show less</Text> : <Text>more</Text>}</Button>
          </Box>

          <Box>
            <Box display={'flex'} gap={'5px'} alignItems={'center'}>
              <Box my={'10px'} fontWeight={'600'} fontSize={'20px'}>{parseInt(state.videoDetails[0]?.statistics?.commentCount).toLocaleString()} Comments</Box>
              <Button variant={'autline'} display={{ base: "inline-block", md: 'none' }} onClick={() => setShowComments(prev => prev ? !prev : !prev)}>Show More</Button>
            </Box>
            <Box display={{ base: showComments ? 'inline-block' : 'none', md: 'inline-block' }}>
              {state.commentDetails?.map(comment => (
                <Box key={comment.id} display={'flex'} gap={'10px'} mb={'15px'}>
                  <Box minW={'40px'}>
                    <Image src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} w={'40px'} h={'40px'} rounded={'full'} />
                  </Box>
                  <Box>
                    <Box display={'flex'} alignItems={'center'} gap={'3px'}>
                      <Box fontWeight={'bold'} fontSize={{ base: '12px', sm: '14px' }}>{comment.snippet.topLevelComment.snippet.authorDisplayName}</Box>
                      <Box fontSize={{ base: '12px', sm: '14px' }}>{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</Box>

                    </Box>
                    <Box noOfLines={2}>{comment.snippet.topLevelComment.snippet.textOriginal}</Box>
                    <Box>
                      <Box display={'flex'} alignItems={'center'} gap={'4px'}>
                        <Box fontSize={'20px'}><BiLike /></Box>
                        <Text as={'span'}>{comment.snippet.topLevelComment.snippet.likeCount}</Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex={'30%'}>
        {state.relatedVideos?.map(relatedVideo => (
          <VideoCard key={relatedVideo?.id} video={relatedVideo} />
        ))}
      </Box>
    </Box>
  )
}

export default VideoDetail