import axios from "axios";
//3ad2ab42damsh09e3f294a1ef820p1d0a24jsnf3a0afe968a1
//4641a10beemsh08aacb4105bad74p144439jsn334017e39814
const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    method : 'GET',
    params: {
        maxResults: '100',
    },
    headers: {
        'x-rapidapi-key': '4641a10beemsh08aacb4105bad74p144439jsn334017e39814',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
}

export const ApiService = {
    async fetching(url, dispatch) {

        try {
            dispatch({ type: 'FETCHING_VIDEOS_DATA' })
            const response = await axios.get(`${BASE_URL}/${url}`, options)
            dispatch({type : 'FETCHED_VIDEOS_DATA', payload : response.data.items})
        } catch(err) {
            dispatch({type : 'FETCHED_VIDEOS_DATA_ERROR'})
        }
    },
    async relatedVideo(url, dispatch) {
        try {
            dispatch({ type: 'FETCHING_VIDEOS_DATA' })
            const response = await axios.get(`${BASE_URL}/${url}`, options)
            dispatch({type : 'FETCHED_RELATED_VIDEOS_DATA', payload : response.data.items})
        } catch(err) {
            dispatch({type : 'FETCHED_VIDEOS_DATA_ERROR'})
        }
    },
    async channelDetails(url, dispatch) {
        try {
            dispatch({ type: 'FETCHING_VIDEOS_DATA' })
            const response = await axios.get(`${BASE_URL}/${url}`, options)
            dispatch({type : 'FETCHED_CHANNEL_DETAILS_DATA', payload : response.data.items})
        } catch(err) {
            dispatch({type : 'FETCHED_VIDEOS_DATA_ERROR'})
        }
    },
    async getVideoDetails(url, dispatch) {
        try {
            dispatch({ type: 'FETCHING_VIDEOS_DATA' })
            const response = await axios.get(`${BASE_URL}/${url}`, options)
            dispatch({type : 'FETCHED_VIDEO_DETAILS_DATA', payload : response.data.items})
        } catch(err) {
            dispatch({type : 'FETCHED_VIDEOS_DATA_ERROR'})
        }
    },
    async getCommnetDetails(url, dispatch) {
        try {
            dispatch({ type: 'FETCHING_VIDEOS_DATA' })
            const response = await axios.get(`${BASE_URL}/${url}`, options)
            dispatch({type : 'FETCHED_COMMENT_DETAILS_DATA', payload : response.data.items})
        } catch(err) {
            dispatch({type : 'FETCHED_VIDEOS_DATA_ERROR'})
        }
    }
}