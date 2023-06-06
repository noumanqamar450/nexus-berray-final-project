import { useContext, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { orderForClient } from "../Context/apis"
import AuthContext  from '../Context/Auth/AuthContext'
import SideMenu from "../Components/UserOrder/SideMenu"
import UserOrderList from "../Components/UserOrder/UserOrderList"
import { useNavigate } from "react-router-dom"

const UserOrders = () => {
    const [orders, setOrders] = useState(null)

    // auth context
    const { auth } = useContext(AuthContext)

    // navigate
    const navigate = useNavigate()
    
    const handler = async (auth) => {
        const res = await orderForClient(auth?.token)
        setOrders(res)
    }
    
    useEffect(()=>{
        handler(auth)
    }, [auth])
    
    if (!auth)
        navigate('/')

    return (
        <div className="page orders">
            <div className="title">
                Your Orders
            </div>
            <Row className="my-5">
                <Col md={3}>
                    <SideMenu/>
                </Col>
                <Col md={9}>
                    <UserOrderList orders={orders}/>
                </Col>
            </Row>
        </div>
    )
}

export default UserOrders