import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import { Box, useColorMode } from '@chakra-ui/react'

const MainLayouts = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    return (
        <Box minH={'100vh'} bg={colorMode == 'dark' ? '#0f0f0f' : 'white'}>
            <Navbar />
            <Content>
                <Outlet />
            </Content>
        </Box>
    )
}

export default MainLayouts