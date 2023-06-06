import { useContext, useEffect, useState } from "react"
import { getCategoryOne, saveCategory, putCategory } from "../../libs/Apis"
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from "../../Components/Media/ImageUploaderNew";
import Editor from 'react-simple-wysiwyg';
import UserContext from '../../Context/Auth/UserContext'

const AddCategory = () => {
    const [cateName, setCateName] = useState('')
    const [cateSlug, setCateSlug] = useState('')
    const [cateDesc, setCateDesc] = useState('')
    const [cateStatus, setCateStatus] = useState('')
    const [cateFeatured, setCateFeatured] = useState(0)
    const [image, setImage] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    // Get Parameter
    const { cid } = useParams()
    
    // Single Data Fetch
    const handle = async (cid, auth) => {
        if (cid) {
            const data = await getCategoryOne(cid, auth?.token);
            setCateName(data.name ? data.name : '');
            setCateSlug(data.slug ? data.slug : '');
            setCateDesc(data.desc ? data.desc : '');
            setImage(data.imageUrl ? data.imageUrl : null);
            setCateFeatured(data.featured ? data.featured : 0)
            setCateStatus(data.status ? data.status : '')
        }
    }

    useEffect(()=>{
        handle(cid, auth)
        if(!cid) {
            cancelHandler()
        }
        cid ? document.title = 'Edit Category - LFC' : document.title = 'Add New Category - LFC';
    }, [cid, auth])
    
    
    // data submit
    const submitHandle = async (e) => {
        e.preventDefault()
        if (image) {
            if (cid) {

                // Update
                const id = image._id;

                const data = {
                    name: cateName,
                    slug: cateSlug,
                    desc: cateDesc,
                    status: cateStatus,
                    featured: cateFeatured,
                    imageUrl: id,
                }

                const dataUpdate = new Promise(async(resolve,reject)=>{
                    const send = await putCategory(cid, data, auth?.token)
                    if (send) {
                        resolve()
                    } else {
                        reject()
                    }
                }) 

                toast.promise(dataUpdate, {
                    pending: 'Loading...',
                    success: 'Data successfully saved!',
                    error: '500 Internal Server Error. Please check your connection.',
                }, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } else {

                // Save
                const id = image._id;

                const data = {
                    name: cateName,
                    slug: cateSlug,
                    desc: cateDesc,
                    status: cateStatus,
                    featured: cateFeatured,
                    imageUrl: id, 
                }
                
                const dataUpload = new Promise(async (resolve, reject) => {
                    const send = await saveCategory(data, auth?.token);
                    if (send) {
                        resolve()
                    } else {
                        reject()
                    }
                })

                toast.promise(dataUpload, {
                    pending: 'Loading...',
                    success: 'Data successfully saved!',
                    error: 'Data not save. Please check your connection.',
                }, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                cancelHandler()
            }

        } else {
            alert('Add Image')
        }
    }

    const cancelHandler = () => {
        setCateName('');
        setCateSlug('');
        setCateDesc('');
        setImage(null);
        setCateFeatured(0);
        setCateStatus('');
    }

    // Image Replace
    const imageReplaceHandler = () => {
        setImage(null)
    }

    // Set Image
    const setImageHandler = (img) => {
        setImage(img);
    }

    return (
        <div className="page">
            <h2 className="py-3">Add Category</h2>
            <form onSubmit={submitHandle}>
            <div className="row">
                <div className="col-md-8 mb-4">
                    <div className="mb-3">
                        <label htmlFor="cateName" className="form-label">Category Name</label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="cateName" 
                            name="name"
                            placeholder="Enter your category name"
                            value={cateName}
                            onChange={(e)=>{
                                setCateName(e.target.value)
                            }}
                            required
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cateSlug" className="form-label">Category Slug</label>
                        <input 
                            type="text" 
                            name="slug" 
                            id="cateSlug"
                            placeholder="" 
                            className="form-control" 
                            value={cateSlug.toLowerCase().replace(/\s+/g, '-')}
                            onChange={(e)=>{
                                setCateSlug(e.target.value)
                            }}
                            required
                            />
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label">Category Description</label>
                        <Editor value={cateDesc} onChange={(e) => {
                            setCateDesc(e.target.value)
                            console.log(e.target.value)
                        }} />
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <div className="form-check form-switch">
                                <input 
                                className="form-check-input" 
                                type="checkbox" 
                                onChange={(e)=>{
                                    setCateFeatured(e.target.checked ? 1 : 0);
                                }} 
                                role="switch" 
                                id="featured"
                                checked={cateFeatured ? true : false}
                                />
                                <label className="form-check-label" htmlFor="featured">Set Featured Category</label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label"> Set Category Status</label>
                                <select className="form-select" value={cateStatus} onChange={(e)=>{
                                    setCateStatus(e.target.value)
                                }}
                                required
                                >
                                    <option></option>
                                    <option value="publish">Publish</option>
                                    <option value="draft">Draft</option>
                                </select>      
                            </div>
                        </div>
                    </div>
                    <button type="reset" onClick={cancelHandler} className={cid ? 'd-none' : "btn btn-danger me-3"}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
                <div className="col-md-4">
                    <ImageUploader 
                        imageReplaceHandler={imageReplaceHandler}
                        image={image}
                        setGallery={setImageHandler}
                        setImage={setImageHandler}
                        />
                </div>
            </div>
            </form>
        </div>
    )
}
export default AddCategory