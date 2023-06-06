import {  useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Badge, Spinner } from "react-bootstrap";
import { Dash, Plus } from "react-bootstrap-icons";
import ReactMarkdown from 'react-markdown'
import FooterTop from "../ExtraComponents/FooterTop";
import DetailPlaceholder from "./DetailPlaceholder";
import { getProductBySlug } from '../../Context/apis'
import ProductSlider from './ProductSlider'
import CartContext from '../../Context/Cart/CartContext'
import { toast } from "react-toastify";
import MiniCartContext from '../../Context/MiniCart/MiniCartContext'

const Detail = () => {
    const [singleProduct, setSingleProduct] = useState(null)
    const [qty, setQty] = useState(1)
    const [isLoad, setIsLoad] = useState(false)
    const [total, setTotal] = useState(setSingleProduct?.salePrice ? setSingleProduct?.salePrice : setSingleProduct?.price)

    let {slug} = useParams()
    
    // mini cart useContext
    const { setMiniCart } = useContext(MiniCartContext)
    
    useEffect(() => {
        setMiniCart(false)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.title = `${singleProduct ? singleProduct?.name : 'Loading...'} - Love Food Court`
    }, [singleProduct, setMiniCart])
    
    const getSinglePro = async (slug) => {
        const pro = await getProductBySlug(slug)

        if (!pro.message) {
            setSingleProduct(pro)
        } else {
            console.log(pro.message);
        }
    }
    
    useEffect(()=>{
        getSinglePro(slug)
    }, [slug])
    
    
    useEffect(() => {
        const calc = (singleProduct?.salePrice ? singleProduct?.salePrice : singleProduct?.price) * qty
        setTotal(calc)
    }, [qty, singleProduct])

    const qtyHandle = (param) => {
        setQty(qty + param)
    }

    // Cart useContext
    const { cart, setCart } = useContext(CartContext) 

    // reset states
    const reset = () => {
        setQty(1)
        setTotal(singleProduct?.salePrice ? singleProduct?.salePrice : singleProduct?.price)
    }
    
    // Add To Cart Product
    const addToCart = () => {
        let copyCart = [...cart]

        //set loading on button
        setIsLoad(true)

        let data = {
            productId: singleProduct?._id,
            name: singleProduct?.name,
            qty,
            slug: singleProduct?.slug,
            price: singleProduct?.salePrice ? singleProduct?.salePrice : singleProduct?.price,
            totalPrice: total,
            image: singleProduct?.imageUrl[0].fileUrl
        }

        const index = copyCart.findIndex(item => item.productId === singleProduct?._id)

        setTimeout(() => {
            if (index === -1) {
                copyCart.push(data)
                setCart(copyCart)
            } else {
                let item = copyCart[index]
                item.qty += qty
                item.totalPrice += total
                setCart(copyCart)
            }
            setIsLoad(false)
            reset()
            toast('Added to cart')
        }, 1000)
    }

    if (!singleProduct)
        return <div className="page single-product"><DetailPlaceholder /></div>

    if (!singleProduct.status) {
        window.location.href = "/page-not-found";
    } else {
        return (
            <>
                <nav aria-label="breadcrumb" className="mt-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item">
                            <Link to={'/category/' + singleProduct.category.slug}>
                                {singleProduct.category.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{singleProduct.name}</li>
                    </ol>
                </nav>
                <div className="page single-product">
                    <Row>
                        <Col md={6}>
                            <ProductSlider product={singleProduct}/>
                        </Col>
                        <Col md={6}>
                            <div className="single-product-detail">
                                <h1 className="title">{singleProduct.name} </h1>
                                <div>
                                    <ReactMarkdown>
                                        {singleProduct.desc}
                                    </ReactMarkdown>
                                </div>
                                {singleProduct.salePrice ? (<h6><del>Rs. {singleProduct.price}/-</del></h6>) : ''}
                                <h5>Rs. {singleProduct.salePrice ? singleProduct.salePrice : singleProduct.price}/-</h5>
                                <div className="qty">
                                    <h6>Quantity:</h6>
                                    <Dash onClick={() => qty > 1 ? qtyHandle(-1) : ''} />
                                    <h6>{qty}</h6>
                                    <Plus onClick={() => qtyHandle(1)} />
                                </div>
                                <h6>Brand: <Badge bg='primary mb-3'>
                                        <Link to={'/category/' + singleProduct.category.slug}>
                                            {singleProduct.category.name}
                                        </Link>
                                    </Badge>
                                </h6>
                                <div className="single-product-buttons">
                                    <button
                                        className="btn btn-primary"
                                        onClick={addToCart}
                                        disabled={isLoad}
                                        >
                                        {isLoad && <Spinner animation="border" variant="light" size="sm" className="mx-2" />}
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            <FooterTop/>
        </>
        )
    }
}

export default Detail;