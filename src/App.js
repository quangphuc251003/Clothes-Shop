import { useEffect, useState } from "react";
import MenuLeft from "./component/MenuLeft";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
import { useLocation } from "react-router-dom";
import MenuAcc from "./component/MenuAccount";
import Girl1 from '../src/images/home/girl1.jpg'
import Girl2 from '../src/images/home/girl2.jpg'
import Girl3 from '../src/images/home/girl3.jpg'
import Pricing from '../src/images/home/pricing.png'
import { DataContext } from "./DataContext";
import { Provider } from "react-redux";
import store from "./soter";
function App(props) {
	let params1 = useLocation()
	const [qty, setQty] = useState(RenderQtyCart())
	const [qtyWishList, setQtyWishList] = useState(RenderQtyWishList())
	function RenderQtyCart() {
		let cart = JSON.parse(localStorage.getItem('cart'))
		let tong = 0
		if (cart) {
			if (Object.keys(cart).length > 0) {
				Object.keys(cart).map((key, index) => {
					tong += cart[key]
				})
				return tong
			} else {
				return tong
			}
		}
	}
	function RenderQtyWishList() {
		let qtyWishList = JSON.parse(localStorage.getItem('wishlist'))
		let tong = 0
		if (qtyWishList) {
			tong = qtyWishList.length
			return tong
		}
	}
	function tongQty(data) {
		setQty(data)
	}
	function tongWishList(data) {
		setQtyWishList(data)
	}
	return (
		<Provider store={store}>
			<DataContext.Provider value={{
				tongQty: tongQty,
				tongWishList: tongWishList,
				qty: qty,
				qtyWishList: qtyWishList
			}}>
				<Header />
				<section id="slider">
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div id="slider-carousel" className="carousel slide" data-ride="carousel">
									<ol className="carousel-indicators">
										<li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
										<li data-target="#slider-carousel" data-slide-to="1"></li>
										<li data-target="#slider-carousel" data-slide-to="2"></li>
									</ol>

									<div className="carousel-inner">
										<div className="item active">
											<div className="col-sm-6">
												<h1><span>E</span>-SHOPPER</h1>
												<h2>Free E-Commerce Template</h2>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
												<button type="button" className="btn btn-default get">Get it now</button>
											</div>
											<div className="col-sm-6">
												<img src={Girl1} className="girl img-responsive" alt="" />
												<img src={Pricing} className="pricing" alt="" />
											</div>
										</div>
										<div className="item">
											<div className="col-sm-6">
												<h1><span>E</span>-SHOPPER</h1>
												<h2>100% Responsive Design</h2>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
												<button type="button" className="btn btn-default get">Get it now</button>
											</div>
											<div className="col-sm-6">
												<img src={Girl2} className="girl img-responsive" alt="" />
												<img src={Pricing} className="pricing" alt="" />
											</div>
										</div>

										<div className="item">
											<div className="col-sm-6">
												<h1><span>E</span>-SHOPPER</h1>
												<h2>Free Ecommerce Template</h2>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
												<button type="button" className="btn btn-default get">Get it now</button>
											</div>
											<div className="col-sm-6">
												<img src={Girl3} className="girl img-responsive" alt="" />
												<img src={Pricing} className="pricing" alt="" />
											</div>
										</div>

									</div>

									<a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
										<i className="fa fa-angle-left"></i>
									</a>
									<a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
										<i className="fa fa-angle-right"></i>
									</a>
								</div>

							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="container">
						<div className="row">
							{params1['pathname'].includes('account') ? <MenuAcc /> : <MenuLeft />}
							{props.children}
						</div>
					</div>
				</section>
				<Footer />
			</DataContext.Provider>
		</Provider>
	)
}

export default App;
