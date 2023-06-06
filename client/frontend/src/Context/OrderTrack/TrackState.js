import { useState } from 'react'
import TrackContext from './TrackContext'

const TrackState = ({ children }) => {
    const [track, setTrack] = useState(null)

    return (
        <TrackContext.Provider value={{ track, setTrack }}>
            {children}
        </TrackContext.Provider>
    )
}

export default TrackState