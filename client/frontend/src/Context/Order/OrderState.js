import { useState } from "react"
import OrderContext from "./OrderContext"

const OrderState = ({ children }) => {

    const [order, setOrder] = useState({
        userId: '',
        name: '',
        email: '',
        mobile: '',
        deliveryAddress:'',
        items:[],
        totalPrice:'',
        payment: false,
        paymentMethod:'',
        note:''
    })

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderState