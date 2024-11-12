import Shipping from '../images/home/shipping.jpg'
import Similar1 from '../images/product-details/similar1.jpg'
import Similar2 from '../images/product-details/similar2.jpg'
import Similar3 from '../images/product-details/similar3.jpg'
import JPG1 from '../images/product-details/1.jpg'
import New from '../images/product-details/new.jpg'
import Rating from '../images/product-details/rating.png'
import share from '../images/product-details/share.png'
import sale from '../images/home/sale.png'
import Gallery1 from '../images/home/gallery1.jpg'
import Gallery2 from '../images/home/gallery2.jpg'
import Gallery3 from '../images/home/gallery3.jpg'
import Gallery4 from '../images/home/gallery4.jpg'
import Recommend1 from '../images/home/recommend1.jpg'
import Recommend2 from '../images/home/recommend2.jpg'
import Recommend3 from '../images/home/recommend3.jpg'
import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal } from 'bootstrap'
import { render } from '@testing-library/react'
import { DataContext } from '../DataContext'
import { useDispatch } from 'react-redux'
import { addNewHobby } from '../actions/hobby'
function ProductDetails() {
    //
    const dispatch = useDispatch()
    //
    let user = JSON.parse(localStorage.getItem('user'))
    const params = useParams()
    const [productDetail, setProductDetail] = useState({})
    const [brand, setBrand] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {})
    localStorage.setItem('cart', JSON.stringify(cart))
    const [img, setImg] = useState('')
    let { tongQty } = useContext(DataContext)
    function addToCart(obj) {
        let qty = 0
        Object.keys(obj).map((key, index) => {
            qty += obj[key]
        })
        tongQty(qty)
    }
    useEffect(() => {
        axios.get(`http://localhost/laravel8/laravel8/public/api/product/detail/${params.id}`)
            .then(res => {
                setProductDetail(res.data.data)
                let imgData = JSON.parse(res.data.data.image)
                setImg(imgData[0])
            })
            .catch(err => console.log(err))
        axios.get('http://localhost/laravel8/laravel8/public/api/category-brand')
            .then(res => setBrand(res.data.brand))
            .catch(err => console.log(err))
    }, [])
    function RenderBrand() {
        return brand.map((brand, index) => {
            if (brand.id == productDetail.id_brand) {
                return brand.brand
            }
        })
    }
    function RenderImgProductDetail() {
        if (typeof productDetail.image == 'string') {
            return (JSON.parse(productDetail.image)).map((image, index) => {
                return (
                    <Link key={index} onClick={() => setImg(image)}><img src={`http://localhost/laravel8/laravel8/public/upload/product/${user.id}/` + image} alt="" /></Link>
                )
            })
        }
    }
    function RenderProductDetail() {
        return (
            <div className="product-details">
                <div className="col-sm-5">
                    <div className="view-product">
                        <img src={`http://localhost/laravel8/laravel8/public/upload/product/${user.id}/` + img} alt="" />
                        <a href='#'><h3>ZOOM</h3></a>
                    </div>
                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div class="item active">
                                {RenderImgProductDetail()}
                            </div>
                            <div className="item">
                                {RenderImgProductDetail()}
                            </div>
                            <div className="item">
                                {RenderImgProductDetail()}
                            </div>
                        </div>
                        <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div className="col-sm-7">
                    <div className="product-information">
                        <img src={New} className="newarrival" alt="" />
                        <h2 style={{ textTransform: 'uppercase' }}>{productDetail.name}</h2>
                        <p>Web ID: {productDetail.id}</p>
                        <img src={Rating} alt="" />
                        <span>
                            <span>US ${productDetail.price}</span>
                            <label>Quantity:</label>
                            <button onClick={downQuantity}>-</button>
                            <input type="text" value={quantity} />
                            <button onClick={upQuantity}>+</button>
                            <button type="button" className="btn btn-fefault cart" onClick={() => AddToCartRedux(params.id, quantity)}>
                                <i className="fa fa-shopping-cart"></i>
                                Add to cart
                            </button>
                        </span>
                        <p><b>Availability:</b> In Stock</p>
                        <p><b>Condition:</b> {productDetail.status == 0 ? 'Sale' : 'New'}</p>
                        <p><b>Brand:</b> {RenderBrand()}</p>
                        <a href=""><img src={share} className="share img-responsive" alt="" /></a>
                    </div>
                </div>
            </div>
        )
    }
    function upQuantity() {
        setQuantity(quantity + 1)
    }
    function downQuantity() {
        if (quantity <= 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity - 1)
        }
    }
    function AddToCart(id, quantity) {
        let updatedCart = { ...cart };
        if (updatedCart[id]) {
            updatedCart[id] += quantity;
        } else {
            updatedCart[id] = quantity;
        }
        addToCart(updatedCart)
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    function AddToCartRedux(id, quantity) {
        let updatedCart = { ...cart };
        if (updatedCart[id]) {
            updatedCart[id] += quantity;
        } else {
            updatedCart[id] = quantity;
        }
        // addToCart(updatedCart)
        // setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        const action = addNewHobby(updatedCart)
        dispatch(action)
    }
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 padding-right">
                        {RenderProductDetail()}

                        <div className="category-tab shop-details-tab">
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                    <li><a href="#details" data-toggle="tab">Details</a></li>
                                    <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                                    <li><a href="#tag" data-toggle="tab">Tag</a></li>
                                    <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade" id="details" >
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery1} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery2} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery3} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery4} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="companyprofile" >
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery1} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery3} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery2} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery4} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="tag" >
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery1} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery2} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery2} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="product-image-wrapper">
                                            <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={Gallery4} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade active in" id="reviews" >
                                    <div className="col-sm-12">
                                        <ul>
                                            <li><a href=""><i className="fa fa-user"></i>EUGEN</a></li>
                                            <li><a href=""><i className="fa fa-clock-o"></i>12:41 PM</a></li>
                                            <li><a href=""><i className="fa fa-calendar-o"></i>31 DEC 2014</a></li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                        <p><b>Write Your Review</b></p>

                                        <form action="#">
                                            <span>
                                                <input type="text" placeholder="Your Name" />
                                                <input type="email" placeholder="Email Address" />
                                            </span>
                                            <textarea name="" ></textarea>
                                            <b>Rating: </b> <img src={Rating} alt="" />
                                            <button type="button" className="btn btn-default pull-right">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="recommended_items">
                            <h2 className="title text-center">recommended items</h2>

                            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src={Recommend1} alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src={Recommend2} alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src={Recommend3} alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src={Recommend1} alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src={Recommend2} alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src={Recommend3} alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link className="left recommended-item-control" to="#recommended-item-carousel" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </Link>
                                <Link className="right recommended-item-control" to="#recommended-item-carousel" data-slide="next">
                                    <i className="fa fa-angle-right"></i>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default ProductDetails
