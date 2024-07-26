
export const initialState = {
    videos: [],
    relatedVideos: [],
    channelDetails: [],
    videoDetails: [],
    commentDetails: [],
    isVideosLoading: true,
    searchData: 'All',
    categoryData: 'All'
}

export function reducer(state, action) {
    switch (action.type) {
        case 'FETCHING_VIDEOS_DATA':
            return {
                ...state,
                isVideosLoading: true
            }
        case 'FETCHED_VIDEOS_DATA':
            return {
                ...state,
                isVideosLoading: false,
                videos: action.payload
            }
        case 'FETCHED_VIDEOS_DATA_ERROR':
            return {
                ...state,
                isVideosLoading: false
            }

        case 'SET_SEARCH_DATA':
            return {
                ...state,
                searchData: action.payload
            }
        case 'SET_CATEGORY_DATA':
            return {
                ...state,
                categoryData: action.payload
            }
        case 'FETCHED_RELATED_VIDEOS_DATA':
            return {
                ...state,
                isVideosLoading: false,
                relatedVideos: action.payload
            }
        case 'FETCHED_CHANNEL_DETAILS_DATA':
            return {
                ...state,
                isVideosLoading: false,
                channelDetails: action.payload
            }

        case 'FETCHED_VIDEO_DETAILS_DATA':
            return {
                ...state,
                isVideosLoading: false,
                videoDetails: action.payload
            }
        case 'FETCHED_COMMENT_DETAILS_DATA':
            return {
                ...state,
                isVideosLoading: false,
                commentDetails: action.payload
            }
    }
}