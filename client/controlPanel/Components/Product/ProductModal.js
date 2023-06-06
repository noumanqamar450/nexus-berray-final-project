import { Button, Modal } from "react-bootstrap";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';

const Modals = (props) => {
    const { onClose, show } = props
    const { name, imageUrl, status, featured, slug, price, salePrice, desc, category } = props.data ? props.data : ''
    return(
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Category List View</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-responsive">
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <div className="row">
                                    <p>Gallery</p>
                                    {
                                        imageUrl?.map((img, i)=>(
                                            <div className="col-4" key={i}>
                                                <LazyLoadImage affect="blur" src={img?.fileUrl} alt={img?.altText} className="w-100 rounded-3"/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Name:
                            </th>
                            <td>
                                {name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Slug:
                            </th>
                            <td>
                                {slug}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Price:
                            </th>
                            <td>
                                {price}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Sale Price:
                            </th>
                            <td>
                                {salePrice ? salePrice : ''}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Category:
                            </th>
                            <td>
                                {category ? category.name : ''}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Description:
                            </th>
                            <td>
                                {parse(`${desc ? desc : ''}`)}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Featured:
                            </th>
                            <td>
                                {featured ? 'Yes' : 'No'}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Status:
                            </th>
                            <td className="text-capitalize">
                                {status}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>Back</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default Modals