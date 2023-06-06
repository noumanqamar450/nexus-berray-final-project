import { useContext, useState } from "react";
import { imageOneUpdate, imageStore } from "../../libs/Apis";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UserContext from "../../Context/Auth/UserContext";

const MediaUploader = () => {
    const [image, setImage] = useState(null)
    const [alt, setAlt] = useState('')

    // auth context
    const { auth } = useContext(UserContext)

    // image uploader
    const imageSave = async(e) => {
        const files = e.target.files
        const form = new FormData();
        for (let file of files) {
            form.append('image', file);
        };
        const send = await imageStore(form, auth?.token);
        if (send.fileUrl) {
            setImage(send)
            setAlt(send?.altText)
            toast('Image Successfully uploaded.')
        } else {
            toast('Something wrong. Please try again')
        }
    }

    // image update
    const updateImage = async () => {
        if (image?._id) {
            const data = { altText: alt }
            const res = await imageOneUpdate(image?._id, data, auth?.token)
            if (res?.status) {
                toast('Image successfully save.')
                setTimeout(()=>{
                    setImage(null)
                    setAlt('')
                }, 2000)
            } else {
                toast('Something wrong. Please try again.')
            }
        } else {
            toast('Add image first.')
        }
    }
    return(
        <div className="row">
            <div className="col-md-6 mb-4">
                {
                    image && (
                        <div className="media-uploader-image">
                           <LazyLoadImage src={image?.fileUrl} alt={image?.altText} affect="blur"/>
                        </div>
                    )
                }
                {
                    !image && (
                        <div className="media-uploader">
                            <label className="form-label" htmlFor="imageUpload"><i className="bi bi-cloud-arrow-up"></i></label>
                            <input type="file" name="image" id="imageUpload" className="form-control" onChange={imageSave}/>
                        </div>
                    )
                }
            </div>
            <div className="col-md-6">
            {
                image && (
                    <>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="imageAlt">Alternative Text</label>
                            <input type="text" id="imageAlt" value={alt} className="form-control" onChange={(e) => setAlt(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="imageUrl">Image Url</label>
                            <input type="text" id="imageUrl" value={image?.fileUrl} className="form-control" readOnly/>
                        </div>
                        <div className="mb-3">
                            Size: ({Math.round(image?.size / 1024)} KB)
                        </div>
                        <div className="mb-3">
                            Date: ({image?.updatedAt?.slice(0, 10)}  - {image?.updatedAt?.slice(11, 19)})
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={updateImage}>Save</button>
                        </div>
                    </>
                )
            }
            </div>
        </div>
    )
}

export default MediaUploader