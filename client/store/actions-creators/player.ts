import { IAlbum } from "@/types/album";
import { PlayerAction, PlayerActionTypes } from "@/types/player";
import { Itrack } from "@/types/track";


export const playTrack = (): PlayerAction => {
    return {type: PlayerActionTypes.PLAY}
}
export const pauseTrack = (): PlayerAction => {
    return {type: PlayerActionTypes.PAUSE}
}
export const setDuration = (payload: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_DURATION, payload}
}
export const setVolume = (payload: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_VOLUME, payload}
}
export const setCurrentTime = (payload: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_CURRENT_TIME, payload}
}
export const setActiveTrack = (payload: Itrack): PlayerAction => {
    return {type: PlayerActionTypes.SET_ACTIVE, payload}
}
export const setActiveAlbum = (payload: IAlbum | null) : PlayerAction => {
    return {type: PlayerActionTypes.SET_ACTIVE_ALBUM, payload}
}