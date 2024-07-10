'use client'
import Metadata from '@/components/Metedata'
import TrackList from '@/components/Track/TrackList'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypesSelector'
import { RootState } from '@/store'
import { fetchTracks, searchTracks } from '@/store/actions-creators/track'


import { Itrack } from '@/types/track'
import { Box, Button, Card, Grid, Pagination, TextField } from '@mui/material'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'


  

const Tracks = () => {
    const router = useRouter()
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const {tracks, error, totalCount} = useTypedSelector(state => state.trackReduser)
    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const search = async (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value))                
            }, 500)
        )
       
    }

    useEffect(() => {
        dispatch(fetchTracks(10, currentPage))
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
        <>
            <Metadata seoTitle='Список треков - Belov Music' seoDescription='Список всех треков'/>
            <Grid container justifyContent={'center'}>
                <Card style={{width: 900}}>
                    <Box p={2}>
                        <Grid container justifyContent={'space-between'}>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TextField
                        label="Поиск"
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks}/>
                    <Pagination count={Math.ceil(totalCount / 10)} page={currentPage} variant="outlined" shape="rounded" onChange={handleChangePage}/>
                    <Button onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>Вверх</Button>
                </Card>
            </Grid>
        </>
    )
}

export default Tracks