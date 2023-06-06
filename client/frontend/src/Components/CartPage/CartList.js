import { useContext, useState } from "react"
import { Image, Spinner } from "react-bootstrap"
import { Dash, Plus, XLg } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import CartContext from "../../Context/Cart/CartContext"
import { toast } from "react-toastify"

const CartList = ({item}) => {
    const [isLoad, setIsLoad] = useState(false)

    //cart useContext
    const { cart, setCart } = useContext(CartContext)

    // remove item from cart
    const removeItem = () => {
        setIsLoad(true)
        let copyCart = [...cart]
        
        setTimeout(() => {
            let removed = copyCart.filter(i => i.productId !== item.productId)
            setIsLoad(false)
            setCart(removed)
            toast('Removed!')
        }, 500)
    }

    // Update Quantity
    const updateQuantity = (qty) => {
        setIsLoad(true)
        let copyCart = [...cart]
        let index = copyCart.findIndex(i => i.productId === item.productId)

        setTimeout(() => {
            let finsItem = copyCart[index]
            finsItem.qty += qty
            finsItem.totalPrice = item.price * finsItem.qty
            setCart(copyCart)
            setIsLoad(false)
        }, 500);
    }

    return (
        <div className="list">
            <div className="remove">
                {
                    isLoad ? <Spinner animation="border" size="sm" className="text-white" /> : <XLg onClick={() => removeItem()}/>
                }  
            </div>
            <div className="image">
                <Image src={item.image}/>
            </div>
            <div className="title">
                <Link to={'/product/' + item.slug}>
                    <h1>{item.name}</h1>
                </Link>
                <span>
                    Rs. {item.price} x
                </span>
            </div>
            <div className="qty">
                <span onClick={_ => item.qty > 1 ? updateQuantity(-1) : ''}>
                    <Dash/>
                </span>
                {item.qty}
                <span onClick={_ => updateQuantity(1)}>
                    <Plus />
                </span>
            </div>
            <div className="total">
                Rs. {item.totalPrice}/-
            </div>
        </div>
    )
}

export default CartList