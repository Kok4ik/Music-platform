import { useTypedSelector } from '@/hooks/useTypesSelector'
import { IAlbum } from '@/types/album'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { Card, Grid, IconButton } from '@mui/material'
import React, { FC } from 'react'
import st from '../../styles/TrackItem.module.scss'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useActions } from '@/hooks/useActions'
interface AlbumItemProps {
    album: IAlbum
}
const AlbumItem: FC<AlbumItemProps> = ({album}) => {
    let display = 'flex'
    const router = useRouter()
    const {pause, active} = useTypedSelector(state => state.playerReducer)
    const {playTrack, pauseTrack, setActiveTrack, setActiveAlbum} = useActions()

    const play = (e: any) => {
        e.stopPropagation()
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks/' + album.tracks[0])
            .then(response => setActiveTrack(response.data))
        playTrack()
        setActiveAlbum(album)
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/albums/listen/' + album._id)
    }

    const deleteAlbum = (e: any) => {
        e.stopPropagation()
        axios.delete(process.env.NEXT_PUBLIC_SECRET_HOST + `/albums/` + album._id)
        display = 'none'
    }
    
    return (
        <Card className={st.track} style={{display: display}} onClick={() => router.push('/albums/' + album._id)}>
            <IconButton onClick={play}>
                {!pause && album.tracks.includes(active?._id)
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <img src={process.env.NEXT_PUBLIC_SECRET_HOST + '/' + album.picture} width={70} height={70}/>
            <Grid container direction={'column'} style={{width: 200, margin: '0 20px'}}>
                <div>{album.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{album.artist}</div>
            </Grid>
            <IconButton style={{marginLeft: 'auto'}} onClick={deleteAlbum}>
                <Delete/>
            </IconButton>
        </Card>
    )
}

export default AlbumItem