import { Button, Modal } from "react-bootstrap";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';

const Modals = (props) => {
    const { onClose, show } = props
    const { name, imageUrl, status, desc, featured, slug } = props.data ? props.data : '';
    
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
                <table className="table">
                    <tbody>
                        <tr>
                            <td colSpan="2">
                               <LazyLoadImage affect="blur" src={imageUrl?.fileUrl} alt={imageUrl?.altText} className="w-100"/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Name:
                            </th>
                            <td>
                                {name ? name : ''}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Slug:
                            </th>
                            <td>
                                {slug ? slug : ''}
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
                                {status ? status : ''}
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