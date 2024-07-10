import { AlbumActionTypes } from "@/types/album"
import axios from "axios"
import { Dispatch } from "redux"


export const fetchAlbums = (count: number, offset: number) => async (dispatch: Dispatch) => {
    try {
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/albums?count=' + count + '&offset=' + offset)
            .then(response => {
                const {totalCount, data} = response.data
                dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: data})
                dispatch({type: AlbumActionTypes.SET_TOTAL_COUNT, payload: totalCount})
        })   
    } catch (e) {
        console.log(e)
        dispatch({type: AlbumActionTypes.FETCH_ALBUMS_ERROR, payload: 'Произошла ошибка при загрузке альбомов'})
    }
}

export const searchAlbums = (query: string) => async (dispatch: Dispatch) => {
    try {
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/albums/search?query=' + query)
            .then(response => {
                dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        })   
    } catch (e) {
        console.log(e)
        dispatch({type: AlbumActionTypes.FETCH_ALBUMS_ERROR, payload: 'Произошла ошибка при загрузке альбомов'})
    }
}