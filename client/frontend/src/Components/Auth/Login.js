import {Button, Form, Spinner } from "react-bootstrap"
import { userLogin } from "../../Context/apis"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import AuthContext from "../../Context/Auth/AuthContext"
import AuthModalContext from '../../Context/AuthModal/AuthModalContext'

const Login = ({ active }) => {
    const [fields, setFields] = useState({user:'', password:''})
    const [isLoad, setIsLoad] = useState(false)

    // auth & authModal useContext 
    const { setAuth } = useContext(AuthContext)
    const { setAuthModalShow } = useContext(AuthModalContext)

    
    const login = async (e) => {
        e.preventDefault()
        setIsLoad(true)
        
        //login user by api
        const res = await userLogin(fields)

        if(res.message) {
            toast(res.message)
            setIsLoad(false)
        } else {
            toast("Successfully login.")
            setFields({user:'',password:''})
            setAuth(res)
            setAuthModalShow(false)
            setIsLoad(false)
        }
    }
    return (
        <Form className={!active ? 'active' : ''} onSubmit={login}>
            <h1>Login</h1>
            <Form.Group className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="Email / Mobile Number" 
                    value={fields.user}
                    onChange={(e) => setFields({...fields, user: e.target.value})}
                    required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={fields.password}
                    onChange={(e) => setFields({ ...fields, password: e.target.value })} 
                    required/>
            </Form.Group>
            <Button type="submit" className="w-100" disabled={isLoad}>
                {isLoad && <Spinner animation="border" size="sm" variant="light" className="mx-2"/>}
                Sign In
            </Button>
        </Form>
    )
}

export default Login