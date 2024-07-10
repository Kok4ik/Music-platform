import { Itrack } from '@/types/track'
import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import TrackItem from './TrackItem'
import { useTypedSelector } from '@/hooks/useTypesSelector'
interface TrackListProps {
    tracks: Itrack[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {


    return (
        <Grid container direction={'column'}>
            <Box p={2}>
                {tracks.map(track => 
                    <TrackItem 
                        key={track._id}
                        track={track}
                        tracks={tracks}
                        isTrack={true}
                    />
                )}
            </Box>
        </Grid>
    )
}

export default TrackList