import React, { FC } from 'react'
interface TrackProgressProps {
    left: number | string
    right: number | string
    onChange: (e: any) => void
}


const TrackProgress: FC<TrackProgressProps> = ({left, right, onChange}) => {
    return (
        <div style={{display: 'flex'}}>
            <input type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{left} / {right}</div>
        </div>
    )
}

export default TrackProgress