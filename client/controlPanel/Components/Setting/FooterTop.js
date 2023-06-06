const FooterTop = ({field, setField}) => {
    return (
        <>
            <h4>Footer Top</h4>
            <div className="row">
                <div className="col-md-4">
                    <div className="p-3 border border-primary rounded-3 mb-2">
                        <h5>Left Side:</h5>
                        <div className="mb-2">
                            <label className="form-label">Heading</label>
                            <input
                                type="text"
                                value={field.footerTop.left.heading}
                                onChange={(e) => {
                                    setField({
                                        ...field,
                                        footerTop: {
                                            ...field.footerTop,
                                            left: {
                                                ...field.footerTop.left,
                                                heading: e.target.value
                                            }
                                        }
                                    })
                                }}
                                className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-control"
                                onChange={(e) => {
                                    setField({
                                        ...field,
                                        footerTop: {
                                            ...field.footerTop,
                                            left: {
                                                ...field.footerTop.left,
                                                content: e.target.value
                                            }
                                        }
                                    })
                                }}
                                value={field.footerTop.left.content}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className=" p-3 border border-primary rounded-3 mb-2">
                        <h5>Center:</h5>
                        <div className="mb-2">
                            <label className="form-label">Heading</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setField({
                                        ...field,
                                        footerTop: {
                                            ...field.footerTop,
                                            center: {
                                                ...field.footerTop.center,
                                                heading: e.target.value
                                            }
                                        }
                                    })
                                }}
                                value={field.footerTop.center.heading}
                                className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-control"
                                onChange={(e) => {
                                    setField({
                                        ...field,
                                        footerTop: {
                                            ...field.footerTop,
                                            center: {
                                                ...field.footerTop.center,
                                                content: e.target.value
                                            }
                                        }
                                    })
                                }}
                                value={field.footerTop.center.content}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className=" p-3 border border-primary rounded-3 mb-2">
                        <h5>Right Side:</h5>
                        <div className="mb-2">
                            <label className="form-label">Heading</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setField({
                                        ...field,
                                        footerTop: {
                                            ...field.footerTop,
                                            right: {
                                                ...field.footerTop.right,
                                                heading: e.target.value
                                            }
                                        }
                                    })
                                }}
                                value={field.footerTop.right.heading}
                                className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-control"
                                onChange={(e) => {
                                    setField({
                                        ...field,
                                        footerTop: {
                                            ...field.footerTop,
                                            right: {
                                                ...field.footerTop.right,
                                                content: e.target.value
                                            }
                                        }
                                    })
                                }}
                                value={field.footerTop.right.content}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterTop