import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Category from '../components/Category'
import Videos from '../components/Videos'
import { ApiService } from '../service/api'
import category from '../constants/category'
import { MainContext } from '../store/context'

const Main = () => {
  const {state, dispatch} = useContext(MainContext)
  const url = `search?part=snippet&q=${state.categoryData}`
  useEffect(() => {
    ApiService.fetching(url, dispatch)
  }, [state.categoryData])

  return (
    <Box>
        <Category/>
        <Videos/>
    </Box>
  )
}

export default Main