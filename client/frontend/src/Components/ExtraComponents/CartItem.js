import { useContext, useState } from "react"
import { Image, Spinner } from "react-bootstrap"
import { Dash, Plus, XLg } from "react-bootstrap-icons"
import CartContext from "../../Context/Cart/CartContext"
import Placeholder from './Placeholder'
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const CartItem = ({item}) => {
    const [isLoad, setIsLoad] = useState(false)

    // Cart useContext
    const { cart, setCart } = useContext(CartContext)

    // remove item from cart
    const removeItem = () => {
        setIsLoad(true)
        
        setTimeout(()=>{
            let copyCart = [...cart]
            let removed = copyCart.filter(i => i.productId !== item.productId)
            setIsLoad(false)
            setCart(removed)
            toast('Removed!')
        },500)
    }
    
    // Update Quantity
    const updateQuantity = (qty) => {
        setIsLoad(true)
        let copyCart = [...cart]
        let index = copyCart.findIndex(i => i.productId === item.productId)
        
        setTimeout(() => {
            let findItem = copyCart[index]
            findItem.qty += qty
            findItem.totalPrice = findItem.qty * item.price 
            setCart(copyCart)
            setIsLoad(false)
        }, 500);
    } 

    if(!item)
        return [1, 2, 3].map(a => <Placeholder key={a} height={100} borderRadius={10} marginTop={10} />)
    
    return (
        <div className="cart-item">
            <div className="image">
                <Image src={item.image}/>
            </div>
            <div className="content">
                <h1 className="title">
                    <Link to={'/product/' + item.slug}>
                        {item.name.slice(0, 17)}...
                    </Link>
                </h1>
                <div className="qty">
                    <span>Qty:</span>
                    <div>
                        <span 
                            className="qty-btn" 
                            onClick={() => item.qty > 1 ? updateQuantity(-1) : ""}
                            >
                            <Dash />
                        </span>
                            {item.qty}
                        <span 
                            className="qty-btn" 
                            onClick={() => updateQuantity(1)}
                            >
                            <Plus/>
                        </span>
                    </div>
                </div>
                <div className="price">
                    <span>Total:</span>
                    <span>Rs. {item.totalPrice}/-</span>
                </div>
                {!isLoad && <XLg onClick={removeItem} className="remove"/>}
                {isLoad && <Spinner animation="border" variant="light" size="sm"/>}
            </div>
        </div>
    )
}

export default CartItem