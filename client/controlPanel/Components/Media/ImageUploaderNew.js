import { useContext, useState } from 'react'
import ImageMediaGallery from './ImageMediaGallery'
import { imageStore } from "../../libs/Apis"
import FormData from 'form-data'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSortable } from "react-sortablejs";
import UserContext from "../../Context/Auth/UserContext";

const ImageUploader = (props) => {
    const [showMediaGallery, setShowMediaGallery] = useState(false)
    const { imageReplaceHandler, image, setGallery, setImage, deleteOneImage, setGallerySort } = props

    // auth context 
    const { auth } = useContext(UserContext)
    
    const selectMedia = () => {
        if(showMediaGallery){
            setShowMediaGallery(false)
        } else {
            setShowMediaGallery(true)
        }
    }
    const galleryHandler = (g) => {
        setGallery(g)
    }

    // image uploader
    const imageSave = async (e) => {
        const files = e.target.files
        const form = new FormData();
        for (let file of files) {
            form.append('image', file);
        };
        ;
        const dataUpdate = new Promise(async (resolve, reject) => {
            const send = await imageStore(form, auth?.token);
            if (send) {
                setImage(send)
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

    return (
        <>
            <button className="btn btn-info w-100 mb-3" onClick={selectMedia} type="button">Image from Media</button>
            {
                (!image && !image?.length > 0) && (
                    <div className="mb-3 file-uploader">
                        <p>Add Image</p>
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
                )
            }
            {
                (image && !image?.length > 0) && (
                    <>
                        <div className="mb-3 uploaded-image">
                            <LazyLoadImage effect='blur' src={image?.fileUrl} alt={image?.altText} className="w-10 round-5" />
                        </div>
                        <button className="btn btn-primary w-100" type="button" onClick={imageReplaceHandler}>Replace</button>
                    </>
                )
            }
            <ReactSortable
                animation={200}
                delayOnTouchStart={true}
                delay={1}
                list={image ? image : ''} 
                setList={setGallerySort ? setGallerySort : setImage}
                className='row'
            >
            {
                (image && image?.length > 0) && image.map((g,i)=>(
                    <div key={i} className='col-6 mb-3 '>
                        <div className="uploaded-image product">
                            <i className="bi bi-trash3" onClick={() => deleteOneImage(g?._id)} ></i>
                            <LazyLoadImage 
                                effect='blur' 
                                src={g?.fileUrl} 
                                alt={g?.altText} 
                                
                                className="w-10 round-5" 
                                />
                        </div>
                    </div>
                ))
            }
            </ReactSortable>

            {(image && image?.length > 0) && (
                <button className="btn btn-primary w-100" type="button" onClick={imageReplaceHandler}>All Remove</button>
            )}

            <ImageMediaGallery
                show={showMediaGallery}
                hide={selectMedia}
                selectImage={galleryHandler}
            />
            
        </>
    )
}

export default ImageUploader;