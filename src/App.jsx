import { Box, Heading } from '@chakra-ui/react'
import React, { useReducer } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'
import Main from './pages/Main'
import Channel from './pages/Channel'
import VideoDetail from './pages/VideoDetail'
import { MainContext } from './store/context'
import { initialState, reducer } from './store/reducer'
import Search from './pages/Search'
import PlaylistDetails from './pages/PlaylistDetails'

const route = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayouts />}>
    <Route index element={<Main />} />
    <Route path='/channel/:id' element={<Channel />} />
    <Route path='/video/:id' element={<VideoDetail />} />
    <Route path='/search/:id' element={<Search/>} />
    <Route path='/playlist/:id' element={<PlaylistDetails/>}/>
  </Route>
))

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MainContext.Provider value={{state, dispatch}}>
      <RouterProvider router={route} />
    </MainContext.Provider>
  )
}

export default App