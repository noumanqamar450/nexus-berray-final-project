import { Col, Row } from "react-bootstrap"
import ProCard from "../HomePage/ProCard"
import Placeholder from "../ExtraComponents/Placeholder"

const ProductsForCategory = ({ product }) => {
    if (!product)
        return (
            <Row>
                { [1, 2, 3, 4].map(p => (
                    <Col lg={3} key={p}>
                        <Placeholder height={350} borderRadius={15} marginBottom={20} />
                    </Col>
                ))} 
            </Row>
        )
    else
        return (
            <Row>
                {
                    product.map((p, i) => (
                        <Col md={3} key={i}>
                            <ProCard products={p} />
                        </Col>
                    ))
                }
            </Row>
        )
}

export default ProductsForCategory