'use client'
import { fetchTrackData } from '@/api/tracks'
import Metadata from '@/components/Metedata'
import { useInput } from '@/hooks/useInput'
import { Itrack } from '@/types/track'
import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const TrackPage = () => {
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')
    const [track, setTrackData] = useState<Itrack>({_id: '1', name: '', artist: '', text: '', listens: 0, picture: '', audio: '', comments: []});

    useEffect(() => {
        const url = new URL(window.location.href)       
        const trackId = url.pathname.split('/').pop()

        if (trackId) {
         fetchTrackData(trackId)
           .then(data => setTrackData(data))
           .catch(error => console.error(error));
        }}, [track]);

        const addComment = async () => {
            try {
                const response = await axios.post(process.env.NEXT_PUBLIC_SECRET_HOST + '/tracks/comment', {
                    username: username.value,
                    text: text.value,
                    trackId: track?._id
                })  
                setTrackData({...track})
            } catch (e) {
                console.log(e)
            }
        }



    return (
        <>
            <Metadata seoTitle={track?.name + ' - ' + track?.artist + ' - Belov Music'} seoDescription=''/>
            <Button variant={'outlined'} style={{fontSize: 32}} onClick={() => router.push('/tracks')}>Назад</Button>
            <Grid container style={{margin: '0 20px'}}>
                <img src={process.env.NEXT_PUBLIC_SECRET_HOST + '/' + track?.picture} width={200} height={200} />
                <div style={{marginLeft: 30}}>
                    <h1>Название: {track?.name}</h1>
                    <h1>Исполнитель: {track?.artist}</h1>
                    <h1>Прослушиваний: {track?.listens}</h1>
                </div>
            </Grid>
            <h1>Текст песни:</h1>
            <p>{track?.text}</p>
            <Grid container>
                <h1>Оставьте комментарий</h1>
                <TextField
                    {...username}
                    label='Ваше имя'
                    fullWidth                    
                />
                <TextField
                    {...text}
                    label='Комментарий'
                    fullWidth
                    multiline
                    rows={4}
                    style={{marginTop: 20}}
                />
                <Button style={{display: 'block'}} onClick={addComment}>Отправить</Button>
                {track?.comments.map(comment => 
                    <div style={{display: 'block', width: '100%', marginTop: 20}}>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </Grid>
        </>
    )
}

export default TrackPage