import { Col, Row } from "react-bootstrap"
import Placeholder from "../ExtraComponents/Placeholder"

const CateImagePlaceholder = () => {
    return (
        <Row className="my-5">
            {
                [1, 2, 3, 4, 5, 6].map(l => (
                    <Col xs={6} md={2} key={l}>
                        <Placeholder height={200} borderRadius={10} marginBottom={10} />
                    </Col>
                ))
            }
        </Row>
    )
}

export default CateImagePlaceholder