import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Videos from '../components/Videos'
import { MainContext } from '../store/context'
import { ApiService } from '../service/api'

const Search = () => {
  const {state, dispatch} = useContext(MainContext)
  const { id } = useParams()

  const url = `search?part=snippet&q=${id}`
  useEffect(() => {
    ApiService.fetching(url, dispatch)
  }, [id])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Videos/>
  )
}

export default Search