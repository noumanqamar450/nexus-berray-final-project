import Select from 'react-select'
import Editor from 'react-simple-wysiwyg';
import ImageMediaGallery from '../Media/ImageMediaGallery'
import { useState } from 'react';

const NewPage = ({ field, setField, onSubmit, load }) => {
    const [show, setShow] = useState(false)

    // status's options
    const statusOption = [
        { value: 'draft', label: 'Draft' },
        { value: 'publish', label: 'Publish' },
    ]
    
    // setMenu's Options
    const menuOption = [
        { value: 'header', label: 'Header' },
        { value: 'footer', label: 'Footer' },
    ]

    // media modal handler
    const onClose = () => {
        setShow(false)
    }

    // image handler 
    const imageHandler = (img) => {
        setField({...field, image: img._id})
    }

    return (
        <div className="new-page">
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={field?.title}
                            onChange={(e) => {
                                setField({ ...field, title: e.target.value })
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Slug</label>
                        <input
                            type="text"
                            className="form-control"
                            value={field?.slug}
                            onChange={(e) => {
                                setField({ ...field, slug: e.target.value.replace(/ /g, "-").toLocaleLowerCase() })
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <Select 
                            value={field?.status}
                            options={statusOption} 
                            onChange={(choice) => setField({ ...field, status: choice})}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Set on Menu</label>
                        <Select
                            isMulti
                            value={field?.setMenu}
                            options={menuOption}
                            onChange={(choice) => setField({ ...field, setMenu: choice })}
                        />
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="mb-3">
                        <input
                            type="search"
                            className="form-control"
                            value={field?.image}
                            required
                            onChange={(e) => {
                                setField({ ...field, image: e.target.value ? e.target.value : null })
                            }} 
                            placeholder='Image Url'
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <button className='btn btn-primary w-100' onClick={_ => setShow(true)}>Select From Media</button>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">Page Content</label>
                    <Editor 
                        value={field?.content} 
                        onChange={(e) => {
                            setField({ ...field, content: e.target.value})
                        }} 
                    />
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <button 
                            className='btn btn-primary' 
                            onClick={onSubmit}
                            disabled={load}
                            >
                            {
                                load && (
                                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                )
                            }
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <ImageMediaGallery
                show={show}
                hide={onClose}
                selectImage={imageHandler}
            />
        </div>
    )
}

export default NewPage