import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import AddCategory from "./Pages/Category/AddCate";
import Category from "./Pages/Category/Category";
import NotFound from "./Pages/NotFound";
import Header from './Components/Header';
import Media from './Pages/Media/Media';
import AddMedia from './Pages/Media/AddMed';
import Product from "./Pages/Product/Product";
import AddProduct from "./Pages/Product/AddProd";
import { ToastContainer } from 'react-toastify';
import Banner from './Pages/Banner/Banner';
import Orders from './Pages/Orders';
import { useContext } from 'react';
import UserContext from './Context/Auth/UserContext';
import LoginPage from './Pages/LoginPage';
import Setting from './Pages/Setting';
import Pages from './Pages/Page/Pages';
import AddPage from './Pages/Page/AddPage'

const App = () => {

    //Admin Validation using useContext
    const { user } = useContext(UserContext)

    if (!user)
        return <Routes> <Route exact path='/' element={<LoginPage />}/></Routes>

    return(
        <> 
            <div className='container-fluid row'>
                <div className="col-xxl-2 col-lg-3 col-md-12 p-4">
                    <Header/>
                </div>
                <div className="col-xxl-10 col-lg-9 col-md-12 p-4">
                    <Routes>
                        <Route exact path='/dashboard' element={<Home />} />
                        <Route exact path='/setting' element={<Setting />} />
                        <Route exact path='/category/list' element={<Category />} />
                        <Route exact path='/category/add' element={<AddCategory />} />
                        <Route exact path='/category/:cid' element={<AddCategory />} />
                        <Route exact path='/media/list' element={<Media />} />
                        <Route exact path='/media/add' element={<AddMedia />} />
                        <Route exact path='/product/list' element={<Product />} />
                        <Route exact path='/product/add' element={<AddProduct />} />
                        <Route exact path='/product/:pid' element={<AddProduct />} />
                        <Route exact path='/orders' element={<Orders />} />
                        <Route exact path='/page/list' element={<Pages />} />
                        <Route exact path='/page/add' element={<AddPage />} />
                        <Route exact path='/page/:pid' element={<AddPage />} />
                        <Route exact path='/banner' element={<Banner />} />
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
            <ToastContainer style={{ width: "auto" }} />
        </>
    )
}

export default App;