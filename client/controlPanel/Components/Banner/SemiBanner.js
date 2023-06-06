import { useContext, useEffect, useState } from "react";
import ImageUploader from "../Media/ImageUploaderNew";
import { toast } from "react-toastify";
import { deleteSemiBanner, getSemiBanner, semiBannerCreate, updateSemiBanner } from "../../libs/Apis";
import UserContext from "../../Context/Auth/UserContext";

const MainSlider = () => {
    const [semiBanner, setSemiBanner] = useState(null)
    const [update, setUpdate] = useState(false)
    const [id, setId] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    const apiHandler = async (auth) => {
        const res = await getSemiBanner(auth?.token)
        if (res && res?.status) {
            setSemiBanner(res?.response[0]?.semiBanner)
            setId(res?.response[0]?._id)
            setUpdate(true)
        } else {
            setSemiBanner(null)
        }
    }

    useEffect(() => {
        apiHandler(auth)
    }, [auth])

    // update banner
    const updateBanner = async () => {
        const ids = semiBanner?.map(i => i._id);
        let data = {
            semiBanner: ids
        }
        const res = await updateSemiBanner(id, data, auth?.token)
        if (res.status) {
            toast('Image successfully update.')
        } else {
            toast('Something wrong. Please try again')
        }
    }

    // delete banner 
    const deleteBanner = async () => {
        const res = await deleteSemiBanner(id, auth?.token)
        if (res.status) {
            toast('Image successfully Delete.')
            setSemiBanner(null)
            setId(null)
            setUpdate(false)
        } else {
            toast('Something wrong. Please try again')
        }
    }

    // banner upload
    const bannerSave = async () => {
        const ids = semiBanner?.map(i => i._id);
        let data = {
            semiBanner: ids
        }
        if (semiBanner?.length > 0) {
            const res = await semiBannerCreate(data, auth?.token)
            if (res.status) {
                toast('Main slider images successfully save.')
                apiHandler(auth)
            } else {
                toast('Something wrong. Please try again')
            }

        } else {
            toast('Add image first.')
        }
    }

    // Image Replace
    const imageReplaceHandler = () => {
        setSemiBanner(null)
        setId(null)
        setUpdate(false)
    }

    // Set Image
    const setImageHandler = (img) => {
        if (!semiBanner) {
            setSemiBanner([img]);
        } else {
            setSemiBanner([...semiBanner, img]);
        }
    }

    // image sort
    const setGallerySort = (img) => {
        setSemiBanner(img)
    }

    // delete image
    const deleteOneImage = (id) => {
        if (semiBanner?.length > 1){
            setSemiBanner(semiBanner?.filter(i => i._id !== id))
        } else {
            setSemiBanner(null)
            setId(null)
            setUpdate(false)
        }
    } 

    return(
        <div className="main-slider col-md-6">
            <h3 className="heading">
                Semi BAnner
            </h3>
            <hr />
            <ImageUploader
                imageReplaceHandler={imageReplaceHandler}
                image={semiBanner}
                setGallery={setImageHandler}
                setImage={setImageHandler}
                deleteOneImage={deleteOneImage}
                setGallerySort={setGallerySort}
            />
            {(!update && semiBanner) && <button className="btn btn-info w-100 mt-3" onClick={bannerSave}>Save</button>}
            <div className="row">
                <div className="col-6">
                    {(update && semiBanner) && <button className="btn btn-info w-100 mt-3" onClick={updateBanner}>Update</button>}
                </div>
                <div className="col-6">
                    {(update && semiBanner) && <button className="btn btn-danger w-100 mt-3" onClick={deleteBanner}>Delete</button>}
                </div>
            </div>
        </div>
    )
}

export default MainSlider