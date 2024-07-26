import { Box } from '@chakra-ui/react'
import React from 'react'

const Content = ({children}) => {
  return (
    <Box w={'94%'} mx={'auto'} maxW={'1440px'}>{children}</Box>
  )
}

export default Content