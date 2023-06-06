import { useContext } from "react"
import CartContext from "../../Context/Cart/CartContext"

const CheckoutItems = () => {

    // useContext
    const { cart } = useContext(CartContext)

    if (!cart.length > 0)
        return (
            <div className="items">
                <p>Cart item not found.</p> 
            </div>
        )

    return (
        <div className="items">
            {cart.map((item, i) => (
                <div className="item" key={i}>
                    <div className="name">
                        {item.name}
                    </div>
                    <div className="qty">
                        Qty: {item.qty}
                    </div>
                    <div className="price">
                        Rs. {item.totalPrice}/-
                    </div>
                </div>
            ))}

            <div className="divider"></div>
            <div className="total">
                <span>
                    Total:
                </span>
                <span className="price">
                    Rs. {cart.reduce((sum, item) => sum + item.totalPrice, 0)}/-
                </span>
            </div>
        </div>
    )
}

export default CheckoutItems