import { useContext } from "react"
import { Form } from "react-bootstrap"
import OrderContext from '../../Context/Order/OrderContext'

const Payment = () => {

    // order useContext
    const { order, setOrder } = useContext(OrderContext)

    // set payment Method
    const paymentMethod = (params) => {
        if (params === 'bank') {
            setOrder({ ...order, paymentMethod: params, payment: true })
        } else {
            setOrder({ ...order, paymentMethod : params, payment: false})
        }
    }

    return (
        <div className="payment">
            <Form>
                <Form.Check
                    label="Bank Transfer"
                    name="paymentMethod"
                    type="radio"
                    onChange={() => paymentMethod('bank')}
                    checked={order.paymentMethod === 'bank' ? true : false}
                />
                <div className="divider"></div>
                <Form.Check
                    label="Cash On Delivery"
                    name="paymentMethod"
                    type="radio"
                    onChange={() => paymentMethod('cod')}
                    checked={order.paymentMethod === 'cod' ? true : false}
                />
            </Form>
        </div>
    )
}

export default Payment