import { AlbumAction, AlbumActionTypes, AlbumState } from "@/types/album"

const initialState: AlbumState = {
    totalCount: 0,
    albums: [],
    error: ''
}

export const albumReduser = (state = initialState, action: AlbumAction): AlbumState => {
    switch (action.type) {
        case AlbumActionTypes.SET_TOTAL_COUNT:
            return {...state, totalCount: action.payload}
        case AlbumActionTypes.FETCH_ALBUMS:
            return {...state, error: '', albums: action.payload}
        case AlbumActionTypes.FETCH_ALBUMS_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}