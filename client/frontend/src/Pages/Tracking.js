import { useContext, useEffect } from "react"
import TrackingForm from "../Components/OrderTrack/TrackingForm"
import TrackContext from "../Context/OrderTrack/TrackContext"
import Tracker from "../Components/OrderTrack/Tracker"
import SettingContext from '../Context/SiteSetting/SettingContext'

const Tracking = () => {

    // setting context
    const { setting } = useContext(SettingContext)

    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },[])

    useEffect(()=>{
        document.title = `Order Tracking - ${setting?.siteName ?? 'Loading...'}`;
    }, [setting])

    // tracking context
    const { track } = useContext(TrackContext)

    if (track) {
        return (
            <div className="page track">
                <Tracker/>
            </div>
        )
    }

    return (
        <div className="page track">
            <TrackingForm/>
        </div>
    )
}

export default Tracking