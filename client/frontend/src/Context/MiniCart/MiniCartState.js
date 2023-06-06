import { useState } from 'react'
import MiniCartContext  from './MiniCartContext'

const MiniCartState = ({ children }) => {
    const [miniCart, setMiniCart] = useState(false)

    return (
        <MiniCartContext.Provider value={{ miniCart, setMiniCart }}>
            {children}
        </MiniCartContext.Provider>
    )
}

export default MiniCartState