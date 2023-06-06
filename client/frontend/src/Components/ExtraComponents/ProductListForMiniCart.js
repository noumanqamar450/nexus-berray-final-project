import { useContext } from "react"
import CartContext from '../../Context/Cart/CartContext'
import CartItem from "./CartItem"
import { CartX } from "react-bootstrap-icons"

const ProductListForMiniCart = () => {

    // cart useContext
    const { cart } = useContext(CartContext)

    if (!cart.length > 0)
        return (
            <div className="empty-cart">
                <CartX/>
                <span>Empty Cart</span>
            </div>
        );

    return cart.map((items, i) => (
        <CartItem key={i} item={items}/>
    ))
}

export default ProductListForMiniCart