import { Link } from "react-router-dom"

const ProceedCart = ({items}) => {
    return (
        <div className="proceed-cart">
            <div className="total">
                <span>Total:</span>
                <span>Rs. {items.reduce((sum, item) => item.totalPrice + sum, 0)}/-</span>
            </div>
            <hr />
            <Link to="/checkout" className="btn btn-primary w-100">Proceed to checkout</Link>
        </div>
    )
}

export default ProceedCart