import { Col, Row } from 'react-bootstrap';
import { featuredProduct } from '../../Context/apis'
import { useEffect, useState } from "react";
import ProCard from './ProCard';
import Placeholder from '../ExtraComponents/Placeholder';
import { Link } from 'react-router-dom';

const FoodArea = () => {
    const [product, setProduct] = useState(null)

    const brandApi = async () => {
        const limitProduct = await featuredProduct({ limit: 8 })

        if (!limitProduct.message) {
            setProduct(limitProduct)
        } else {
            console.log(limitProduct.message);
        }
    }

    useEffect(()=>{
        brandApi();
    },[])


    if (!product) 
        return (
            <Row className='mt-3'>
                <Col lg={3} md={4}>
                    <Placeholder height={350} borderRadius={15} />
                </Col>
                <Col lg={3} md={4}>
                    <Placeholder height={350} borderRadius={15} />
                </Col>
                <Col lg={3} md={4}>
                    <Placeholder height={350} borderRadius={15} />
                </Col>
                <Col lg={3} md={4}>
                    <Placeholder height={350} borderRadius={15} />
                </Col>
            </Row>
        )

    return (
        <div className="food-area">
            <div className="pro-cate">
                <div className="cate-title">
                    <Link to="/menu/" className="btn btn-primary float-end">See More</Link>
                    <h1>Top Selling</h1>
                    <hr />
                </div>
            </div>
            <Row>
            {
                product.data.map((p,i)=>(
                    <Col lg={3} md={4} key={i}>
                        <ProCard products={p}/>
                    </Col>
                ))
            }
            </Row>
        </div>
    )
}

export default FoodArea;