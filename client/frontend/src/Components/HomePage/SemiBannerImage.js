import { Col, Image } from "react-bootstrap"

const SemiBannerImage = ({banner}) => {
    return (
        <Col md={6}>
            <div className="banner">
                <Image
                    src={banner.fileUrl}
                    alt={banner.altText}
                />
            </div>
        </Col>
    )
}

export default SemiBannerImage