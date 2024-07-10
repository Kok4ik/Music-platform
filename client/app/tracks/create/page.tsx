'use client'
import FileUpload from '@/components/FileUpload'
import Metadata from '@/components/Metedata'
import SwapWrapper from '@/components/SwapWrapper'
import { useInput } from '@/hooks/useInput'
import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const router = useRouter()
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const next = () => {
        if (activeStep == 2) {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks', formData)
                .then(res => router.push('/tracks'))
                .catch(e => console.log(e))
        } else {
        setActiveStep(pred => pred + 1)}
    }
    const back = () => {
        setActiveStep(pred => pred - 1)
    }

    return (
        <>
            <Metadata seoTitle='Создать трек - Belov Music' seoDescription='Создайте трек'/>
            <SwapWrapper activeStep={activeStep} steps={['Информация о треке', 'Загрузка обложки', 'Загрузка аудио']}>
                {activeStep === 0 &&
                    <Grid container direction={'column'} style={{padding: 20}}>
                        <TextField {...name} style={{marginTop: 10}} placeholder='Введите название трека'/>
                        <TextField {...artist} style={{marginTop: 10}} placeholder='Введите имя автора'/>
                        <TextField {...text} style={{marginTop: 10}} placeholder='Введите текст трека' multiline rows={3}/>
                    </Grid>
                }
                {activeStep === 1 &&
                <>
                
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <Button>Загрузите обложку</Button>
                    </FileUpload>
                    {picture && 
                        <h1>{picture.name}</h1>}
                </>
                }
                    
                {activeStep === 2 &&
                <>
                    <FileUpload setFile={setAudio} accept='audio/*'>
                        <Button>Загрузите трек</Button>
                    </FileUpload>
                    {audio && 
                        <h1>{audio.name}</h1>
                    }
                </>
                }
                    
            </SwapWrapper>
            <Grid container justifyContent={'space-between'}>
                <Button onClick={back} disabled={activeStep === 0}>Назад</Button>
                {activeStep >= 2 ? <Button onClick={next} disabled={activeStep >= 3}>Готово</Button> :                
                <Button onClick={next} disabled={activeStep >= 2}>Вперед</Button>
                }
            </Grid>
        </>
    )
}

export default Create