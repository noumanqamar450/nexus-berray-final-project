import { Col, Row } from "react-bootstrap"
import Placeholder from "../ExtraComponents/Placeholder"

const DetailPlaceholder = () => {
    return(
        <Row>
            <Col md={6}>
                <Placeholder height={'55vh'} borderRadius={15} marginBottom={30}/>
            </Col>
            <Col md={6}>
                <Placeholder height={40} width={250} borderRadius={10} />
                <Placeholder height={10} borderRadius={10} marginTop={20} />
                <Placeholder height={10} borderRadius={10} marginTop={10} />
                <Placeholder height={10} width={350} borderRadius={10}  marginTop={10}/><br/>
                <Placeholder height={40} width={100} borderRadius={10} marginTop={20} /><br />
                <Placeholder height={40} width={200} borderRadius={10} marginTop={20} /><br/>
                <Placeholder height={40} width={150} borderRadius={10} marginTop={20} /><br />
                <Row>
                    <Col xs={6}>
                        <Placeholder height={40} borderRadius={10} marginTop={20} />
                    </Col>
                    <Col xs={6}>
                        <Placeholder height={40} borderRadius={10} marginTop={20}  />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default DetailPlaceholder