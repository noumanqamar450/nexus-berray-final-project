import { Link } from "react-router-dom"
import { getAllProduct, getOneProduct, productDelete, searchProduct, updateProduct } from "../../libs/Apis"
import { useContext, useEffect, useState } from "react";
import ProductList from "../../Components/Product/ProductList";
import Modals from "../../Components/Product/ProductModal";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoaderOnly } from '../../Components/Loader'
import UserContext from "../../Context/Auth/UserContext";

const Product = () => {
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [singleRecord, setSingleRecord] = useState(null);
    const [productQuery, setProductQuery] = useState({limit: 10, page: 1})
    const [searchText, setSearchText] = useState('')

    // auth cont0ext
    const { auth } = useContext(UserContext)

    // api handler function
    const handler = async (query, auth) => {
        setProduct(await getAllProduct(query, auth?.token))
    }

    useEffect(() => {
        handler(productQuery, auth)
        document.title = 'Product - LFC'
    }, [productQuery, auth])

    // modal close function
    const handleClose = () => {
        setShowModal(false);
        setSingleRecord(null)
    }

    const handleModalShow = async (id) => {
        const data = await getOneProduct(id, auth?.token)
        setSingleRecord(data)
        setShowModal(true);
    }

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
                await productDelete(id, auth?.token);
                handler(productQuery, auth)
            } else {
                Swal.fire('Not deleted!', '', 'error')
            }

        })
    } 

    // this function for product feature
    const updateFeatured = async (id, f, n) => {
        const fd = f ? 0 : 1;
        const data = { featured: fd };

        const dataUpdate = new Promise(async (resolve, reject) => {
            const send = await updateProduct(id, data, auth?.token);
            if (send) {
                resolve()
                if (searchText) {
                    search(searchText)
                } else {
                    handler(productQuery, auth);
                }
            } else {
                reject()
            }
        })

        toast.promise(dataUpdate, {
            pending: 'Loading...',
            success: fd ? `"${n}" Product has been featured.` : `"${n}" Product has not been featured.`,
            error: "500 Internal Server Error. Please check your connection.",
        }, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    // pagination
    const pagination = (page) => {
        setProductQuery({ ...productQuery, page: page })
    }

    //product search
    const search = async (text) => {
        if (text && searchText) {
            setProduct(await searchProduct(text));
        } else {
            handler(productQuery, auth)
        }
    }
    
    return (
        <div className="page">
            <h2 className="py-3">Product List - <Link to={'/product/add'} className="btn btn-primary">Add Product</Link></h2>
            <div className="list-search">
                <input type="search" className="form-control" placeholder="Search" value={searchText} onChange={(e) => {
                    setSearchText(e.target.value)
                    search(e.target.value)
                }
                }/>
            </div>
            <table className="table table-hover mt-5">
                {
                    product && <caption>List Found: {product?.data?.length}</caption>
                }
                <thead>
                    <tr>
                        <th scope="col">Featured</th>
                        <th scope="col">Images</th>
                        <th scope="col">Name</th>
                        <th scope="col">Create/Modify Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!product?.data?.length > 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                <LoaderOnly/>
                            </td>
                        </tr>
                    )}
                    {
                        product?.data?.map((p, i) => (
                            <ProductList 
                                key={i} 
                                list={p}
                                modalShow={handleModalShow}
                                deleteData={deleteData}
                                updateFeatured={updateFeatured}
                                />
                        ))
                    }
                </tbody>
            </table>
            {
                product?.data && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={product?.previous ? 'page-item' : 'page-item disabled'}>
                                <Link className="page-link" href="#" tabIndex="-1" onClick={()=>{
                                    pagination(product?.previous?.page)
                                    setProduct(null)
                                }}>Previous</Link>
                            </li>
                            <li className="page-item disabled" style={!product?.previous ? {display:'none'} : {}}><Link className="page-link" >{product?.previous?.page}</Link></li>
                            <li className="page-item disabled"><Link className="page-link">{productQuery.page}</Link></li>
                            <li className="page-item disabled" style={!product?.next ? {display:'none'} : {}}><Link className="page-link" >{product?.next?.page}</Link></li>
                            <li className={product?.next ? 'page-item' : 'page-item disabled'}>
                                <Link className="page-link" href="#" onClick={() => {
                                    pagination(product?.next?.page)
                                    setProduct(null)
                                }}>Next</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
            <Modals
                onClose={handleClose}
                show={showModal}
                data={singleRecord}
            />
        </div>
    )
}

export default Product