import { useContext, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { Save2 } from "react-bootstrap-icons"
import UserContext from "../../Context/Auth/UserContext"
import { updateOrder } from "../../libs/Apis"
import { toast } from "react-toastify"

const OrderStatusUpdate = ({ active, order, onClose, refreshApi }) => {
    const [status, setStatus] = useState({ status: order?.status })

    // auth context
    const { auth } = useContext(UserContext)

    // update order status
    const updateStatus = async () => {
        const res = await updateOrder(order?._id, status, auth?.token )

        if (res.status) {
            toast(res.message)
            refreshApi()
        } else {
            toast(res.message)
        }
        console.log(res);
    }

    return (
        <Modal
            show={active}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Status Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select className="form-select mb-3" value={status?.status} onChange={(e) => setStatus({ status: e.target.value }) }>
                    <option value="pending">Pending</option>
                    <option value="making">Making</option>
                    <option value="shipped">Shipped</option>
                    <option value="complete">Complete</option>
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={updateStatus}><Save2/> Update</Button>
                <Button variant="primary" onClick={onClose}>Back</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderStatusUpdate