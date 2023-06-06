import { InfoCircle } from "react-bootstrap-icons"
import OrderList from "./OrderList";

const UserOrderList = ({orders}) => {

    if (!orders)
        return null

    if (orders.message) 
        return (
            <div className="alert-box">
                <InfoCircle /> <p>{orders.message}</p>
            </div>
        )

    return (
        <div className="order-list">
            <div className="list-head">
                <div>Order Id</div>
                <div>Date</div>
                <div>Status</div>
                <div>Action</div>
            </div>
            {
                orders.map((order, i)=>(
                    <OrderList item={order} key={i}/>
                ))
            }
        </div>
    ) 
}

export default UserOrderList