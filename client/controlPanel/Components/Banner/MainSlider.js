import { useContext, useEffect, useState } from "react";
import ImageUploader from "../Media/ImageUploaderNew";
import { deleteMainBanner, getMainBanner, mainBannerCreate, updateMainBanner } from "../../libs/Apis";
import { toast } from "react-toastify";
import UserContext from "../../Context/Auth/UserContext";

const MainSlider = () => {
    const [mainSlider, setMainSlider] = useState(null)
    const [update, setUpdate] = useState(false)
    const [id, setId] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    const apiHandler = async (auth) => {
        const res = await getMainBanner(auth?.token)
        if (res && res?.status) {
            setMainSlider(res?.response[0]?.mainBanner)
            setId(res?.response[0]?._id)
            setUpdate(true)
        } else {
            setMainSlider(null)
            setUpdate(false)
            setId(null)
        }
    }

    useEffect(()=>{
        apiHandler(auth)
    }, [auth])
    
    // update banner
    const updateBanner = async () => {
        const ids = mainSlider?.map(i => i._id);
        let data = {
            mainBanner: ids
        }
        const res = await updateMainBanner(id, data, auth?.token)
        if (res.status) {
            toast('Image successfully update.')
        } else {
            toast('Something wrong. Please try again')
        }
    }

    // banner upload
    const bannerSave = async () => {
        const ids = mainSlider?.map(i => i._id);
        let data = {
            mainBanner: ids
        }
        if (mainSlider?.length > 0 ) {
            const res = await mainBannerCreate(data, auth?.token)
            if(res.status) {
                toast('Main slider images successfully save.')
                apiHandler(auth)
            } else {
                toast('Something wrong. Please try again')
            }
    
        } else {
            toast('Add image first.')
        }
    }

    // delete banner 
    const deleteBanner = async () => {
        const res = await deleteMainBanner(id, auth?.token)
        if (res.status) {
            toast('Image successfully Delete.')
            setMainSlider(null)
            setId(null)
            setUpdate(false)
        } else {
            toast('Something wrong. Please try again')
        }
    }

    // Image Replace
    const imageReplaceHandler = () => {
        setMainSlider(null)
    }

    // Set Image
    const setImageHandler = (img) => {
        if (!mainSlider) {
            setMainSlider([img]);
        } else {
            setMainSlider([...mainSlider, img]);
        }
    }

    // image sort
    const setGallerySort = (img) => {
        setMainSlider(img)
    }

    // delete image
    const deleteOneImage = (id) => {
        if (mainSlider?.length > 1) {
            setMainSlider(mainSlider?.filter(i => i._id !== id))
        } else {
            setMainSlider(null)
        }
    } 
    return(
        <div className="main-slider col-md-6">
            <h3 className="heading">
                Main Slider
            </h3>
            <hr />
            <ImageUploader
                imageReplaceHandler={imageReplaceHandler}
                image={mainSlider}
                setGallery={setImageHandler}
                setImage={setImageHandler}
                deleteOneImage={deleteOneImage}
                setGallerySort={setGallerySort}
            />

            {(!update && mainSlider?.length > 0) && <button className="btn btn-info w-100 mt-3" onClick={bannerSave}>Save</button>}
            
            {(update && mainSlider?.length > 0) && (
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-info w-100 mt-3" onClick={updateBanner}>Update</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-danger w-100 mt-3" onClick={deleteBanner}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainSlider