import { Itrack } from '@/types/track'
import { Button, Card, CardActionArea, Grid, IconButton } from '@mui/material'
import React, { FC } from 'react'
import styles from '../../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useActions } from '@/hooks/useActions'
import axios from 'axios'
import { useTypedSelector } from '@/hooks/useTypesSelector'
import { IAlbum } from '@/types/album'
interface TrackItemProps {
    track: Itrack
    tracks: Itrack[]
    isTrack: boolean
    album?: IAlbum
}
const TrackItem: FC<TrackItemProps> = ({track, tracks, isTrack, album}) => {
    let display = 'flex'
    const {pause, active} = useTypedSelector(state => state.playerReducer)
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const play = (e: any) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks/listen/' + track._id)
    }
    const deleteTrack = (e: any) => {
        e.stopPropagation()
        if (isTrack) {
            axios.delete(process.env.NEXT_PUBLIC_SECRET_HOST + `/tracks/` + track._id)
        } else {
            axios.delete(process.env.NEXT_PUBLIC_SECRET_HOST + '/albums/' + album?._id + '/' + track._id)
        }
        
        display = 'none'
    }
    return (
        <Card className={styles.track} style={{display: display}} onClick={() => router.push('/tracks/' + track._id) }>
            <IconButton onClick={play}>
                {(!pause && track._id === active?._id)
                ? <Pause/>
                : <PlayArrow/>
                }
            </IconButton>
            <img src={process.env.NEXT_PUBLIC_SECRET_HOST + '/' + track.picture} width={70} height={70}/>
            <Grid container direction={'column'} style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <IconButton style={{marginLeft: 'auto'}} onClick={deleteTrack}>
                <Delete/>
            </IconButton>
        </Card>
    )
}

export default TrackItem