/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { Col, Form, Row } from "react-bootstrap";
import OrderContext from "../../Context/Order/OrderContext";
import AuthContext from '../../Context/Auth/AuthContext'


const OrderForm = () => {

    //order, user useContext
    const { order, setOrder } = useContext(OrderContext)
    const { user } = useContext(AuthContext)
    

    return (
        <Form>
            <Row className="mb-3">
                <Col md="6">
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            defaultValue={user?.fullName}
                            readOnly={user?.fullName ? true : false}
                            onChange={(e) => {
                                setOrder({ ...order, name: e.target.value })
                            }}
                            />
                    </Form.Group>
                </Col>
                <Col md="6">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            defaultValue={user?.email}
                            readOnly={user?.email ? true : false}
                            onChange={(e) => {
                                setOrder({ ...order, email: e.target.value })
                            }}
                            />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control 
                    type="number" 
                    defaultValue={user?.mobile}
                    onChange={(e)=> {
                        setOrder({ ...order, mobile: e.target.value })
                    }}
                    />
                <Form.Text muted>
                    You can also add the mobile number of the parcel recipient.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                    <Form.Control
                        name="address"
                        value={order.address}
                        onChange={(e) => {
                            setOrder({ ...order, deliveryAddress: e.target.value })
                        }}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Note</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={order.note}
                    onChange={(e) => {
                        setOrder({ ...order, note: e.target.value })
                    }}
                    />
            </Form.Group>
        </Form>
    )
}

export default OrderForm