import { Col, Row } from "react-bootstrap";
import ProCard from './ProCard';
import { useEffect, useState } from 'react';
import Placeholder from "../ExtraComponents/Placeholder";

const ProCategory = (props) => {
    const { brand_name, brand_slug } = props.cate.attributes
    const [product, setProduct] = useState(null)
    const [isLoad, setIsLoad] = useState(true)

    useEffect(()=>{
        const setProductApi = async () => {
            setProduct(null)
        }
        setProductApi()
    },[])
    return (
        <div className="pro-cate">
            <div className="cate-title">
                <a href={'/brands/' + brand_slug} className="btn btn-primary float-end">See More</a>
                <h1>{brand_name}</h1>
                <hr/>
            </div>
            <Row>
                {isLoad && [1,2,3,4].map(p =>(
                     <Col lg={3} md={4} key={p}>
                        <Placeholder height={350} borderRadius={15}/>
                     </Col>
                ))} 
                {
                    product?.filter(p => p.attributes.brand.data.id === props.id).slice(0, 4).map((p,i) => (
                        <Col lg={3} md={4} key={i} onLoad={()=> setIsLoad(false)}>
                            <ProCard products={p.attributes}/>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default ProCategory;