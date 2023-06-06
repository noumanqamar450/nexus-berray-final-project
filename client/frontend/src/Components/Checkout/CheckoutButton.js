import { useContext, useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import OrderContext from "../../Context/Order/OrderContext"
import { InfoCircle } from "react-bootstrap-icons"
import AuthContext from '../../Context/Auth/AuthContext'
import { toast } from "react-toastify"
import { orderPlaced } from "../../Context/apis"
import CartContext from '../../Context/Cart/CartContext'
import { useNavigate } from "react-router-dom"
import ConfirmOrderContext from '../../Context/ConfirmOrder/ConfirmOrderContext'

const CheckoutButton = () => {
    const [isLoad, setIsLoad] = useState(false)

    //navigate
    const navigate = useNavigate()

    //order useContext
    const { order, setOrder } = useContext(OrderContext)
    const { user } = useContext(AuthContext)
    const { auth } = useContext(AuthContext)
    const { setCart, cart } = useContext(CartContext)
    const { setOrderId } = useContext(ConfirmOrderContext)


    useEffect(()=>{
        if(user){
            setOrder({
                ...order,
                userId: user._id,
                name: user.fullName,
                email: user.email,
                mobile: user.mobile,
                items: cart,
                totalPrice: cart.reduce((sum, items) => sum + items.totalPrice, 0)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // order submit
    const orderSubmit = () => {

        // order submit 

        if (!order.mobile) {
            toast('Add mobile number.')
        } else if (!order.deliveryAddress) {
            toast('Add delivery address.')
        } else {

            setIsLoad(true)

            setTimeout(async ()=>{

                const res = await orderPlaced(auth?.token, order)
    
                if (res.message)
                    toast(res.message)
                    setIsLoad(false)
                    
                    if (res.orderId)
                    setOrder({
                        userId: '',
                        name: '',
                        email: '',
                        mobile: '',
                        deliveryAddress: '',
                        items: [],
                        totalPrice: '',
                        payment: false,
                        paymentMethod: ''
                    })
                    setCart([])
                    setIsLoad(false)
                    setOrderId(res.orderId)
                    navigate('/confirm')

            },1000)

        }
    }


    // validation for user login
    if (!user) {
        return (
            <div className="checkout-note">
                <p>
                    <InfoCircle /> Login first.
                </p>
            </div>
        )
    }
    
    // validation for payment method
    if (!order.paymentMethod){
        return (
            <div className="checkout-note">
                <p>
                    <InfoCircle/> Select payment method.
                </p>
            </div>
        )
    }
    
    // validation for order items
    if (!order.items.length > 0) {
        return (
            <div className="checkout-note">
                <p>
                    <InfoCircle /> Add product to cart.
                </p>
            </div>
        )
    }


    return (
        <div className="checkout-button" >
            <Button 
                className="w-100"
                onClick={orderSubmit}
                disabled={isLoad}
            >
                {isLoad && <Spinner animation="border" className="mx-2" size="sm" variant="light"/>}
                Place Order
            </Button>
        </div>
    )
}

export default CheckoutButton