import { Modal } from "react-bootstrap";
import { imageAllView } from '../../libs/Apis'
import { useContext, useEffect, useState } from "react";
import { imageStore, imageOneDelete } from "../../libs/Apis"
import FormData from 'form-data'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
import { LoaderOnly } from '../Loader'
import UserContext from "../../Context/Auth/UserContext";

const ImageMediaGallery = (props) => {
    const {show, hide, selectImage} = props
    const [galley, setGallery] = useState(null)
    const [query, setQuery] = useState({ limit: 17, page: 1 })

    // auth context
    const { auth } = useContext(UserContext)

    const galleryHandle = async (query, auth) => {   
        const data = await imageAllView(query, auth?.token)
        setGallery(data)
        console.log('Image Load');
    }

    useEffect(()=>{
        if (show){
            galleryHandle(query, auth)
        } else {
            setGallery(null)
        }
    }, [show, setGallery, query, auth])

    useEffect(()=>{
        if (show)
           setQuery({ limit: 17, page: 1 })
    }, [show])

    // image uploader
    const imageSave = async (e) => {
        const files = e.target.files
        const form = new FormData();
        for (let file of files) {
            form.append('image', file);
        };
    
        const dataUpdate = new Promise(async (resolve, reject) => {
            const send = await imageStore(form, auth?.token);
            if (send) {
                galleryHandle(query, auth)
                resolve()
            } else {
                reject()
            }
        })
        
        toast.promise(dataUpdate, {
            pending: 'Loading...',
            success: 'Image successfully Added!',
            error: 'Image not save. Please check your connection.',
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

    // delete image
    const deleteImage = async (id) => {
        const dataUpdate = new Promise(async (resolve, reject) => {
            const send = await imageOneDelete(id, auth?.token);
            if (send) {
                galleryHandle(query, auth)
                resolve()
            } else {
                reject()
            }
        })
        toast.promise(dataUpdate, {
            pending: 'Loading...',
            success: 'Image successfully deleted!',
            error: 'Image not save. Please check your connection.',
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
        setQuery({ ...query, page: page })
    }

    if (!galley)
        return (
            <Modal
                show={show}
                onHide={hide}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    <LoaderOnly />
                </Modal.Body>
            </Modal>
        )

    return(
        <>
            <Modal
                size="lg"
                show={show}
                onHide={hide}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Media Gallery</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row g-4 setGallery">
                        {
                            galley && (

                                <div className="col-lg-2 col-4 ">
                                    <div className="mb-3 file-uploader gallery">
                                        <label htmlFor="Image" className="form-label">
                                            <span><i className="bi bi-cloud-arrow-up"></i> Upload</span>
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="Image"
                                            className="form-control hide"
                                            onChange={(e) => {
                                                imageSave(e)
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        }
                        {
                            galley.data.map((g,i)=>(
                                <div key={i} className="col-lg-2 col-4 images">
                                    <i className="bi bi-trash3" onClick={()=>deleteImage(g._id)}></i>
                                    <LazyLoadImage
                                        effect="blur" 
                                        src={g.fileUrl} 
                                        alt={g.altText} 
                                        className="w-100" 
                                        style={{cursor:'pointer'}}
                                        onClick={()=>{
                                            selectImage(g)
                                        }}
                                        />
                                </div>
                            ))
                        }
                        {
                            galley.data && (
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end">
                                        <li className={galley?.previous ? 'page-item' : 'page-item disabled'}>
                                        <Link className="page-link" href="#" tabIndex="-1" onClick={() => {
                                            pagination(galley?.previous?.page)
                                            setGallery(null)
                                        }}>Previous</Link>
                                    </li>
                                    <li className={galley?.next ? 'page-item' : 'page-item disabled'}>
                                        <Link className="page-link" href="#" onClick={() => {
                                            pagination(galley?.next?.page)
                                            setGallery(null)
                                        }}>Next</Link>
                                    </li>
                                </ul>
                            </nav>
                        )
                    }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ImageMediaGallery