import { LazyLoadImage } from "react-lazy-load-image-component";
import MediaModal from "./MediaModal";
import { useState } from "react";
import { imageOneView } from "../../libs/Apis";
import {LoaderOnly} from "../Loader";
import UserContext from "../../Context/Auth/UserContext";
import { useContext } from "react";

const SingleMedia = ({ data, dataRefresh }) => {
    const [show, setShow] = useState(false)
    const [singleData, setSingleData] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    const MediaModalOnClose = () => {
        setShow(false)
    }
    
    const MediaModalOnOpen = async (id) => {
        setShow(true)
        setSingleData(null)
        setSingleData(await imageOneView(id, auth?.token))
    }

    if (!data)
        return <LoaderOnly />

    return(
        <>
            {
                data.map(m => (
                    <div className="col-4 col-md-3 col-lg-2" key={m._id}>
                        <div className="media" onClick={() => MediaModalOnOpen(m._id)}>
                            <LazyLoadImage src={m.fileUrl} affect="blur" alt={m.altText} />
                        </div>
                    </div>
                ))
            }
            <MediaModal show={show} onClose={MediaModalOnClose} data={singleData} refresh={dataRefresh}/>
        </>
    )
}

export default SingleMedia;