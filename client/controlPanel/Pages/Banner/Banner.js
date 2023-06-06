import { useEffect } from "react"
import MainSlider from '../../Components/Banner/MainSlider'
import SemiBanner from '../../Components/Banner/SemiBanner'

const Banner = () => {

    useEffect(()=>{
        document.title = 'Banner - LFC'
    },[])
   
    return(
        <div className="page">
            <h2 className="py-3">Banner</h2>
            <div className="row">
            <MainSlider/>
            <SemiBanner/>
            </div>
        </div>
    )
}

export default Banner