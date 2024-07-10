'use client'
import AlbumList from '@/components/Album/AlbumList'
import TrackList from '@/components/Track/TrackList'
import { useTypedSelector } from '@/hooks/useTypesSelector'
import { RootState } from '@/store'
import { fetchAlbums, searchAlbums } from '@/store/actions-creators/album'
import { Box, Button, Card, Grid, Pagination, TextField } from '@mui/material'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
const Albums = () => {
    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const {albums, error, totalCount} = useTypedSelector(state => state.albumReduser)
    const router = useRouter()

    const search = async (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchAlbums(e.target.value))                
            }, 500)
        )
       
    }

    useEffect(() => {
        dispatch(fetchAlbums(10, currentPage))
    }, [dispatch, currentPage])
    if (error) {
        return (
            <h1>
                {error}            
            </h1>
        )
    }
    const handleChangePage = (event: any, newPage: number) => {
        setCurrentPage(newPage);
    };
    return (
        <Grid container justifyContent={'center'}>
            <Card style={{width: 900}}>
                    <Box p={2}>
                        <Grid container justifyContent={'space-between'}>
                            <h1>Список альбомов</h1>
                            <Button onClick={() => router.push('/albums/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TextField
                        label="Поиск"
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <AlbumList albums={albums} />
                    <Button onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>Вверх</Button>
                    <Pagination count={Math.ceil(totalCount / 10)} variant="outlined" shape="rounded" onChange={handleChangePage}/>
            </Card>
        </Grid>
    )
}

export default Albums