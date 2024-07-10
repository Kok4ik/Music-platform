import { IAlbum } from "./album";
import { Itrack } from "./track";

export interface PlayerState {
    active: null | Itrack
    activeAlbum: null | IAlbum
    volume: number
    duration: number
    currentTime: number
    pause: boolean
}

export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_ACTIVE_ALBUM = 'SET_ACTIVE_ALBUM',
    SET_DURATION = 'SET_DURATION',
    SET_VOLUME = 'SET_VOLUME',
    SET_CURRENT_TIME = 'SET_CURRENT_TIME'
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE
}
interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE
    payload: Itrack
}
interface SetActiveAlbumAction {
    type: PlayerActionTypes.SET_ACTIVE_ALBUM
    payload: IAlbum | null
}
interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION
    payload: number
}
interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME
    payload: number
}
interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME
    payload: number
}

export type PlayerAction = 
     PlayAction
    | PauseAction 
    | SetActiveAction 
    | SetCurrentTimeAction 
    | SetDurationAction 
    | SetVolumeAction
    | SetActiveAlbumAction