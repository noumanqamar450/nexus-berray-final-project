import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from '../Context/Auth/UserContext'
import { BoxArrowRight, PersonCheck } from "react-bootstrap-icons";

const Header = () =>{
    const [url, setUrl] = useState(null)
    const [menu, setMenu] = useState(false)
    const  [dropdown, setDropdown] = useState({
        cate: false,
        prod: false,
        media: false,
        page: false,
    })


    //user context
    const { user } = useContext(UserContext)

    const location = useLocation()

    useEffect(()=>{
        setUrl(location.pathname)
    }, [location])

    // dropdown
    const dropdownHandle = (e)=>{
        const text = e.target.innerText
        if (text === 'Category')
            setDropdown({ media: false, prod: false, cate: true, page: false});
        else if (text === 'Product')
            setDropdown({ media: false, prod: true, cate: false, page: false});
        else if (text === 'Media')
            setDropdown({ media: true, prod: false, cate: false, page: false});
        else if (text === 'Pages')
            setDropdown({ media: false, prod: false, cate: false, page: true});
        else 
            setDropdown({ media: false, prod: false, cate: false, page: false })
    }

    // menu collapse
    const menuCollapse = () => {
        if (menu) {
            setMenu(false)
        } else {
            setMenu(true)
        }
    }

    //logout
    const logout = () => {
        localStorage.removeItem('auth')
        setTimeout(()=>{
            window.location.reload()
        },1000)
    }

    return(
        <>
            <header className={menu ? 'active' : ''}>
                <div className="profile">
                    <div className="profile-image"><PersonCheck/></div>
                    <div className="content">
                        <h3>{user?.fullName}</h3>
                        <p>Administrator</p>
                    </div>
                </div>
                <hr />
                <ul>
                    <li>
                        <Link to="/dashboard" className={url?.includes('/dashboard') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-house float-start"></i> Dashboard</Link>
                    </li>
                    <li>
                        <Link className={url?.includes('/media') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-folder2-open float-start"></i> Media</Link>
                        <ul className={dropdown.media ? 'active' : ''}>
                            <li>
                                <Link to="/media/list" className={url?.includes('/media/list') ? 'active' : ''}><i className="bi bi-dash float-start"></i> List</Link>
                            </li>
                            <li>
                                <Link to="/media/add" className={url?.includes('/media/add') ? 'active' : ''}><i className="bi bi-dash float-start"></i> Add</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link className={url?.includes('/category') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-box2 float-start"></i> Category</Link>
                            <ul className={dropdown.cate ? 'active' : ''}>
                                <li>
                                    <Link to="/category/list" className={url?.includes('/category/list') ? 'active' : ''}><i className="bi bi-dash float-start"></i> List</Link>
                                </li>
                                <li>
                                    <Link to="/category/add" className={url?.includes('/category/add') ? 'active' : ''}><i className="bi bi-dash float-start"></i> Add</Link>
                                </li>
                            </ul>
                    </li>
                    <li>
                        <Link className={url?.includes('/product') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-boxes float-start"></i> Product</Link>
                            <ul className={dropdown.prod ? 'active' : ''}>
                                <li>
                                    <Link to="/product/list" className={url?.includes('/product/list') ? 'active' : ''}><i className="bi bi-dash float-start"></i> List</Link>
                                </li>
                                <li>
                                    <Link to="/product/add" className={url?.includes('/product/add') ? 'active' : ''}><i className="bi bi-dash float-start"></i> Add</Link>
                                </li>
                            </ul>
                    </li>
                    <li>
                        <Link to="/orders" className={url?.includes('/orders') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-cart float-start"></i> Orders</Link>
                    </li>
                    <li>
                        <Link className={url?.includes('/page') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-layout-text-window float-start"></i> Pages</Link>
                        <ul className={dropdown.page ? 'active' : ''}>
                            <li>
                                <Link to="/page/list" className={url?.includes('/page/list') ? 'active' : ''}><i className="bi bi-dash float-start"></i> List</Link>
                            </li>
                            <li>
                                <Link to="/page/add" className={url?.includes('/page/add') ? 'active' : ''}><i className="bi bi-dash float-start"></i> Add</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/banner" className={url?.includes('/banner') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-window-desktop float-start"></i> Banners</Link>
                    </li>
                    <li>
                        <Link to="/setting" className={url?.includes('/setting') ? 'active' : ''} onClick={dropdownHandle}><i className="bi bi-gear float-start"></i> Setting</Link>
                    </li>
                    
                </ul>
                <button className="btn btn-link" onClick={logout}>Logout <BoxArrowRight /></button>
            </header>
            <div className="collapse-menu" onClick={menuCollapse}>
                <i className={menu ? 'bi bi-x-lg' : 'bi bi-list'}></i>
            </div>
        </>
    )
}

export default Header;