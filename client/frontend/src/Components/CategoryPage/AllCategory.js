import { Col, Row } from "react-bootstrap"
import CateImage from "./CateImage"

const AllCategory = ({category}) => {

    return(
        <Row className="mt-4">
            {
                category.map((c, i) => (
                    <Col xs={6} md={2} key={i} style={{ marginBottom: '25px' }}>
                        <CateImage cate={c} />
                    </Col>
                ))
            }
        </Row>
    )
}

export default AllCategory