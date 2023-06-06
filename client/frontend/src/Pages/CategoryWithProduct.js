import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FooterTop from '../Components/ExtraComponents/FooterTop'
import { getCategoryBySlug, getProductByCategorySlug } from "../Context/apis"
import ProductsForCategory from '../Components/CategoryPage/ProductsForCategory'
import parse from 'html-react-parser';
import Placeholder from "../Components/ExtraComponents/Placeholder"
import SettingContext from '../Context/SiteSetting/SettingContext'

const Brands = () => {
    let { slug } = useParams()
    
    const [category, setSetCategory] = useState(null)
    const [product, setProduct] = useState(null)

    // setting context
    const { setting } = useContext(SettingContext)
    
    // filtered Product
    const getCategoryProduct = async (slug) => {
        const cate = await getCategoryBySlug(slug)
        const cateWithPro = await getProductByCategorySlug(slug)

        // only category by slug
        if (!cate.message) {
            setSetCategory(cate)
        } else {
            console.log(cate.message);
        }

        // category with product by slug
        if (!cateWithPro.message) {
            setProduct(cateWithPro)
        } else {
            console.log(cateWithPro.message);
        }
    } 
    
    useEffect(()=>{
        setSetCategory(null)
        setProduct(null)
        getCategoryProduct(slug)
        
    }, [slug])
    
    useEffect(()=>{
        document.title = `${category?.name || 'Loading...'} - Category - ${setting?.siteName ?? 'Loading...'}`;
    }, [category, setting])
    
    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },[])
    
    // Display product by category
    if (!category)
        return (
            <div className="page">
                <Placeholder width={80} height={30} borderRadius={10} marginBottom={20} />
                <Placeholder height={10} borderRadius={10} marginBottom={10} />
                <Placeholder height={10} borderRadius={10} marginBottom={10} />
                <Placeholder height={10} borderRadius={10} marginBottom={10} />
                <Placeholder height={10} borderRadius={10} />
            </div>
        )
 
    return (
        <>
            <nav aria-label="breadcrumb" className="mt-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item">
                        <Link to='/category'>
                            Category
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {category.name} 
                    </li>
                </ol>
            </nav>
            <div className="page">
                <div className="short-content">
                    {parse(category.desc)}
                </div>
                <ProductsForCategory product={product}/>
            </div>
            <FooterTop/>
        </>
    )
            
    
}

export default Brands