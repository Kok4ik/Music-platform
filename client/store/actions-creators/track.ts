import { TrackActionTypes } from "@/types/track"
import axios from "axios"
import { Dispatch } from "redux"



export const fetchTracks = (count: number = 10, offset: number = 1) => async (dispatch: Dispatch) => {
    try {
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks?count=' + count + '&offset=' + offset)
            .then(response => {
                const {totalCount, data} = response.data
                dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: data})
                dispatch({type: TrackActionTypes.SET_TOTAL_COUNT, payload: totalCount})
        })   
    } catch (e) {
        console.log(e)
        dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков'})
    }
}

export const searchTracks = (query: string) => async (dispatch: Dispatch) => {
    try {
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks/search?query=' + query)
            .then(response => {
                dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        })   
    } catch (e) {
        console.log(e)
        dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков'})
    }
}