import { Row, Col } from "react-bootstrap";
import Products from "../Components/MenuPage/Products";
import { useContext, useEffect } from "react";
import Filter from '../Components/MenuPage/Filter'
import FooterTop from '../Components/ExtraComponents/FooterTop'
import { Link } from "react-router-dom";
import SettingContext from '../Context/SiteSetting/SettingContext'

function Menu() {

    // setting context
    const { setting } = useContext(SettingContext)
    
    // Scroll Up & Apis
    useEffect(()=>{
        document.title = `Menu - ${setting?.siteName ?? 'Loading...'}`;
    }, [setting])

    return(
        <>
            <nav aria-label="breadcrumb" className="mt-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Menu</li>
                </ol>
            </nav>
            <div className="page">
                <Row>
                    <Col md={3}>
                        <Filter />
                    </Col>
                    <Col md={9}>
                        <h1 className="title">Menu</h1>
                        <Products />
                    </Col>
                </Row>
            </div>
            <FooterTop/>
        </>
    )
}

export default Menu;