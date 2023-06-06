import { useState } from "react"
import OrderModal from "./OrderModal"
import { Eye } from "react-bootstrap-icons"

const OrderList = ({ item }) => {

    const [show, setShow] = useState(false)

    const hideMe = () => {
        setShow(false)
    }

    return (
        <>
            <div className="list">
                <div className="id">{item.orderId}</div>
                <div className="date">{item.createdAt?.slice(0, 10)} - {item.createdAt?.slice(11, 19)}</div>
                <div className="status">{item.status}</div>
                <div className="view" onClick={_ => setShow(true)}><Eye /></div>
            </div>
            <OrderModal
                items={item.items}
                totalPrice={item.totalPrice}
                note={item.note}
                name={item.name}
                email={item.email}
                mobile={item.mobile}
                address={item.deliveryAddress}
                orderId={item.orderId}
                method={item.paymentMethod}
                payment={item.payment}
                status={item.status}
                active={show}
                hideMe={hideMe}
            />
        </>
    )
}

export default OrderList