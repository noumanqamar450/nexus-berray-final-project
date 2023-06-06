import { Container } from 'react-bootstrap';
import Header from './Components/ExtraComponents/Header';
import Home from './Pages/Home'
import Footer from './Components/ExtraComponents/Footer';
import Menu from './Pages/Menu';
import Page404 from './Pages/Page404'
import { Routes, Route } from 'react-router-dom';
import Detail from './Components/ProductDetailPage/Detail';
import Category from './Pages/Category';
import Page from './Pages/Page';
import QueryState from './Context/Pagination/QueryState';
import FilterState from './Context/Filter/FilterState';
import CartState from './Context/Cart/CartState';
import CategoryWithProduct from './Pages/CategoryWithProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Pages/Cart';
import MiniCartState from './Context/MiniCart/MiniCartState';
import Checkout from './Pages/Checkout';
import OrderState from './Context/Order/OrderState';
import AuthModalState from './Context/AuthModal/AuthModalState';
import AuthState from './Context/Auth/AuthState';
import OrderPlaced from './Pages/OrderPlaced';
import ConfirmOrderState from './Context/ConfirmOrder/ConfirmOrderState'
import Tracking from './Pages/Tracking';
import TrackState from './Context/OrderTrack/TrackState';
import SettingState from './Context/SiteSetting/SettingState';
import UserOrders from './Pages/UserOrders';
import MenuState from './Context/PageMenu/MenuState';
import UserProfile from './Pages/UserProfile';

const App = () => {
    return (
        <>
        <MenuState>
            <SettingState>
                <TrackState>
                    <ConfirmOrderState>
                        <AuthState>
                            <AuthModalState>
                                <OrderState>
                                    <MiniCartState>
                                        <CartState>
                                            <FilterState>
                                                <QueryState>
                                                    <Header />
                                                    <Container>
                                                        <Routes>
                                                            <Route exact path='/' element={<Home />} />
                                                            <Route exact path='/menu' element={<Menu />}/>
                                                            <Route exact path='/product/:slug' element={<Detail />}/>
                                                            <Route exact path='/category' element={<Category />} />
                                                            <Route exact path='/category/:slug' element={<CategoryWithProduct />} />
                                                            <Route exact path='/category' element={<Category />} />
                                                            <Route exact path='/:slug' element={<Page />} />
                                                            <Route exact path='/cart' element={<Cart />} />
                                                            <Route exact path='/checkout' element={<Checkout />} />
                                                            <Route exact path='/confirm' element={<OrderPlaced />} />
                                                            <Route exact path='/tracking' element={<Tracking />} />
                                                            <Route exact path='/profile' element={<UserProfile />} />
                                                            <Route exact path='/your-orders' element={<UserOrders/>}/>
                                                            <Route path="*" element={<Page404 />} />
                                                            <Route exact path="/page-not-found" element={<Page404 />} />
                                                        </Routes>
                                                    </Container>
                                                    <Footer />  
                                                </QueryState>
                                            </FilterState>
                                        </CartState>
                                    </MiniCartState>
                                </OrderState>
                            </AuthModalState>
                        </AuthState>
                    </ConfirmOrderState>
                </TrackState>
            </SettingState>
        </MenuState>
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        </>
    )
}

export default App
