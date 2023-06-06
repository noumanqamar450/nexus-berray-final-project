import { useState } from "react"
import AuthModalContext from "./AuthModalContext"

const AuthModalState = ({ children }) => {
    const [authModalShow, setAuthModalShow] = useState(false)
    return (
        <AuthModalContext.Provider value={{ authModalShow, setAuthModalShow }}>
            {children}
        </AuthModalContext.Provider>
    )
}

export default AuthModalState