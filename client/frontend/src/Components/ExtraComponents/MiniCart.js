import { XLg } from 'react-bootstrap-icons';
import ProductListForMiniCart from './ProductListForMiniCart';
import { useContext } from 'react';
import CartContext from '../../Context/Cart/CartContext';
import { Link } from 'react-router-dom';
import MiniCartContext from '../../Context/MiniCart/MiniCartContext'

const MiniCart = (props) => {
    // cart useContext
    const { cart } = useContext(CartContext)
    const { miniCart, setMiniCart } = useContext(MiniCartContext)
    
    return(
        <>
            <div className={miniCart ? 'mini-cart-overlay active' : 'mini-cart-overlay'} onClick={() => setMiniCart(false)}></div>
            <div className={miniCart ? 'mini-cart active' : 'mini-cart' }>
                <div className="mini-cart-x" onClick={() => setMiniCart(false)}><XLg/></div>
                <h2 className="mini-cart-title">Cart</h2>
                <div className="mini-cart-items">
                    <ProductListForMiniCart/>
                </div>
                <div className="view-cart-btn">
                    <div className="total">
                        <span>
                            Grand Total:
                        </span>
                        <span>
                            Rs. { cart.reduce((sum, item)=> item.totalPrice + sum ,0) }/-
                        </span>
                    </div>
                    <hr />
                    <Link className='btn btn-primary' to="/cart">View Cart</Link>
                    <Link className='btn btn-danger' to="/checkout">Checkout</Link>
                </div>
            </div>
        </>
    )
}

export default MiniCart;