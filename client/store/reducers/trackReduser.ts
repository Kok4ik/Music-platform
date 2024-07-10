import { TrackAction, TrackActionTypes, TrackState } from "@/types/track"

const initialState: TrackState = {
    totalCount: 0,
    tracks: [],
    error: ''
}

export const trackReduser = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.SET_TOTAL_COUNT:
            return {...state, totalCount: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, error: '', tracks: action.payload}
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}