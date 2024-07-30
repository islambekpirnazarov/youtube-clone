import { AiTwotoneAudio } from "react-icons/ai"; 
import { AiFillYoutube } from "react-icons/ai";
import { BiSun } from "react-icons/bi";
import { TbMoon } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { Box, Container, Flex, IconButton, Image, Input, InputGroup, Spacer, useColorMode } from '@chakra-ui/react'

import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../store/context";

const Navbar = () => {
    const {state, dispatch} = useContext(MainContext)
    const { colorMode, toggleColorMode } = useColorMode()
    const searchForm = useRef()
    
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const inputValue = e.target['search-input'].value.trim()
        if(inputValue.length > 0) {
            navigate(`/search/${inputValue}`)
            dispatch({type : 'SET_SEARCH_DATA', payload : inputValue})
            e.target.reset()
        } else e.target['search-input'].focus()
    }
    return (
        <Container maxW={"1440px"} py={"10px"}>
            <Box display={'flex'} alignItems={"center"} gap={'5px'} justifyContent={'space-between'}>
                <Link to={"/"}>
                    <Box display={"flex"} alignItems={"center"} fontSize={{base : '20px', sm : '25px'}} fontWeight={"600"}>
                        <Box color={'red'}><AiFillYoutube /></Box>
                        <Box as="p" letterSpacing={"-1px"} fontFamily={"Oswald"}>YouTube</Box>
                    </Box>
                </Link>
                
                <Box display={'flex'} justifyContent={'end'}  as="form" zIndex={10}   pos={"relative"} ref={searchForm} onSubmit={(e) => handleSubmit(e)} >
                    
                        <Input id="search-input" placeholder={'Search'} py={"0px"} borderRadius={"30px"}   w={{ base: '200px', lg : "550px"}} size={"md"} />
                    
                    <Box cursor={'pointer'} pos={"absolute"} right={"10px"} top={"25%"} fontSize={'20px'}><CiSearch /></Box>
                </Box>
                <IconButton  ml={'20px'} variant={'solid'} fontSize={'20px'} rounded={'full'} colorScheme="gray" icon={<AiTwotoneAudio />}/>

                
                <Box>
                    <IconButton 
                        isRound={true}
                        variant='outline'
                        colorScheme='blackAlpha'
                        aria-label='Done'
                        fontSize={{base : '14px', sm : '18px'}}
                        color={colorMode === 'dark' ? 'white' : 'black'}
                        icon={colorMode === 'dark' ? <BiSun /> : <TbMoon />}
                        onClick={toggleColorMode}
                    />
                </Box>
            </Box>
        </Container>
    )
}

export default Navbar