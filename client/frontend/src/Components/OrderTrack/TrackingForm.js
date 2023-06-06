
import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import TrackContext from "../../Context/OrderTrack/TrackContext"
import { orderTrack } from "../../Context/apis"
import { toast } from "react-toastify"

const TrackingForm = () => {
    const [ field, setField ] = useState('')

    // tracking context
    const { setTrack } = useContext(TrackContext)

    const tracking = async (e) => {
        e.preventDefault()
        const res = await orderTrack(field)
        if (res.message) {
            toast(res.message)
        } else {
            setTrack(res)
        }
    }

    return (
        <div className="track-form">
            <img src="/images/order-tracking.svg" alt="Order Tracking" />
            <Form onSubmit={tracking}>
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your order ID" 
                                onChange={(e) => setField(e.target.value)}
                                required/>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Button type="submit" className="w-100">Track</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default TrackingForm