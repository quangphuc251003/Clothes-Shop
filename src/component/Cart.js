import Cart1 from '../images/cart/one.png';
import Cart2 from '../images/cart/two.png';
import Cart3 from '../images/cart/three.png';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { DataContext } from '../DataContext';
function Cart() {
    const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('cart')) || {})
    let user = JSON.parse(localStorage.getItem('user'))
    let {tongQty} = useContext(DataContext)
    const [cart, setCart] = useState({})
    useEffect(() => {
        console.log(localCart);
        axios.post('http://localhost/laravel8/laravel8/public/api/product/cart', localCart)
            .then(res => 
                setCart(res.data.data)
            )
            .catch(err => console.log(err))
    }, [localCart])
	function addToCart(obj){
		let qty = 0
		Object.keys(obj).map((key,index) => {
			qty += obj[key]
		})
        tongQty(qty)
	}
    function RenderCart() {
        return Object.keys(cart).map((key, index) => {
            let img = JSON.parse(cart[key].image)[0]
            return (
                <tr key={index}>
                    <td className="cart_product">
                        <a href=""><img src={`http://localhost/laravel8/laravel8/public/upload/product/${user.id}/` + img} alt="" /></a>
                    </td>
                    <td className="cart_description">
                        <h4><a href="">{cart[key].name}</a></h4>
                        <p>Web ID: {cart[key].id}</p>
                    </td>
                    <td className="cart_price">
                        <p>${cart[key].price}</p>
                    </td>
                    <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <a onClick={() => UpQty(cart[key].id)} className="cart_quantity_up"> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" value={cart[key].qty} autocomplete="off" size="2" />
                            <a onClick={() => DownQty(cart[key].id)} className="cart_quantity_down"> - </a>
                        </div>
                    </td>
                    <td className="cart_total">
                        <p className="cart_total_price">${cart[key].price * cart[key].qty}</p>
                    </td>
                    <td className="cart_delete">
                        <a className="cart_quantity_delete" onClick={() => DeleteCart(cart[key].id)}><i className="fa fa-times"></i></a>
                    </td>
                </tr>
            )
        })
    }
    function UpQty(id){
        let localCartUpdate = {...localCart}
        if(localCartUpdate[id]){
            localCartUpdate[id] += 1
        }
        setLocalCart(localCartUpdate)
        localStorage.setItem('cart', JSON.stringify(localCartUpdate))
        addToCart(localCartUpdate)
    }
    function DownQty(id){
        let localCartUpdate = {...localCart}
        if(localCartUpdate[id] <= 1){
            localCartUpdate[id] = 1
        }else{
            localCartUpdate[id] -= 1
        }
        setLocalCart(localCartUpdate)
        localStorage.setItem('cart', JSON.stringify(localCartUpdate))
        addToCart(localCartUpdate)
    }
    function DeleteCart(id){
        let localCartUpdate = {...localCart}
        delete localCartUpdate[id]
        setLocalCart(localCartUpdate)
        localStorage.setItem('cart', JSON.stringify(localCartUpdate))
        addToCart(localCartUpdate)
    }
    return (
        <>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description">Description</td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {RenderCart()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="">Get Quotes</a>
                                <a className="btn btn-default check_out" href="">Continue</a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>$59</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>$61</span></li>
                                </ul>
                                <a className="btn btn-default update" href="">Update</a>
                                <Link className="btn btn-default check_out" to="/checkout">Check Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart