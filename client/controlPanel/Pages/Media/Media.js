import { useContext, useEffect, useState } from "react"
import { imageAllView } from "../../libs/Apis";
import SingleMedia from "../../Components/Media/SingleMedia";
import { Link } from "react-router-dom";
import {Loader} from "../../Components/Loader";
import UserContext from "../../Context/Auth/UserContext";

const Media = () => {
    const [media, setMedia] = useState(null)
    const [query, setQuery] = useState({limit: 18, page: 1})

    // auth context
    const { auth } = useContext(UserContext)

    const apiHandler = async (query, auth) => {
        setMedia(await imageAllView(query, auth?.token));
    }
    
    useEffect(() => {
        apiHandler(query, auth)
        document.title = 'Media - LFC'
    }, [query, auth])

    const pagination = (page) => {
        setQuery({ ...query, page: page })
    }
    
    const dataRefresh = () => {
        apiHandler(query, auth);
    }

    if (!media)
        return <Loader/>

    return (
        <div className="page">
            <h2 className="py-3">Media List</h2>
            <div className="row media-list">
                <SingleMedia data={media.data} dataRefresh={dataRefresh}/>
                {/* pagination */}
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className={media?.previous ? 'page-item' : 'page-item disabled'}>
                            <Link className="page-link" href="#" tabIndex="-1" onClick={() => {
                                pagination(media?.previous?.page)
                                setMedia(null)
                            }}>Previous</Link>
                        </li>
                        <li className="page-item disabled" style={!media?.previous ? { display: 'none' } : {}}><Link className="page-link" >{media?.previous?.page}</Link></li>
                        <li className="page-item disabled"><Link className="page-link">{query?.page}</Link></li>
                        <li className="page-item disabled" style={!media?.next ? { display: 'none' } : {}}><Link className="page-link" >{media?.next?.page}</Link></li>
                        <li className={media?.next ? 'page-item' : 'page-item disabled'}>
                            <Link className="page-link" href="#" onClick={() => {
                                pagination(media?.next?.page)
                                setMedia(null)
                            }}>Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Media