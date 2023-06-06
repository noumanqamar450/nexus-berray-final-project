import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {  Facebook, Instagram, Link45deg, Linkedin, Tiktok, Twitter, Youtube } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import SettingContext from '../../Context/SiteSetting/SettingContext';
import MenuContext from '../../Context/PageMenu/MenuContext'

const Footer = () => {
    
    // setting context
    const { setting } = useContext(SettingContext)
    const { footerMenu } = useContext(MenuContext)

    return (
        <div className="footer">
            <div className="main-footer">
                <Container>
                    <Row>
                        <Col md={4}>
                            <div className="about-col">
                                <p>
                                    {setting?.shortAbout}
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="footer-menu">
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/menu">Menu</Link>
                                    </li>
                                    {
                                        footerMenu?.map((f, i) => (
                                            <li key={i}>
                                                <Link to={`/${f.slug}`}>{f.title}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="footer-news-letter">
                                <Row className="app-downloader">
                                    {
                                        setting?.androidLink && (
                                            <Col xs={6}>
                                                <a target="_new" href={setting?.androidLink}>
                                                    <img src="/images/Android-Store-logos.png" alt="Android App" />
                                                </a>
                                            </Col>
                                        )
                                    }
                                    {
                                        setting?.iosLink && (
                                            <Col xs={6}>
                                                <a target="_new" href={setting?.iosLink}>
                                                    <img src="/images/App-Store-logos.png" alt="Apple App" />
                                                </a>
                                            </Col>
                                        )
                                    }
                                   
                                </Row>
                                <div className="footer-social-icon">
                                    <ul>
                                        {
                                            setting?.facebook && (
                                                <li>
                                                    <a target="_new" href={setting?.facebook}>
                                                        <Facebook />
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            setting?.instagram && (
                                                <li>
                                                    <a target="_new" href={setting?.instagram}>
                                                        <Instagram />
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            setting?.twitter && (
                                                <li>
                                                    <a target="_new" href={setting?.twitter}>
                                                        <Twitter />
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            setting?.linkedin && (
                                                <li>
                                                    <a target="_new" href={setting?.linkedin}>
                                                        <Linkedin />
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            setting?.youtube && (
                                                <li>
                                                    <a target="_new" href={setting?.youtube}>
                                                        <Youtube />
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            setting?.tiktok && (
                                                <li>
                                                    <a target="_new" href={setting?.tiktok}>
                                                        <Tiktok />
                                                    </a>
                                                </li>
                                            )
                                        }
                                        {
                                            setting?.web && (
                                                <li>
                                                    <a target="_new" href={setting?.web}>
                                                        <Link45deg />
                                                    </a>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <hr />
                <Container>
                    <div className="copy-right">
                        {setting?.copyright}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Footer;