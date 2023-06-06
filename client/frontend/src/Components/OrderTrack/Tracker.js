import { Step, Stepper } from "react-form-stepper"
import TrackContext from "../../Context/OrderTrack/TrackContext"
import { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"

const trackingArray = [
    { url: '/images/order-process.svg', alt: 'Process' },
    { url:'/images/order-making.svg', alt:'Making'},
    { url:'/images/order-shipped.svg', alt:'Shipped'},
    { url: '/images/order-completed.svg', alt: 'Complete' },
]

const Tracker = () => {
    const [index, setIndex] = useState(0)

    // tracking context
    const { track, setTrack } = useContext(TrackContext)

    useEffect(()=>{
        if (track?.status === 'making')
            setIndex(1)
        else if (track?.status === 'shipped')
            setIndex(2)
        else if (track?.status === 'complete')
            setIndex(3)
        else
            setIndex(0)
    },[track])

    return (
        <div className="tracker">
            <Stepper activeStep={index}>
                <Step label="Pending" />
                <Step label="Making" />
                <Step label="Shipped" />
                <Step label="Complete" />
            </Stepper>
            <div className="images">
                <img src={trackingArray[index].url} alt={trackingArray[index].alt} />
                <Button className="mt-5 w-25" onClick={_ => setTrack(null)}>Back</Button>
            </div>
        </div>
    )
}

export default Tracker