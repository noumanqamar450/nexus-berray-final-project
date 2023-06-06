import { useEffect, useState } from 'react'
import CartContext from './CartContext'

const CartState = ({ children }) => {
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        const localCartData = JSON.parse(localStorage.getItem('cart'))
        if (localCartData?.length > 0) {
            setCart(localCartData)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return(
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartState