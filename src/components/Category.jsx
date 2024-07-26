import { Box, Container, List, ListItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import category from '../constants/category'
import '../App.css'
import { MainContext } from '../store/context'
const Category = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const bgCategory = useColorModeValue('#1d1d1d', '#efefef')
    const colorCategory = useColorModeValue('#efefef', '#1d1d1d')
    const {state, dispatch} = useContext(MainContext)
  return (
    <Container maxW={'1440px'} fontSize={'17px'}>
        <List className='list-scrollbar' mt={'20px'} overflowX={'scroll'} display={'flex'} alignItems={'center'} gap={'20px'}>
            {category.map(item => (
                <ListItem onClick={() => dispatch({type : 'SET_CATEGORY_DATA', payload : item.title})} fontWeight={'500'} bg={state.categoryData === item.title ? bgCategory  : colorCategory} color={state.categoryData === item.title ? colorCategory : bgCategory} className='category-btn' cursor={'pointer'} key={item.title}>{item.title}</ListItem>
            ))}
        </List>
    </Container>
  )
}

export default Category