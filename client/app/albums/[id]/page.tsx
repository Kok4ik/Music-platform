"use client"
import { fetchAlbum } from '@/api/albums'
import TrackItem from '@/components/Track/TrackItem'
import { useTypedSelector } from '@/hooks/useTypesSelector'
import { RootState } from '@/store'
import { fetchTracks } from '@/store/actions-creators/track'
import { IAlbum } from '@/types/album'
import { Itrack } from '@/types/track'
import { Button, Pagination } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const AlbumPage = () => {
    const [album, setAlbum] = useState<IAlbum | null>(null)
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const [currentPage, setCurrentPage] = useState(0)
    const [display, setDisplay] = useState('none')
    const {tracks, totalCount} = useTypedSelector(state => state.trackReduser)
    const router = useRouter()

    useEffect(() => {
        const url = new URL(window.location.href)
        const albumId = url.pathname.split('/').pop()
        if (albumId) {
            fetchAlbum(albumId)
            .then(data => setAlbum(data))
            .catch(error => console.error(error));
        }
    }, [album])
    useEffect(() => {
        dispatch(fetchTracks(10, currentPage))
    }, [dispatch, currentPage])
    const addTrack = (track: Itrack) => {
        axios.get(process.env.NEXT_PUBLIC_SECRET_HOST + '/albums/' + album?._id + '/' + track._id)
    }

    const handleChangePage = (event: any, newPage: number) => {
        setCurrentPage(newPage)
    }
    return (
        <div>
            <Button variant={'outlined'} style={{fontSize: 32}} onClick={() => router.push('/albums')}>Назад</Button>
            <Button variant={'outlined'} style={{fontSize: 32}} onClick={() => setDisplay('block')}>Добавить трек</Button>
            <div style={{display: display}}>
                <h2>Треки:</h2>
                <Button variant={'outlined'} onClick={() => setDisplay('none')}>Закрыть</Button>
                {tracks.map(track => 
                    <div key={track._id} style={{border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent:'space-between', marginTop: 20}}>
                        <h3>Название - {track.name}</h3>
                        <h3>Автор - {track.artist}</h3>
                        <Button onClick={() => addTrack(track)}>Добавить</Button>
                    </div>
                )}
                <Pagination count={Math.ceil(totalCount / 10)} variant="outlined" shape="rounded" onChange={handleChangePage}/>                
            </div>
            <img src={process.env.NEXT_PUBLIC_SECRET_HOST + '/' + album?.picture} alt="" width={200} height={200}/>
            <h1>{album?.name}</h1>
            <h1>{album?.artist}</h1>
            <h1>{album?.listens}</h1>
            <div>
                Треки:
                {album?.tracks.map(track => 
                    <TrackItem track={track} isTrack={false} tracks={album.tracks} album={album}/>
                )}
            </div>
        </div>
    )
}

export default AlbumPage