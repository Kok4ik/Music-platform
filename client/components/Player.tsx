'use client'
import { FastForwardRounded, FastRewindRounded, Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import st from '../styles/Player.module.scss'
import { Itrack } from '@/types/track'
import TrackProgress from './Track/TrackProgress'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypesSelector'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchTracks } from '@/store/actions-creators/track'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '@/store'
import { AnyAction } from 'redux'



let audio;
const Player = () => {
    const {pause, volume, duration, currentTime, active, activeAlbum} = useTypedSelector(state => state.playerReducer)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack, setActiveAlbum} = useActions()
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const {tracks, error} = useTypedSelector(state => state.trackReduser)
    useEffect(() => {
        if (!audio) {
            audio = new Audio()            
        } else {
            setAudio()
            play()
        }
    }, [active])

    useEffect(() => {
        dispatch(fetchTracks())
    }, [dispatch])

    const setAudio = () => {
        if (active) {
            audio.src = process.env.NEXT_PUBLIC_SECRET_HOST + '/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const nextTrack = () => {
        if (activeAlbum && activeAlbum.tracks.length > activeAlbum.tracks.indexOf(active?._id) + 1) {
            axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks/' + activeAlbum.tracks[activeAlbum.tracks.indexOf(active?._id) + 1])
                .then(response => setActiveTrack(response.data))
            playTrack()
            audio.play()
        } else if (tracks.length == tracks.indexOf(tracks.filter(track => track._id === active?._id)[0]) + 1) {
                setActiveTrack(tracks[0])
                playTrack()
                audio.play()
            } else {
            setActiveTrack(tracks[tracks.indexOf(tracks.filter(track => track._id === active?._id)[0]) + 1])
            setActiveAlbum(null)
            playTrack()
            audio.play()
        }
    }

    const lastTrack = () => {
        if (activeAlbum && activeAlbum.tracks.indexOf(active?._id) > 0) {
            axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks/' + activeAlbum.tracks[activeAlbum.tracks.indexOf(active?._id) - 1])
                .then(response => setActiveTrack(response.data))
            playTrack()
            audio.play()
        } else if (tracks.indexOf(tracks.filter(track => track._id === active?._id)[0]) === 0) {
                setActiveTrack(tracks[tracks.length - 1])
                playTrack()
                audio.play()
            } else {
            setActiveTrack(tracks[tracks.indexOf(tracks.filter(track => track._id === active?._id)[0]) - 1])
            setActiveAlbum(null)
            playTrack()
            audio.play()
        }
    }

    function sToStr(s) {
        let m = Math.trunc(s / 60) + ''
        s = (s % 60) + ''
        return m.padStart(2, 0) + ':' + s.padStart(2, 0)
      }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }
    if (!active) return null
    return (
        <div className={st.player}>
            <IconButton onClick={lastTrack}>
                <FastRewindRounded/>
            </IconButton>
            <IconButton onClick={play}>
                {!pause 
                ? <Pause/>
                : <PlayArrow/>
                }
            </IconButton>
            <IconButton onClick={nextTrack}>
                <FastForwardRounded/>
            </IconButton>
            <Grid container direction={'column'} style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            {activeAlbum && <h3>Альбом - {activeAlbum?.name}</h3>}
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player