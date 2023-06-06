import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CategoryList = (props) => {
    const { modalShow, updateFeatured, deleteData } = props
    let { _id, name, featured, imageUrl, status, updatedAt } = props.list
    imageUrl = imageUrl.length > 0 ? Object.assign({}, imageUrl)[0] : imageUrl;

    return(
        <tr>
            <td>
                <i className="bi bi-star-fill cursor-pointer"
                    style={featured ? { color: 'orange', cursor: 'pointer' } : { color: 'lightgray', cursor: 'pointer' }}
                    onClick={() => updateFeatured(_id, featured, name)}
                ></i>
            </td>
            <td>
                <LazyLoadImage affect="blur" src={imageUrl?.fileUrl} alt={imageUrl?.altText} className="images category-image" />
            </td>
            <td>{name}</td>
            <td>{updatedAt?.slice(0, 10)} - {updatedAt?.slice(11, 19)}</td>
            <td><span className={status === 'publish' ? "badge bg-primary text-capitalize" : "badge bg-info text-capitalize"}>{status}</span></td>
            <td>
                <div className="btn-group dropstart">
                    <button type="button" className="btn-setting" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-gear ms-2"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={()=>modalShow(_id)}><i className="bi bi-eye"></i> View</button></li>
                        <li><Link className="dropdown-item" to={`/category/${_id}`}><i className="bi bi-pencil-square"></i> Edit</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={() => deleteData(_id)}><i className="bi bi-trash3"></i> Delete</button></li>
                    </ul>
                </div>
            </td>
        </tr>
    )
}

export default CategoryList;