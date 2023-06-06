import { useCallback, useContext, useEffect, useState } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown, Offcanvas, Spinner } from 'react-bootstrap';
import { Cart, Person, Search } from 'react-bootstrap-icons';
import MiniCart from './MiniCart';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../Context/apis'
import CartContext from '../../Context/Cart/CartContext'
import MiniCartContext from '../../Context/MiniCart/MiniCartContext'
import AuthModal from '../Auth/AuthModal';
import AuthModalContext from '../../Context/AuthModal/AuthModalContext'
import AuthContext from '../../Context/Auth/AuthContext';
import SettingContext from '../../Context/SiteSetting/SettingContext';
import MenuContext from '../../Context/PageMenu/MenuContext'
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';

function Header() {
    const theme = 'dark';
    const [searchBar, setSearchBar] = useState(false);
    const [cateMenu, setCateMenu] = useState(null)
    const [isLoad, setIsLoad] = useState(false)

    // cart, miniCart, AuthModal, user, Auth, setting, Page Menu  useContext
    const { cart } = useContext(CartContext)
    const { setMiniCart } = useContext(MiniCartContext)
    const { setAuthModalShow } = useContext(AuthModalContext)
    const { user, setAuth, setUser } = useContext(AuthContext)
    const { setting } = useContext(SettingContext)
    const { headerMenu } = useContext(MenuContext)

    useEffect(() => { 
        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = setting?.favicon;
        let meta = document.querySelector("meta[content~='']")
        if (!meta) {
            meta = document.createElement('meta');
            meta.httpEquiv = "X-UA-Compatible";
            meta.content = setting?.shortAbout;
            document.head.appendChild(meta);
        }

    }, [setting])

    const closeSearchBar = useCallback(() => {
        setSearchBar(false)
    }, [])

    // get category for menu
    const categoryMenu = async () => {
        const cate = await getAllCategory()
        
        if (!cate.message) {
            setCateMenu(cate)
        } else {
            console.log(cate.message);
        }
    }

    //logout
    const logout = () => {
        setIsLoad(true)

        setTimeout(()=>{
            setAuth(null)
            setUser(null)
            localStorage.removeItem('token')
            setIsLoad(false)
            toast('Logout')
        },1000)
    }

    return (
        <Navbar bg={theme} variant={theme} expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand>
                    <Link to={'/'}>
                        <img src={setting?.siteLogo} alt={setting?.siteName} className='logo'/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                <Navbar.Offcanvas 
                    id="offcanvasNavbar-expand-lg"
                    aria-labelledby="offcanvasNavbarLabel-expand-lg"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                            <Link to={'/'}>
                                <img src={setting?.siteLogo} alt={setting?.siteName} className='canvas-logo' />
                            </Link>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav
                            className="justify-content-center flex-grow-1 pe-3"
                            style={{ maxHeight: '100px' }}
                        >
                            <div className='nav-link'>
                                <Link to='/'>Home</Link>
                            </div>
                            <div className='nav-link'>
                                <Link to='/menu'>Menu</Link>
                            </div>
                            <NavDropdown 
                                title="Category" 
                                id="offcanvasNavbarDropdown-expand-lg" 
                                variant={theme} 
                                onClick={categoryMenu}
                                >
                                {
                                    !cateMenu ? (
                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                            <Spinner animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        cateMenu.data.map((b, i)=>(
                                            <Link
                                                key={i}
                                                className='dropdown-item'
                                                to={'/category/' + b.slug}
                                                >
                                                {b.name}
                                            </Link> 

                                        ))
                                    )
                                }
                            </NavDropdown>
                            {
                                headerMenu?.map((h, i)=>(
                                    <div className='nav-link' key={i}>
                                        <Link to={`/${h.slug}`}>{h.title}</Link>
                                    </div>
                                )).reverse()
                            }
                            <div className="nav-link">
                                <Link to="/tracking">Order Tracking</Link>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className='navbar-left'>
                    {
                        user ? (
                            <div className='custom-btn profile'>
                                {
                                    isLoad ? (
                                        <Spinner animation='border' variant='light' size='sm'/>
                                    ) : (
                                        <Avatar name={user.fullName} size='30' round={true} textSizeRatio={1.75} />
                                    )
                                }
                                <div className="dropdown">
                                    <ul>
                                        <li><Link to="/profile">Profile</Link></li>
                                        <li><Link to="/your-orders">Your Orders</Link></li>
                                        <div className='divide' />
                                        <li onClick={logout}><Link>Logout</Link></li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div 
                                className='custom-btn'
                                onClick={_ => setAuthModalShow(true)}
                            >
                                <Person/> 
                            </div>
                        )
                    }
                    
                    <div className='custom-btn' 
                        onClick={() => { 
                            setTimeout(() => {
                                setMiniCart(true)
                            }, 200)
                        }}
                        >
                        <Cart /> 
                        <Badge>{cart.length}</Badge>
                    </div>
                    <div className='custom-btn' onClick={() => { setSearchBar(true) }}>
                        <Search />
                    </div>
                </div>
            </Container>
            <MiniCart/>
            <Searchbar active={searchBar} click={closeSearchBar}/>
            <AuthModal/>
        </Navbar>
    );
}

export default Header;