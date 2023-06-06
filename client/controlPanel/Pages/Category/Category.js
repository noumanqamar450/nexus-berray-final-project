import { useContext, useEffect, useState } from "react"
import { getCategoryAll, deleteCategory, putCategory, getCategoryOne } from "../../libs/Apis"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modals from "../../Components/Category/CategoryModal";
import CategoryList from "../../Components/Category/CateogryList";
import { LoaderOnly } from '../../Components/Loader'
import UserContext from '../../Context/Auth/UserContext'

const Category = () => {
    const [category, setCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [singleRecord, setSingleRecord] = useState(null);
    const [categoryQuery, setCategoryQuery] = useState({ limit: 10, page: 1 })

    // auth context
    const { auth } = useContext(UserContext)

    // api handler function
    const handler = async (query, auth) => {
        setCategory(await getCategoryAll(query, auth?.token))
    }

    useEffect(()=>{
        handler(categoryQuery, auth)
        document.title = 'Category - LFC'
    }, [categoryQuery, auth])

    // delete category function
    const deleteData = async (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async(result) => {

            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                await deleteCategory(id, auth?.token);
                handler(categoryQuery, auth)
            } else {
                Swal.fire('Not deleted!', '', 'error')
            }
            
        })
    } 
    
    // set category featured
    const updateFeatured = async (id, f, n) => {
        const fd = f ? 0 : 1;
        const data = {featured: fd};

        const dataUpdate = new Promise(async (resolve, reject) => {
            const send = await putCategory(id, data, auth?.token);
            if (send) {
                resolve()
                handler(categoryQuery, auth);
            } else {
                reject()
            }
        })

        toast.promise(dataUpdate, {
            pending: 'Loading...',
            success: fd ? `"${n}" category has been featured.` : `"${n}" category has not been featured.`,
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

    const handleClose = () => {
        setShowModal(false);
        setSingleRecord(null)
    }

    const handleModalShow = async (id) => {
        const data = await getCategoryOne(id, auth?.token)
        setSingleRecord(data)
        setShowModal(true);
    }

    // pagination
    const pagination = (page) => {
        setCategoryQuery({ ...categoryQuery, page: page })
    }
    
    return (
        <div className="page">
            <h2 className="py-3">Category List - <Link to={'/category/add'} className="btn btn-primary">Add Category</Link></h2>
            <table className="table table-hover mt-5">
                <caption>List Found: { category?.data?.length }</caption>
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
                {!category?.data?.length > 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-4">
                            <LoaderOnly/>
                        </td>
                    </tr>
                )}
                {
                    category?.data?.map((c,i) => (
                        <CategoryList 
                            key={i} 
                            list={c}
                            modalShow={handleModalShow}
                            updateFeatured={updateFeatured}
                            deleteData={deleteData}
                        />
                    ))
                }
                </tbody>
            </table>
            {
                category?.data && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={category?.previous ? 'page-item' : 'page-item disabled'}>
                                <Link className="page-link" href="#" tabIndex="-1" onClick={() => {
                                    pagination(category?.previous?.page)
                                    setCategory(null)
                                }}>Previous</Link>
                            </li>
                            <li className="page-item disabled" style={!category?.previous ? { display: 'none' } : {}}><Link className="page-link" >{category?.previous?.page}</Link></li>
                            <li className="page-item disabled"><Link className="page-link">{categoryQuery.page}</Link></li>
                            <li className="page-item disabled" style={!category?.next ? { display: 'none' } : {}}><Link className="page-link" >{category?.next?.page}</Link></li>
                            <li className={categoryQuery?.next ? 'page-item' : 'page-item disabled'}>
                                <Link className="page-link" href="#" onClick={() => {
                                    pagination(category?.next?.page)
                                    setCategory(null)
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

export default Category