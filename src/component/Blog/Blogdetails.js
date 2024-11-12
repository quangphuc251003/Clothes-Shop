import shipping from '../../images/home/shipping.jpg';
import blog1 from '../../images/blog/blog-one.jpg'
import man1 from '../../images/blog/man-one.jpg'
import man2 from '../../images/blog/man-two.jpg'
import man3 from '../../images/blog/man-three.jpg'
import man4 from '../../images/blog/man-four.jpg'
import social from '../../images/blog/socials.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cmt from './Cmt';
import ListCmt from './ListCmt';
import Rate from './Rate';
function BlogDetails(props) {
        let params = useParams();
        const [getDetails, setDetails] = useState('')
		const [getListCmt, setListCmt] = useState([])
		const [getIdCha, setIdCha] = useState('')
        useEffect(() => {
            axios.get('http://localhost/laravel8/laravel8/public/api/blog/detail/' + params.id)
            .then(res =>{
                setDetails(res.data.data)
				setListCmt(res.data.data.comment)
            })
        }, [])
        function renderDetail(){
            if(Object.keys(getDetails).length >0 ){
                return (
                    <div className="single-blog-post">
                            <h3>{getDetails.title}</h3>
                            <div className="post-meta">
                                <ul>
                                    <li><i className="fa fa-user"></i> Mac Doe</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                            </div>
                            <a href="">
                                <img src={'http://localhost/laravel8/laravel8/public/upload/Blog/image/' + getDetails.image} alt="" />
                            </a>
                            {getDetails.content}
                            <div className="pager-area">
                                <ul className="pager pull-right">
                                    <li><a href="#">Pre</a></li>
                                    <li><a href="#">Next</a></li>
                                </ul>
                            </div>
                        </div>
                )
            }
        }
        function getCmtt(data){
			setListCmt(getListCmt.concat(data))
		}
		function GetIdCha(idCha){
			setIdCha(idCha)
		}
        const [slRate, setSlRate] = useState(0)
        function SluongRate(sl){
            setSlRate(sl)
        }
    return (
        <section>
		<div className="container">
			<div className="row">
				<div className="col-sm-9">
					<div className="blog-post-area">
						<h2 className="title text-center">Latest From our Blog</h2>
                        {renderDetail()}
					</div>

					<div className="rating-area">
						<ul className="ratings">
							<li className="rate-this">Rate this item:</li>
							<li><Rate id={params.id} sl={SluongRate}/></li>
							<li className="color">({slRate} rates)</li>
						</ul>
						<ul className="tag">
							<li>TAG:</li>
							<li><a className="color" href="">Pink <span>/</span></a></li>
							<li><a className="color" href="">T-Shirt <span>/</span></a></li>
							<li><a className="color" href="">Girls</a></li>
						</ul>
					</div>
                    <div className="socials-share">
						<a href=""><img src={social} alt=""/></a> 
					</div>
                    <ListCmt arr={getListCmt} GetIdCha={GetIdCha} idCha={getIdCha}/>
                    <Cmt  id={params.id} getCmtt={getCmtt} idCha={getIdCha}/>
				</div>	
			</div>
		</div>
	</section>


    )
}
export default BlogDetails