import { useState } from 'react'
import ConfirmOrderContext from './ConfirmOrderContext'

const ConfirmOrderState = ({ children }) => {
    const [orderId, setOrderId] = useState('')

    return (
        <ConfirmOrderContext.Provider value={{ orderId, setOrderId }}>
            {children}
        </ConfirmOrderContext.Provider>
    )
}

export default ConfirmOrderState