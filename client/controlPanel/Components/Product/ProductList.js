import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductList = (props) => {
    const { modalShow, updateFeatured, deleteData } = props
    const {_id, name, featured, imageUrl, status, updatedAt } = props?.list
    return(
        <tr>
            <td>
                <i className="bi bi-star-fill cursor-pointer"
                    style={featured ? { color: 'orange', cursor: 'pointer' } : { color: 'lightgray', cursor: 'pointer' }}
                    onClick={() => updateFeatured(_id, featured, name)}
                ></i>
            </td>
            <td>
                {
                    imageUrl?.map((img,i)=>(
                        <LazyLoadImage key={i} affect="blur" src={img?.fileUrl} alt={img?.altText} className="images product-images" />
                    ))   
                }
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
                        <li><Link className="dropdown-item" to={`/product/${_id}`}><i className="bi bi-pencil-square"></i> Edit</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={() => deleteData(_id)}><i className="bi bi-trash3"></i> Delete</button></li>
                    </ul>
                </div>
            </td>
        </tr>
    )
}

export default ProductList;