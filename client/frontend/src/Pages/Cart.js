import { useContext, useEffect } from "react"
import MiniCartContext from '../Context/MiniCart/MiniCartContext'
import { Col, Row } from "react-bootstrap"
import CartList from "../Components/CartPage/CartList"
import CartContext from "../Context/Cart/CartContext"
import ProceedCart from "../Components/CartPage/ProceedCart"
import SettingContext from '../Context/SiteSetting/SettingContext'

const Cart = () => {

    //miniCart & cart useContext
    const { setMiniCart } = useContext(MiniCartContext)
    const { cart } = useContext(CartContext)
    const { setting } = useContext(SettingContext)

    useEffect(()=>{
        setMiniCart(false)
        document.title = `Cart - ${setting?.siteName ?? 'Loading...'}`
    }, [setMiniCart, setting])
    
    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },[])

    if (!cart.length > 0)
        return (
            <div className="page cart">
                <div className="image-message">
                    <img src="/images/empty.svg" alt="Empty Cart" />
                    <h1>Cart is empty</h1>
                </div>
            </div>
        );

    return (
        <div className="page">
            <h1 className="title">Cart</h1>
            <Row>
                <Col md="8">
                    <div className="cart-lists">
                    {
                        cart.map((item, i) => (
                            <CartList key={i} item={item}/>
                        ))
                    }
                    </div>
                </Col>
                <Col md="4">
                    <ProceedCart items={cart}/>
                </Col>
            </Row>
        </div>
    )
}

export default Cart