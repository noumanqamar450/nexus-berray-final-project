import { useState } from "react";
import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { Envelope, GeoAlt, Person, Phone, Printer } from "react-bootstrap-icons";
import ReactToPrint from 'react-to-print';

const OrderModal = (props) => {
    const { onClose, active, load } = props
    const { orderId, userId, mobile, items, totalPrice, deliveryAddress, paymentMethod, payment, note } = props?.order || {}
    
    // States
    const [isLoad, setIsLoad] = useState(false)

    const handleIsLoad = () => {
        setIsLoad(true)
    }
    const handleNotLoad = () => {
        setIsLoad(false)
    }

    // ref hook
    const receiptRef = useRef();

    return(
        <Modal
            show={active}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body ref={receiptRef}>
                {
                    load ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="py-3">  
                            <h4 className="text-center">Love Food Court</h4>
                            <div className="float-start my-3">
                                <strong>Client Information</strong>
                                <div><Person/> {userId?.fullName}</div>
                                <div><Envelope/> {userId?.email}</div>
                                <div><Phone/> {mobile}</div>
                                <div><GeoAlt/> {deliveryAddress}</div>
                            </div>
                            <div className="float-end text-end my-3">
                                <strong>Order Information</strong>
                                <div>Order ID: {orderId}</div>
                                <div>Payment Method: <span className="text-uppercase">{paymentMethod}</span></div>
                                <div>{payment ? (<div className="badge bg-secondary">Paid</div>) : (<div className="badge bg-secondary">Unpaid</div>) }</div>
                            </div>
                            <table className="table table-responsive table-sm mt-3">
                                <caption>items: {items?.reduce((sum, item)=> sum + item.qty, 0)}</caption>
                                <thead>
                                    <tr>
                                        <th scope="row">Items</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items?.map(item => (
                                            <tr key={item.productId}>
                                                <td>{item.name}</td>
                                                <td className="text-center">Rs. {item.price}</td>
                                                <td className="text-center">{item.qty}</td>
                                                <td className="text-end">Rs. {item.totalPrice}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="float-end">
                                <strong>Grand Total: </strong>
                                <span>Rs. {totalPrice}</span>
                            </div>
                            <div className="mt-2">
                                {note ?  `Note: ${note}` : null}
                            </div>
                        </div>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    isLoad && (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )
                }
                <ReactToPrint
                    trigger={() => <Button variant="info" disabled={isLoad}><Printer/> Print</Button>}
                    content={() => receiptRef.current}
                    onBeforeGetContent={handleIsLoad}
                    onAfterPrint={handleNotLoad}
                />
                <Button variant="primary" onClick={onClose}>Back</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default OrderModal