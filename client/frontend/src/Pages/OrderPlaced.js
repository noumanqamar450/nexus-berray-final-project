import { useContext, useEffect } from "react"
import ConfirmOrderContext from '../Context/ConfirmOrder/ConfirmOrderContext'
import { useNavigate } from "react-router-dom"
import SettingContext from '../Context/SiteSetting/SettingContext'

const OrderPlaced = () => {

    //navigate
    const navigate = useNavigate()
    
    // Confirm Order Context
    const { orderId } = useContext(ConfirmOrderContext)
    const { setting } = useContext(SettingContext)

    useEffect(()=>{
        document.title = `Order Confirm - ${setting?.siteName ?? 'Loading...'}`
    },[setting])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    useEffect(()=>{
        if (!orderId) {
            navigate('/')
        }
    }, [orderId, navigate])

    return (
        <div className="page">
            <div className="confirm-order">
                <img src="/images/order-confirmed.svg" alt="Confirm Order"/>
                <div className="content">
                    <h1>Your order successfully placed.</h1>
                    <p>Order Number: {orderId || 'LFC------'}</p> 
                </div>
            </div>
        </div>
    )
}

export default OrderPlaced