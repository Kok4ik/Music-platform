import { Itrack } from "./track"

export interface IAlbum {
    _id: string
    name: string
    artist: string
    picture: string
    listens: string
    tracks: Itrack[]
}

export interface AlbumState {
    totalCount: number,
    albums: IAlbum[]
    error: string
}
export enum AlbumActionTypes {
    FETCH_ALBUMS = 'FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR = 'FETCH_ALBUMS_ERROR',
    SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'

}
 interface FetchAlbumsAction {
    type: AlbumActionTypes.FETCH_ALBUMS
    payload: IAlbum[]

}
interface SetTotalCountAction {
    type: AlbumActionTypes.SET_TOTAL_COUNT
    payload: number
}
interface FetchAlbumsErrorAction {
    type: AlbumActionTypes.FETCH_ALBUMS_ERROR
    payload: string
}
export type AlbumAction = FetchAlbumsAction | FetchAlbumsErrorAction | SetTotalCountAction