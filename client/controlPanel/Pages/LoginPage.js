import { useContext, useEffect, useState } from "react"
import { adminLogin } from "../libs/Apis"
import UserContext from "../Context/Auth/UserContext"

const LoginPage = () => {
    const [field, setField] = useState({ user: '', password: '' })
    const [alert, setAlert] = useState(null)

    //navigate

    useEffect(()=>{
        document.title = "Admin Login"
    },[])

    //useContext
    const { setAuth } = useContext(UserContext)

    //Admin Login 
    const login = async (e) => {
        e.preventDefault()

        const res = await adminLogin(field);
        if (res.token) {
            setAlert("Admin login successfully.")
            setAuth(res)
        } else {
            setAlert(res.message)
        }
    }

    return (
        <div className="login-page">
            <div className="form">
                <h1>Admin Login</h1>
                <form onSubmit={login}>
                    <div className="form-group mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            onChange={(e) => setField({ ...field, user: e.target.value})}
                            required/>
                    </div>
                    <div className="form-group mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            onChange={(e) => setField({ ...field, password: e.target.value })}
                            required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                {alert  &&   <div className="alert alert-primary mt-3">
                            {alert}
                            <button 
                                type="button" 
                                className="btn-close ms-3" 
                                onClick={()=> setAlert(null)}
                                ></button>
                            </div> }
            </div>
        </div>
    )
}

export default LoginPage