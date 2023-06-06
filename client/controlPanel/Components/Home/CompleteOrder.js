import { useContext, useEffect, useState } from "react"
import { getStatusOrder } from '../../libs/Apis'
import UserContext from '../../Context/Auth/UserContext'
import { Check2Circle } from "react-bootstrap-icons"

const CompleteOrder = () => {
    const [count, setCount] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    const handler = async(auth) => {
        const res = await getStatusOrder('complete', auth?.token)
        setCount(res)
    }

    useEffect(()=>{
        handler(auth)
    },[auth])

    return (
        <div className="widget">
            <span>Complete</span>
            <Check2Circle/>
            <h1>{count?.length ?? 0}</h1>
        </div>
    )
}

export default CompleteOrder