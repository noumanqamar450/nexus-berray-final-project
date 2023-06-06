import { useEffect } from "react"
import MediaUploader from "../../Components/Media/MediaUploader"

const AddMedia = () => {
    useEffect(() => {
        document.title = 'Add Media - LFC'
    }, [])
    return (
        <div className="page">
            <h2 className="py-3">Add Media</h2>
            <MediaUploader/>
        </div>
    )
}

export default AddMedia