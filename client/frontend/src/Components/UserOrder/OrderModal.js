import { Button, Modal, Table } from "react-bootstrap"
import { Envelope, Geo, Person, Phone } from "react-bootstrap-icons"

const OrderModal = ({ items, totalPrice, note, name, email, mobile, address, orderId, status, method, payment, active, hideMe }) => {

    return (
        <Modal show={active} onHide={hideMe}>
            <Modal.Header closeButton>
                <Modal.Title>Order Invoice</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-white">
                <div className="my-3 float-end text-end">
                    <strong>Order Information:</strong>
                    <div>Order ID: {orderId}</div>
                    <div className="text-capitalize">Payment Method: {method}</div>
                    <div className="text-capitalize">Online Payment: {payment ? 'yes' : 'no'}</div>
                    <div className="text-capitalize">Status: {status}</div>
                </div>
                <div className="my-3">
                    <strong>Your Information:</strong>
                    <div><Person/> {name}</div>
                    <div><Envelope/> {email}</div>
                    <div><Phone/> {mobile}</div>
                    <div><Geo/> {address}</div>
                </div>
                <Table size="sm" className="text-white" style={{ borderColor:'rgb(124, 108, 162)'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td className="text-center">Rs. {item.price}</td>
                                    <td className="text-center">{item.qty}</td>
                                    <td className="text-center">Rs. {item.totalPrice}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <div className="float-end"><strong>Grand Total</strong> Rs. {totalPrice}</div>
                <div className="mt-5">
                    {note ?? null}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={hideMe} >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderModal