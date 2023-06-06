import { Col, Form, Row } from "react-bootstrap"
import SideMenu from "../Components/UserOrder/SideMenu"
import { useContext } from "react"
import AuthContext from "../Context/Auth/AuthContext"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {

    // auth context
    const { auth, user } = useContext(AuthContext)

    // navigate
    const navigate = useNavigate()


    if (!auth)
        navigate('/')

    return(
        <div className = "page orders" >
            <div className="title">
                Your Profile
            </div>
            <Row className="my-5">
                <Col md={3}>
                    <SideMenu/>
                </Col>
                <Col md={9}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" value={user?.fullName} readOnly/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={user?.email} readOnly />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" value={user?.mobile} readOnly />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control type="text" value={user?.gender} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div >
    )
}

export default UserProfile