import { useContext, useEffect, useState } from "react"
import UserContext from "../Context/Auth/UserContext"
import { siteSetting, updateSetting } from "../libs/Apis"
import { toast } from "react-toastify"
import FooterTop from "../Components/Setting/FooterTop"

const initialObj = {
    siteLogo: '',
    favicon: '',
    siteName: '',
    shortAbout: '',
    androidLink: '',
    iosLink: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
    web: '',
    copyright: '',
    checkoutNote:'',
    footerTop: {
        left: {
            heading: '',
            content: ''
        },
        center: {
            heading: '',
            content: ''
        },
        right: {
            heading: '',
            content: ''
        }
    }
}

const Setting = () => {
    const [field, setField] = useState(initialObj)
    const [setting, setSetting] = useState(null)

    // auth context
    const { auth } = useContext(UserContext)

    // api handler function
    const handler = async (auth) => {
        const res = await siteSetting(auth?.token)
        if (res.message) {
            toast(res.message)
        } else {
            setSetting(res)
            setField({
                siteLogo: res.siteLogo ?? '',
                favicon: res.favicon ?? '',
                siteName: res.siteName ?? '',
                shortAbout: res.shortAbout ?? '',
                androidLink: res.androidLink ?? '',
                iosLink: res.iosLink ?? '',
                facebook: res.facebook ?? '',
                instagram: res.instagram ?? '',
                twitter: res.twitter ?? '',
                linkedin: res.linkedin ?? '',
                youtube: res.youtube ?? '',
                tiktok: res.tiktok ?? '',
                web: res.web ?? '',
                copyright: res.copyright ?? '',
                checkoutNote: res.checkoutNote ?? '',
                footerTop: {
                    left: {
                        heading: res.footerTop?.left.heading ?? '',
                        content: res.footerTop?.left.content ?? ''
                    },
                    center: {
                        heading: res.footerTop?.center.heading ?? '',
                        content: res.footerTop?.center.content ?? ''
                    },
                    right: {
                        heading: res.footerTop?.right.heading ?? '',
                        content: res.footerTop?.right.content ?? ''
                    }
                }
            })
        }
    }

    useEffect(() => {
        handler(auth)
        document.title = 'Setting - LFC'
    }, [auth])

    const updatingSetting = async () => {
        const res = await updateSetting(setting._id, field, auth?.token)

        if (res.data) {
            handler(auth)
            toast(res.message)
        } else {
            toast(res.message)
        }
    }

    return (
        <div className="page">
            <div className="mb-3 d-flex gap-4 align-items-center">
                <h2 className="py-3">Setting</h2>
                <button className="btn btn-primary" style={{height:'40px'}} onClick={updatingSetting}>Update</button>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <h4>Site Information</h4>
                    <div className="mb-3">
                        <label className="form-label">Site Logo (url)</label>
                        <input 
                            type="text" 
                            value={field.siteLogo} 
                            onChange={(e) => setField({...field, siteLogo: e.target.value})} 
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Favicon (url)</label>
                        <input
                            type="text"
                            value={field.favicon}
                            onChange={(e) => setField({ ...field, favicon: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Site Name</label>
                        <input
                            type="text"
                            value={field.siteName}
                            onChange={(e) => setField({ ...field, siteName: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Checkout Note</label>
                        <textarea
                            className="form-control"
                            onChange={(e) => setField({ ...field, checkoutNote: e.target.value })}
                            value={field.checkoutNote}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="col-md-4">
                    <h4>Footer Setting</h4>
                    <div className="mb-3">
                        <label className="form-label">Short About</label>
                        <textarea 
                            className="form-control" 
                            onChange={(e) => setField({ ...field, shortAbout: e.target.value })}
                            value={field.shortAbout}
                            >
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Android Link</label>
                        <input
                            type="text"
                            value={field.androidLink}
                            onChange={(e) => setField({ ...field, androidLink: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">IOS Link</label>
                        <input
                            type="text"
                            value={field.iosLink}
                            onChange={(e) => setField({ ...field, iosLink: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Copyright</label>
                        <input
                            type="text"
                            value={field.copyright}
                            onChange={(e) => setField({ ...field, copyright: e.target.value })}
                            className="form-control" />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4>Social Media Links</h4>
                    <div className="mb-3">
                        <label className="form-label">Facebook</label>
                        <input
                            type="text"
                            value={field.facebook}
                            onChange={(e) => setField({ ...field, facebook: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Instagram</label>
                        <input
                            type="text"
                            value={field.instagram}
                            onChange={(e) => setField({ ...field, instagram: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Twitter</label>
                        <input
                            type="text"
                            value={field.twitter}
                            onChange={(e) => setField({ ...field, twitter: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">LinkedIn</label>
                        <input
                            type="text"
                            value={field.linkedin}
                            onChange={(e) => setField({ ...field, linkedin: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">YouTube</label>
                        <input
                            type="text"
                            value={field.youtube}
                            onChange={(e) => setField({ ...field, youtube: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">TikTok</label>
                        <input
                            type="text"
                            value={field.tiktok}
                            onChange={(e) => setField({ ...field, tiktok: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Web Link</label>
                        <input
                            type="text"
                            value={field.web}
                            onChange={(e) => setField({ ...field, web: e.target.value })}
                            className="form-control" />
                    </div>
                </div>
                <div className="col-12">
                    <FooterTop field={field} setField={setField}/>
                </div>
            </div>
        </div>
    )
}

export default Setting