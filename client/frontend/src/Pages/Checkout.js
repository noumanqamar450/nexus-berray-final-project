import { useContext, useEffect } from "react"
import MiniCartContext from "../Context/MiniCart/MiniCartContext"
import OrderForm from '../Components/Checkout/OrderForm'
import { Col, Row } from "react-bootstrap"
import CheckoutItems from "../Components/Checkout/CheckoutItems"
import { InfoCircle } from "react-bootstrap-icons"
import Payment from '../Components/Checkout/Payment'
import CheckoutButton from "../Components/Checkout/CheckoutButton"
import SettingContext from '../Context/SiteSetting/SettingContext'

const Checkout = () => {
        
    //miniCart & cart useContext
    const { setMiniCart } = useContext(MiniCartContext)
    const { setting } = useContext(SettingContext)

    useEffect(() => {
        setMiniCart(false)
        document.title = `Checkout - ${setting?.siteName ?? 'Loading...'}`
    }, [setMiniCart, setting])
    
    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },[])

    return (
        <div className="page checkout">
            <div className="title">Checkout</div>
            
            <Row className="mt-5">
                <Col md={8}>
                    <div className="order-from mb-4">
                        <OrderForm/>
                        {
                            setting?.checkoutNote && (
                                <div className="delivery-note">
                                    <p>
                                        <strong><InfoCircle/> Note: </strong>
                                        {setting?.checkoutNote}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </Col>
                <Col md={4}>
                    <CheckoutItems />
                    <Payment/>
                    <CheckoutButton/>
                </Col>
            </Row>
        </div>
    )
}

export default Checkout