import { Link } from "react-router-dom"
import { deleteOrder, getOrder, searchOrder } from "../libs/Apis"
import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
import { LoaderOnly } from '../Components/Loader'
import UserContext from '../Context/Auth/UserContext'
import OrderList from "../Components/Order/OrderList";


const Orders = () => {
    const [order, setOrder] = useState(null);
    const [query, setQuery] = useState({limit: 10, page: 1})
    const [searchText, setSearchText] = useState('')

    // auth context
    const { auth } = useContext(UserContext)

    // api handler function
    const handler = async (query, auth) => {
        setOrder(await getOrder(query, auth?.token))
    }

    useEffect(() => {
        handler(query, auth)
        document.title = 'Orders - LFC'
    }, [query, auth])


    // delete product
    const deleteData = async (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (result) => {
            
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                await deleteOrder(id, auth?.token);
                handler(query, auth)
            } else {
                Swal.fire('Not deleted!', '', 'error')
            }

        })
    } 


    // pagination
    const pagination = (page) => {
        setQuery({ ...query, page: page })
    }

    //product search
    const search = async (text) => {
        if (text && searchText) {
            setOrder(await searchOrder(text));
        } else {
            handler(query, auth)
        }
    }

    // when data update
    const refreshApi = () => {
        handler(query, auth)
    }

    
    return (
        <div className="page">
            <h2 className="py-3">Orders</h2>
            <div className="list-search">
                <input type="search" 
                    className="form-control" 
                    placeholder="Search" 
                    value={searchText} 
                    onChange={(e) => {
                        setSearchText(e.target.value)
                        search(e.target.value)
                    }
                }/>
            </div>
            <table className="table table-hover mt-5">
                {
                    order && <caption>List Found: {order?.data?.length}</caption>
                }
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Items</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Modify Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!order?.data?.length > 0 && (
                        <tr>
                            <td colSpan="7" className="text-center py-4">
                                <LoaderOnly/>
                            </td>
                        </tr>
                    )}
                    {
                        order?.data?.map((p, i) => (
                            <OrderList 
                                key={i} 
                                list={p}
                                deleteData={deleteData}
                                refreshApi={refreshApi}
                                />
                        ))
                    }
                </tbody>
            </table>
            {
                order?.data && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={order?.previous ? 'page-item' : 'page-item disabled'}>
                                <Link className="page-link" href="#" tabIndex="-1" onClick={()=>{
                                    pagination(order?.previous?.page)
                                    setOrder(null)
                                }}>Previous</Link>
                            </li>
                            <li className="page-item disabled" style={!order?.previous ? { display: 'none' } : {}}><Link className="page-link" >{order?.previous?.page}</Link></li>
                            <li className="page-item disabled"><Link className="page-link">{query.page}</Link></li>
                            <li className="page-item disabled" style={!order?.next ? { display: 'none' } : {}}><Link className="page-link" >{order?.next?.page}</Link></li>
                            <li className={order?.next ? 'page-item' : 'page-item disabled'}>
                                <Link className="page-link" href="#" onClick={() => {
                                    pagination(order?.next?.page)
                                    setOrder(null)
                                }}>Next</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </div>
    )
}

export default Orders