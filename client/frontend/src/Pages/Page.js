import { useContext, useEffect, useState } from "react"
import Placeholder from '../Components/ExtraComponents/Placeholder'
import FooterTop from '../Components/ExtraComponents/FooterTop'
import { Link, useNavigate, useParams } from "react-router-dom"
import SettingContext from '../Context/SiteSetting/SettingContext'
import { getPageBySlug } from "../Context/apis"
import parse from 'html-react-parser';

const Page = () => {
    const [page, setPage] = useState(null)

    // setting context
    const { setting } = useContext(SettingContext) 

    // useParam
    const { slug } = useParams() 

    // useNavigate
    const navigate = useNavigate()

    // About Page
    const getPage = async (slug) => {
        const res = await getPageBySlug(slug)

        if (res.status) {
            setPage(res)
        } else {
            setPage(null)
            navigate('/page-not-found');
        }
    }
    
    // APIs & Scroll Up
    useEffect(() => {
        if (slug){
            getPage(slug)
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug])
    
    // Page Title
    useEffect(()=>{
        document.title = `${page?.title ?? 'Loading'} - ${setting?.siteName ?? 'Loading...'}`;
    }, [page, setting])

    if (!page) 
        return (
            <div className="page">
                <div className="top-banner">
                    <Placeholder height={350} borderRadius={15}/>
                </div>
                <Placeholder width={80} height={30} borderRadius={10} marginBottom={20} />
                <Placeholder height={10} borderRadius={10} marginBottom={10} />
                <Placeholder height={10} borderRadius={10} marginBottom={10} />
                <Placeholder height={10} borderRadius={10} marginBottom={10} />
                <Placeholder height={10} borderRadius={10} />
            </div>
        )
    
    return(
        <>
            <nav aria-label="breadcrumb" className="mt-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{page.title}</li>
                </ol>
            </nav>
            <div className="page">
                {
                    page.image && (
                        <div className="top-banner">
                            <img src={page.image.fileUrl} alt={page.title} />
                        </div>
                    )
                }
                <h1 className="title">{page.title}</h1>
                <div className="content">
                    {parse(page.content)}
                </div>
            </div>
            <FooterTop/>
        </>
    )
}

export default Page