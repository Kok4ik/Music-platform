import { FC, PropsWithChildren } from "react";

export default interface IComment {
    _id: string
    username: string
    text: string
    
}
export type ReactFC<Props extends Record<PropertyKey, unknown> = {}> = FC<PropsWithChildren<Props>>;
export interface Itrack {
    _id: string
    name: string
    artist: string
    text: string
    listens: number
    picture: string
    audio: string
    comments: IComment[]
}
export interface TrackState {
    totalCount: number
    tracks: Itrack[]
    error: string
}
export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'

}
interface SetTotalCountAction {
    type: TrackActionTypes.SET_TOTAL_COUNT,
    payload: number
}
 interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS
    payload: Itrack[]

}
interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR
    payload: string
}
export type TrackAction = FetchTracksAction | FetchTracksErrorAction | SetTotalCountAction