import { useContext, useEffect, useState } from "react"
import { getStatusOrder } from '../../libs/Apis'
import UserContext from '../../Context/Auth/UserContext'
import { Hourglass } from "react-bootstrap-icons"

const PendingOrder = () => {
    const [count, setCount] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    const handler = async(auth) => {
        const res = await getStatusOrder('pending', auth?.token)
        setCount(res)
    }

    useEffect(()=>{
        handler(auth)
    },[auth])

    return (
        <div className="widget">
            <span>Pending</span>
            <Hourglass/>
            <h1>{count?.length ?? 0}</h1>
        </div>
    )
}

export default PendingOrder