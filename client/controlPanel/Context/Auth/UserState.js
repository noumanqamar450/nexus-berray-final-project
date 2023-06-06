import { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { adminRecord } from '../../libs/Apis'
import { useNavigate } from 'react-router-dom'

const UserState = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [user, setUser] = useState(null)

    //navigate to dashboard
    const navigate = useNavigate()

    useEffect(()=>{
        if (auth?.token)
            setTimeout(()=>{
                navigate('/dashboard')
            },500)
        else 
            navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    // set Auth State from localStorage
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('auth'))
        if (token) {
            setAuth(token)
        }
    }, [])

    // set Auth & localStorage from login form
    useEffect(() => {
        const token = localStorage.getItem('auth')
        if (!token) {
            auth && localStorage.setItem('auth', JSON.stringify(auth))
        }
    }, [auth]);

    useEffect(() => {
        const getUserData = async () => {
            if (auth?.token) {
                const res = await adminRecord(auth?.token);
                if (res.message) {
                    console.log(res.message);
                } else {
                    setUser(res)
                }
            }
        }
        getUserData()
    }, [auth])

    return (
        <UserContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState