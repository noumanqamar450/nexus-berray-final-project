import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import { userRecord } from '../../Context/apis'

const AuthState = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [user, setUser] = useState(null)

    // set auth useState from localStorage if token exists
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'))
        if (token){
            setAuth(token)
        }
    },[])

    // set token on localStorage from login Api
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (!token){
            auth && localStorage.setItem('token', JSON.stringify(auth))
        }
    }, [auth]);

    //get User from Api using token
    useEffect(()=>{
        const getUserData = async () => {
            if (auth) {
                const res = await userRecord(auth?.token);
                if (res.message){
                    console.log(res.message);
                } else {
                    setUser(res)
                }
            }
        } 
        getUserData()
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState