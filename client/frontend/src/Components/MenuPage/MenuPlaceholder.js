import { Col, Row } from "react-bootstrap"
import Placeholder from "../ExtraComponents/Placeholder"

const MenuPlaceholder = () => {
    return (
        <div className="page">
            <Row>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(p => (
                        <Col lg={4} md={6} key={p}>
                            <Placeholder height={350} borderRadius={15} marginBottom={20} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default MenuPlaceholder