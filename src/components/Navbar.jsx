import { AiFillYoutube } from "react-icons/ai";
import { BiSun } from "react-icons/bi";
import { TbMoon } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { Box, Container, Flex, IconButton, Image, Input, InputGroup, Spacer, useColorMode } from '@chakra-ui/react'

import React, { useContext, useRef } from 'react'
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
        } else e.target['search-input'].focus()
    }
    return (
        <Container maxW={"1440px"} py={"10px"}>
            <Flex alignItems={"center"}>
                <Link to={"/"}>
                    <Box display={"flex"} alignItems={"center"} fontSize={"25px"} fontWeight={"600"}>
                        <Box color={'red'}><AiFillYoutube /></Box>
                        <Box as="p" letterSpacing={"-1px"} fontFamily={"Oswald"}>YouTube</Box>
                    </Box>
                </Link>
                <Spacer />
                <Box as="form" pos={"relative"} ref={searchForm} onSubmit={(e) => handleSubmit(e)}>
                    
                        <Input id="search-input" placeholder="Search" py={"0px"} borderRadius={"30px"} w={{ md: '350px', lg : "450px"}} size={"md"} />
                    
                    <Box pos={"absolute"} right={"10px"} top={"25%"} fontSize={'20px'}><CiSearch /></Box>
                    
                </Box>
                <Spacer />
                <Box>
                    <IconButton
                        isRound={true}
                        variant='outline'
                        colorScheme='blackAlpha'
                        aria-label='Done'
                        fontSize='18px'
                        size={'md'}
                        color={colorMode === 'dark' ? 'white' : 'black'}
                        icon={colorMode === 'dark' ? <BiSun /> : <TbMoon />}
                        onClick={toggleColorMode}
                    />
                </Box>
            </Flex>
        </Container>
    )
}

export default Navbar