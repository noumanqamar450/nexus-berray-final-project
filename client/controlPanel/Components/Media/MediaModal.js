import { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import { imageOneDelete, imageOneUpdate } from "../../libs/Apis";
import Swal from 'sweetalert2'
import { LoaderOnly } from "../Loader";
import UserContext from "../../Context/Auth/UserContext";

const MediaModal = ({show, onClose, data, refresh}) => {
    const [newAltText, setNewAltText] = useState({ altText: '' })

    // auth context
    const { auth } = useContext(UserContext)
    
    useEffect(()=>{
        setNewAltText({ altText: data ? data?.altText : '' })
    },[data])

    // delete image
    const imgDelete = async (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                await imageOneDelete(id, auth?.token)
                onClose()
                refresh()
            } 

        })
    }

    // image alt text update 
    const updateHandler = async (id) => {
        if (newAltText.altText) {
            const res = await imageOneUpdate(id, newAltText, auth?.token);
            if (res.status) {
                toast('Updated image Alternative Text.')
            } else {
                toast('Not update alt text, please try again')
            }
        } else {
            toast('Add alternative text.')
        }
    }

    // image url copy
    const url = useRef(null);
    const copyToClipboard = () => {
        url.current.select();
        document.execCommand('copy');
        toast('Image url copied!')
    };
    
    if (!data)
        return (
            <Modal
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    <LoaderOnly />
                </Modal.Body>
            </Modal>
        )

    return(
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Media Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LazyLoadImage affect="blur" src={data?.fileUrl} alt={data?.altText} style={{width:'100%', marginBottom: '10px', borderRadius:'15px'}}/>
                <div className="mb-3">
                    <label htmlFor="altText" className="form-label">Alt Text</label>
                    <input
                        type="text"
                        className="form-control"
                        id="altText"
                        name="altText"
                        placeholder="Add image alternative text"
                        value={newAltText.altText}
                        onChange={(e) => setNewAltText({ altText: e.target.value })}
                        required
                    />
                </div>
                <div className="row">
                    <div className="col-sm-10 mb-3">
                        <input
                            ref={url}
                            type="text"
                            className="form-control"
                            id="altText"
                            name="altText"
                            defaultValue={data ? data?.fileUrl : ''}
                            readOnly
                        />
                    </div>
                    <div className="col-sm-2 mb-3">
                        <button className="btn btn-info w-100" onClick={copyToClipboard}><i className="bi bi-clipboard-check"></i></button>
                    </div>
                </div>
                <div>
                        Size: ({Math.round(data?.size / 1024)} KB) - Updating Date: ({data?.updatedAt?.slice(0, 10)} - {data?.updatedAt?.slice(11, 19)})
                </div>
                <div className="my-3">
                    <button className="btn btn-primary w-100" onClick={()=> updateHandler(data?._id)}>Update</button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" className="float-start" onClick={() => imgDelete(data?._id)}><i className="bi bi-trash"></i> Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MediaModal;