import { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Dash, Plus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Placeholder from "../ExtraComponents/Placeholder";
import CartContext from "../../Context/Cart/CartContext";
import { toast } from "react-toastify";

const ProCard = (props) => {
    const { _id, imageUrl, name, desc, price, slug, salePrice } = props.products
    
    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const [isLoad, setIsLoad] = useState(true)
    const [qty, setQty] = useState(1)
    const [total, setTotal] = useState(salePrice ? salePrice : price)
    
    // cart context
    const { cart, setCart } = useContext(CartContext)

    const qtyHandle = (param) => {
        setQty(qty + param)
    }

    useEffect(()=>{
        const calc = (salePrice ? salePrice : price) * qty
        setTotal(calc)
    }, [qty, salePrice, price])

    // reset states
    const reset = () => {
        setQty(1)
        setTotal(salePrice ? salePrice : price)
    }

    // Add To Cart Product
    const addToCart = () => {
        let copyCart = [...cart]

        //set loading on button
        setAddToCartLoading(true)
        
        let data = {
            productId: _id,
            name,
            qty,
            slug,
            price: salePrice ? salePrice : price,
            totalPrice: total,
            image: imageUrl[0].fileUrl
        }
        
        const index = copyCart.findIndex(item => item.productId === _id) 
        
        setTimeout(()=>{
            if (index === -1) {
                copyCart.push(data)
                setCart(copyCart)
            } else {
                let item = copyCart[index]
                item.qty += qty
                item.totalPrice += total
                setCart(copyCart)
            }
            setAddToCartLoading(false)
            reset()
            toast('Added to cart')
        }, 1000)
    }

    return (
        <div className="pro-card">
            <div className="image">
                {isLoad && <Placeholder position={'absolute'} background={'#2B2644'} opacity={1}/>}
                <img src={imageUrl[0].fileUrl} alt={name} onLoad={()=> setIsLoad(false)} />
                <span className="discount-label" style={salePrice ? { display: 'block' } : { display: 'none' }}>{salePrice ? Math.round(100 - ((salePrice / price) * 100)) + '% Off': ''}</span>
            </div>
            <div className="body">
                <div className="content">
                    <h2><Link to={'/product/' + slug} >{name}</Link></h2>
                    <p className="for-all">{desc.slice(0, 65)} ...</p>
                    <p className="for-mobile">{desc.slice(0, 20)} ...</p>
                </div>
                <div className="price">
                    <h5>Rs. {salePrice ? salePrice : price}/-</h5>
                    <div className="qty">
                        <Dash onClick={() => qty > 1 ? qtyHandle(-1) : ''} />
                        <h6>{qty}</h6>
                        <Plus onClick={() => qtyHandle(1)} />
                    </div>
                </div>
                <Button 
                    style={{ width: '100%' }}
                    onClick={addToCart}
                    disabled={addToCartLoading}
                    >
                    {addToCartLoading && <Spinner animation="border" variant="light" size="sm" className="mx-2" />}
                    <span>Add to Cart</span> 
                </Button>
            </div>
        </div>
    )
}

export default ProCard