import { useContext, useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import { XLg } from "react-bootstrap-icons"
import AuthModalContext from '../../Context/AuthModal/AuthModalContext'

const AuthModal = () => {
    const [show, setShow] = useState(false)

    // authModal useContext
    const { authModalShow, setAuthModalShow } = useContext(AuthModalContext)

    // Modal Close 
    const modalClose = () => {
        setAuthModalShow(false)
        setShow(false)
    }

    return (
        <div className={authModalShow ? 'auth-modal active' : 'auth-modal'}>
            <div className={authModalShow ? 'overlay active' : 'overlay'}></div>
            <div className="forms">
                <XLg className="back" onClick={modalClose}/>
                <Login active={show} />
                <Signup active={show} setActive={setShow}/>
                <div className="note">
                    <span className={!show ? 'active': ''}>
                        Don’t have an account? <strong onClick={_=> setShow(true)}>Sign up</strong> 
                    </span>
                    <span className={show ? 'active' : ''}>
                        Already have an account? <strong onClick={_ => setShow(false)}>Log in</strong>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AuthModal