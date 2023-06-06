import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from "react-toastify";
import OrderModal from "./OrderModal";
import OrderStatusUpdate from "./OrderStatusUpdate";
import { getOneOrder } from "../../libs/Apis"
import { useEffect, useState } from 'react';
import UserContext from '../../Context/Auth/UserContext'
import { useContext } from 'react';
import { Printer, Trash3 } from 'react-bootstrap-icons';

const OrderList = (props) => {
    const { deleteData, refreshApi  } = props
    const { _id, orderId,name, items, status, createdAt, updatedAt } = props?.list

    // states
    const [isLoad, setIsLoad] = useState(false)
    const [show, setShow] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const [singleOrder, setSingleOrder] = useState(null);
    const [statusClass, setStatusClass] = useState('');

    // auth context
    const { auth } = useContext(UserContext)

    //order update

    const orderPrint = async (id) => {
        setIsLoad(true)
        setSingleOrder(null)
        const res = await getOneOrder(id, auth?.token)

        if (res.message) {
            toast(res.message)
            setIsLoad(false)
        } else {
            setShow(true)
            setSingleOrder(res)
            setIsLoad(false)
        }
    }

    // receipt modal handler
    const onClose = () => {
        setShow(false)
    }

    // order updater handler
    const onCloseOrder = () => {
        setShowOrder(false)
    }

    // update data
    const updateData = async (id) => {
        setIsLoad(true)
        setSingleOrder(null)
        const res = await getOneOrder(id, auth?.token)

        if (res.message) {
            toast(res.message)
            setIsLoad(false)
        } else {
            setIsLoad(false)
            setShowOrder(true)
            setSingleOrder(res)
        }
    }

    // status badge class
    useEffect(() => {
        if (status === 'making'){
            setStatusClass("badge bg-warning text-capitalize")
        } else if (status === 'shipped') {
            setStatusClass("badge bg-danger text-capitalize")
        } else if (status === 'complete') {
            setStatusClass("badge bg-primary text-capitalize")
        } else {
            setStatusClass("badge bg-info text-capitalize")
        }
    }, [status])


    return(
        <>
            <tr>
                <td>{orderId}</td>
                <td>
                    {items && <LazyLoadImage key={items[0].name} affect="blur" src={items[0].image} alt={items[0].name} className="images product-images" /> }
                    {items.length > 1 && <div className="images product-images count"> +{items.length - 1}</div>}
                </td>
                <td>{name}</td>
                <td>{createdAt?.slice(0, 10)} - {createdAt?.slice(11, 19)}</td>
                <td>{updatedAt?.slice(0, 10)} - {updatedAt?.slice(11, 19)}</td>
                <td>
                    <span 
                        style={{cursor: 'pointer'}}
                        className={statusClass}
                        onClick={() => updateData(_id)}
                        >
                        {isLoad ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : status}
                    </span>
                </td>
                <td>
                    <div className="btn-group dropstart">
                        {
                            isLoad ? (
                                <div className="spinner-border spinner-border-sm text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <button 
                                        type="button" 
                                        className="btn"
                                        onClick={() => orderPrint(_id)}
                                        >
                                        <Printer/>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn"
                                        onClick={() => deleteData(_id)}
                                        >
                                        <Trash3/>
                                    </button>
                                </>
                            )
                        }
                    </div>
                </td>
            </tr>
            <OrderStatusUpdate active={showOrder} order={singleOrder} refreshApi={refreshApi} onClose={onCloseOrder}/>
            <OrderModal load={isLoad} active={show} order={singleOrder} onClose={onClose}/>
        </>
    )
}

export default OrderList;