import Shipping from '../../images/home/shipping.jpg';
import BLog1 from '../../images/blog/blog-one.jpg';
import Blog2 from '../../images/blog/blog-two.jpg';
import Blog3 from '../../images/blog/blog-three.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MenuLeft from '../MenuLeft';
function Blog() {
	const [getblogs, setBlogs] = useState({})
	useEffect(() => {
		axios.get('http://localhost/laravel8/laravel8/public/api/blog')
			.then(res => {
				setBlogs(res.data)
			})
			.catch(err => console.log(err))
	}, [])
	function renderBlog() {
		if (Object.keys(getblogs).length > 0) {
			return (getblogs.blog.data).map((value, key) => {
				return (
					<div key={value.id} className="single-blog-post">
						<h3>{value.title}</h3>
						<div className="post-meta">
							<ul>
								<li><i className="fa fa-user"></i> Mac Doe</li>
								<li><i className="fa fa-clock-o"></i> 1:33 pm</li>
								<li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
							</ul>
							<span>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star-half-o"></i>
							</span>
						</div>
						<a href="">
							<img src={'http://localhost/laravel8/laravel8/public/upload/Blog/image/' + value.image} alt="" />
						</a>
						<p>{value.description}</p>
						<Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
					</div>
				)
			})
		}
	}
	return (
		<section>
			<div className="container">
				<div className="row">
					<div className="col-sm-9">
						<div className="blog-post-area">
							<h2 className="title text-center">Latest From our Blog</h2>
							{renderBlog()}
							<div className="pagination-area">
								<ul className="pagination">
									<li><a href="" className="active">1</a></li>
									<li><a href="">2</a></li>
									<li><a href="">3</a></li>
									<li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Blog