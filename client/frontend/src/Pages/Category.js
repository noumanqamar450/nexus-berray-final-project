import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FooterTop from '../Components/ExtraComponents/FooterTop'
import { getAllCategory } from "../Context/apis"
import AllCategory from '../Components/CategoryPage/AllCategory'
import CateImagePlaceholder from "../Components/CategoryPage/CateImagePlaceholder"
import SettingContext from '../Context/SiteSetting/SettingContext'

const Brands = () => {
    const [allCategory, setAllCategory] = useState(null)

    // setting context
    const { setting } = useContext(SettingContext)
    
    const getAllCategoryApi = async () => {
        const cate = await getAllCategory()

        if (!cate.message) {
            setAllCategory(cate)
        } else {
            console.log(cate.message);
        }
    }

    useEffect(()=>{
        getAllCategoryApi()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])
    
    useEffect(()=>{
        document.title = `Category - ${setting?.siteName ?? 'Loading...'}`;
    },[setting])
    
    // Display only category
    if (!allCategory)
        return <CateImagePlaceholder />
        
    return(
            <>
                <nav aria-label="breadcrumb" className="mt-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Category</li>
                    </ol>
                </nav>
                <div className="page">
                    <h1 className="title">Category</h1>
                    <AllCategory category={allCategory?.data}/>
                </div>
                <FooterTop/>
            </>
        )
}

export default Brands