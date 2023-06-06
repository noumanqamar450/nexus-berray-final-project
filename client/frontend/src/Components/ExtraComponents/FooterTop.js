import { Col, Container, Row } from "react-bootstrap";
import Placeholder from './Placeholder'
import { useContext } from "react";
import SettingContext from '../../Context/SiteSetting/SettingContext'

const FooterTop = () => {
    
    // setting context
    const { setting } = useContext(SettingContext)

    if (!setting) {
        return (
            <Container>
                <Row>
                    {
                        [1,2,3].map( w => (
                            <Col md={4} key={w}>
                                <div className={'footer-top ' + (w % 3 ? '' : 'last')}>
                                    <Placeholder width={100} height={30} borderRadius={10} marginBottom={20} />
                                    <Placeholder height={10} borderRadius={10} marginBottom={10} />
                                    <Placeholder width={200} height={10} borderRadius={10} />
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <div className='footer-top'>
                        <h2>{setting.footerTop.left.heading}</h2>
                        <p>{setting.footerTop.left.content}</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className='footer-top'>
                        <h2>{setting.footerTop.center.heading}</h2>
                        <p>{setting.footerTop.center.content}</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className='footer-top last'>
                        <h2>{setting.footerTop.right.heading}</h2>
                        <p>{setting.footerTop.right.content}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default FooterTop;