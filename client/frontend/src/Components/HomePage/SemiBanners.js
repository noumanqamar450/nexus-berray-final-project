import { Row, Col } from "react-bootstrap";
import Placeholder from '../ExtraComponents/Placeholder';
import SemiBannerImage from './SemiBannerImage'


const SemiBanners = (props) => {
    const banner = props.banner?.response[0].semiBanner

    if(!banner)
        return (
            <div className="semi-banner">
                <Row className="mt-3">
                    <Col md="6">
                        <Placeholder height={200} borderRadius={15}/>
                    </Col>
                    <Col md="6">
                        <Placeholder height={200} borderRadius={15} />
                    </Col>
                </Row>
            </div>
        )

    return (
        <div className="semi-banner">
            <Row>
                {
                    banner.map((b, i)=>(
                        <SemiBannerImage banner={b} key={i}/>
                    ))
                }
            </Row>
        </div>
    )
}

export default SemiBanners;