import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOneProduct, saveProduct, updateProduct, getCategoryAll } from "../../libs/Apis"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from "../../Components/Media/ImageUploaderNew";
import Editor from 'react-simple-wysiwyg';
import UserContext from '../../Context/Auth/UserContext'

const AddProduct = () => {
    const [proName, setProName] = useState('')
    const [proSlug, setProSlug] = useState('')
    const [proStatus, setProStatus] = useState('')
    const [proDesc, setProDesc] = useState('')
    const [proCate, setProCate] = useState('')
    const [proPrice, setProPrice] = useState(0)
    const [proSalePrice, setProSalePrice] = useState(0)
    const [proFeatured, setProFeatured] = useState(0)
    const [galleryImages, setGalleryImages] = useState(null)
    const [category, setCategory] = useState(null)

    //auth context
    const { auth } = useContext(UserContext)

    const deleteOneImage = (id) => {
        setGalleryImages(galleryImages?.filter(i => i._id !== id))
    } 

    // Get Parameter
    const { pid } = useParams()

    // Single Data Fetch
    const handle = async (pid, auth) => {
        if (pid) {
            const data = await getOneProduct(pid, auth?.token);
            setProName(data.name ? data.name : '');
            setProSlug(data.slug ? data.slug : '');
            setProDesc(data.desc ? data.desc : '');
            setProCate(data.category ? data.category._id : '');
            setProPrice(data.price ? data.price : 0);
            setProSalePrice(data.salePrice ? data.salePrice : 0);
            setGalleryImages(data.imageUrl ? data.imageUrl : null);
            setProFeatured(data.featured ? data.featured : 0)
            setProStatus(data.status ? data.status : '')
        }
    }

    const getCategory = async (auth) => {
        setCategory(await getCategoryAll({ limit: '' }, auth?.token))
    }

    useEffect(() => {
        handle(pid, auth)
        if (!pid) {
            cancelHandler()
        }
        getCategory(auth)
        pid ? document.title = 'Edit Product - LFC' : document.title = 'Add New Product - LFC';
    }, [pid, auth])

    // data submit
    const submitHandle = async (e) => {
        e.preventDefault()

        if (galleryImages) {
            const ids = galleryImages?.map(i => i._id);
            const data = {
                name: proName,
                slug: proSlug,
                desc: proDesc,
                category: proCate,
                price: proPrice,
                salePrice: proSalePrice,
                status: proStatus,
                featured: proFeatured,
                imageUrl: ids,
            }

            if (pid) {
                // Update
                const dataUpdate = new Promise(async (resolve, reject) => {
                    const send = await updateProduct(pid, data, auth?.token)
                    if (send) {
                        resolve()
                    } else {
                        reject()
                    }
                })

                toast.promise(dataUpdate, {
                    pending: 'Loading...',
                    success: 'Product successfully update!',
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

                // Create Product
                const dataUpload = new Promise(async (resolve, reject) => {
                    const send = await saveProduct(data, auth?.token);
                    if (send) {
                        resolve()
                    } else {
                        reject()
                    }
                })

                toast.promise(dataUpload, {
                    pending: 'Loading...',
                    success: 'Product successfully saved!',
                    error: 'Product not save. Please check your connection.',
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

    // clear the fields
    const cancelHandler = () => {
        setProName('');
        setProSlug('');
        setProDesc('');
        setProPrice('');
        setProCate('');
        setProSalePrice('');
        setGalleryImages(null);
        setProFeatured(0);
        setProStatus('');
    }

    // Image Replace
    const imageReplaceHandler = () => {
        setGalleryImages(null)
    }

    // Set Image
    const setImageHandler = (img) => {
        if(!galleryImages){
            setGalleryImages([img]);
        } else {
            setGalleryImages([...galleryImages, img]);
        }
    }

    const setGallerySort = (img) => {
        setGalleryImages(img)
    }
    
    return (
        <div className="page">
            <h2 className="py-3">Add Product</h2>
            <form onSubmit={submitHandle}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="proName" className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="proName"
                                name="name"
                                value={proName}
                                onChange={(e) => {
                                    setProName(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="proSlug" className="form-label">Product Slug</label>
                            <input
                                type="text"
                                name="slug"
                                id="proSlug"
                                placeholder=""
                                className="form-control"
                                value={proSlug}
                                onChange={(e) => {
                                    setProSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                                }}
                                required
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-6 mb-3">
                                <label htmlFor="proPrice" className="form-label">Product Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="proPrice"
                                    placeholder=""
                                    className="form-control"
                                    value={proPrice}
                                    onChange={(e) => {
                                        setProPrice(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="proSalePrice" className="form-label">Product Sale Price</label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    id="proSalePrice"
                                    placeholder=""
                                    className="form-control"
                                    value={proSalePrice}
                                    onChange={(e) => {
                                        setProSalePrice(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label"> Select Product Category</label>
                                    <select className="form-select" value={proCate} onChange={(e) => {
                                        setProCate(e.target.value)
                                    }}
                                        required
                                    >
                                        <option></option>
                                        {
                                            category?.data?.map((c,i)=>(
                                                <option key={i} value={c._id}>{c.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Product Description</label>
                                <Editor value={proDesc} onChange={(e)=>{
                                    setProDesc(e.target.value)
                                }} />
                            </div>
                            <div className="col-6">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(e) => {
                                            setProFeatured(e.target.checked ? 1 : 0);
                                        }}
                                        role="switch"
                                        id="featured"
                                        checked={proFeatured ? true : false}
                                    />
                                    <label className="form-check-label" htmlFor="featured">Set Featured Product</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-label"> Set Product Status</label>
                                    <select className="form-select" value={proStatus} onChange={(e) => {
                                        setProStatus(e.target.value)
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
                    </div>
                    <div className="col-md-4">
                        <ImageUploader
                            imageReplaceHandler={imageReplaceHandler}
                            image={galleryImages}
                            setGallery={setImageHandler}
                            setImage={setImageHandler}
                            deleteOneImage={deleteOneImage}
                            setGallerySort={setGallerySort}
                        />
                    </div>
                </div>
                <div className="">
                    <button type="reset" onClick={cancelHandler} className={pid ? 'd-none' : "btn btn-danger me-3"}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct