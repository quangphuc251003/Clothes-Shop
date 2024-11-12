import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Shop from './component/Shop';
import ProductDetails from './component/Product-details';
import MyProduct from './component/My-product';
import Index from './component/Index';
import Contact from './component/Contact';
import Checkout from './component/Checkout';
import Cart from './component/Cart';
import Blog from './component/Blog/Blog';
import Page404 from './component/Page404';
import Account from './component/Account';
import BlogDetails from './component/Blog/Blogdetails';
import IndexLogin from './component/member/Index';
import AddProduct from './component/AddProduct';
import EditProduct from './component/EditProduct';
import WishList from './component/WishList';
import Admin from './component/Admin/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
                <App>
                    <Routes>
                        <Route index path='/' element={<Index />} />
                        <Route path='/shop' element={<Shop />} />
                        <Route path='/productdetails/:id' element={<ProductDetails />} />
                        <Route path='/account/myproduct' element={<MyProduct />} />
                        <Route path='/login' element={<IndexLogin />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/blog' element={<Blog />} />
                        <Route path='/wishlist' element={<WishList />} />
                        <Route path='/page404' element={<Page404 />} />
                        <Route path='/account/update' element={<Account />} />
                        <Route path='/blog/detail/:id' element={<BlogDetails />} />
                        <Route path='/account/addproduct' element={<AddProduct />} />
                        <Route path='/account/editproduct/:id' element={<EditProduct />} />
                        <Route path='/admin' element={<Admin/>} />
                    </Routes>
                </App>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
