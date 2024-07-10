'use client'
import FileUpload from '@/components/FileUpload'
import Metadata from '@/components/Metedata'
import SwapWrapper from '@/components/SwapWrapper'
import { useInput } from '@/hooks/useInput'
import { useTypedSelector } from '@/hooks/useTypesSelector'
import { RootState } from '@/store'
import { fetchTracks } from '@/store/actions-creators/track'
import { Itrack } from '@/types/track'
import { Button, Grid, Pagination, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const CreateAlbum = () => {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const [activeStep, setActiveStep] = useState(0)
    const [addedTracks, setAddedTracks] = useState<Itrack[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [picture, setPicture] = useState<any>(null)
    const {tracks, totalCount} = useTypedSelector(state => state.trackReduser)
    const router = useRouter()
    const name = useInput('')
    const artist = useInput('')

    useEffect(() => {
        dispatch(fetchTracks(10, currentPage))
    }, [currentPage, dispatch])

    const next = () => {
        if (activeStep == 2) {
            const formData = new FormData()
            const tracks = addedTracks.map(track => track._id)
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('tracks', JSON.stringify(tracks))
            axios.post(process.env.NEXT_PUBLIC_SECRET_HOST + '/albums', formData)
                .then(res => router.push('/albums'))
                .catch(e => console.log(e))
        } else {
        setActiveStep(pred => pred + 1)}
    }
    const back = () => {
        setActiveStep(pred => pred - 1)
    }
    const handleChangePage = (event: any, newPage: number) => {
        setCurrentPage(newPage)
    }
    return (
        <>
            <Metadata seoTitle='Создать альбом - Belov Music' seoDescription='Создайте альбом'/>
            <SwapWrapper activeStep={activeStep} steps={['Информация об альбоме', 'Загрузка обложки', 'Добавление треков']}>
                {activeStep === 0 &&
                    <Grid container direction={'column'} style={{padding: 20}}>
                        <TextField {...name} style={{marginTop: 10}} placeholder='Введите название aльбома'/>
                        <TextField {...artist} style={{marginTop: 10}} placeholder='Введите имя автора'/>
                    </Grid>
                }
                {activeStep === 1 &&
                <>
                    <h1>Загрузка обложки</h1>
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <Button>Загрузите обложку</Button>
                    </FileUpload>
                    {picture && 
                        <h2>{picture.name}</h2>}
                </>
                }
                    
                {activeStep === 2 &&
                <>
                    <div>Выберите треки</div>

                    {tracks.map(track => 
                        <div style={{border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent:'space-between', marginTop: 20}}>
                            <h3>Название - {track.name}</h3>
                            <h3>Автор - {track.artist}</h3>
                            <Button onClick={() => setAddedTracks([...addedTracks, track])}>Добавить</Button>
                        </div>
                    )}
                    <Pagination count={Math.ceil(totalCount / 10)} onChange={handleChangePage} variant="outlined" shape="rounded"/>
                    <div>Добавленные треки</div>
                    {addedTracks.map(track => 
                        <div style={{border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent:'space-between', marginTop: 20}}>
                            <h3>Название - {track.name}</h3>
                            <h3>Автор - {track.artist}</h3>
                            <Button onClick={() => setAddedTracks(prev => prev.filter((_, index) => index !== addedTracks.indexOf(track)))}>Удалить</Button>
                        </div>
                    )}
                </>
                }
                    
            </SwapWrapper>
            <Grid container justifyContent={'space-between'}>
                <Button onClick={back} disabled={activeStep === 0}>Назад</Button>
                {activeStep >= 2 ? <Button onClick={next} disabled={activeStep >= 3}>Готово</Button> :                
                <Button onClick={next} disabled={activeStep >= 3}>Вперед</Button>
                }
            </Grid>
        </>
    )
}

export default CreateAlbum