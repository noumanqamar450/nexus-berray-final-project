import { Row, Col } from "react-bootstrap"
import Placeholder from "../ExtraComponents/Placeholder"

const ContactFormPlaceholder = () => {
    return(
        <Row>
            <Col xs={6}>
                <Placeholder height={60} borderRadius={10} />
            </Col>
            <Col xs={6}>
                <Placeholder height={60} borderRadius={10} />
            </Col>
            <Col>
                <Placeholder height={60} borderRadius={10} marginTop={20}/>
                <Placeholder height={100} borderRadius={10} marginTop={20} />
                <Placeholder height={50} borderRadius={10} marginTop={20} />
            </Col>
        </Row>
    )
}

export default ContactFormPlaceholder