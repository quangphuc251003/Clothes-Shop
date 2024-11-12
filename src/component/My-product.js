import { useState } from 'react';
import one from '../images/cart/one.png';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function RenderMyProduct(props) {
    let { myProduct } = props
    let user = JSON.parse(localStorage.getItem('user'))
    return Object.keys(myProduct).map((key, index) => {
        let img = JSON.parse(myProduct[key].image)[0]
        return (
            <tr key={index} className='cart_menu'>
                <td className="cart_description">
                    <h4><a href="">{myProduct[key].id}</a></h4>
                </td>
                <td className="cart_description">
                    <h4><a href="">{myProduct[key].name}</a></h4>
                </td>
                <td className="cart_product">
                    <a key={index} href=""><img src={`http://localhost/laravel8/laravel8/public/upload/product/${user.id}/` + img} alt="" /></a>
                   
                </td>
                <td className="cart_price">
                    <p>${myProduct[key].price}</p>
                </td>
                <td className="cart_total" style={{display:'flex', justifyContent:'space-around'}}>
                    <Link to={'/account/editproduct/' + myProduct[key].id}>edit</Link>
                    <a onClick={() => DeleteProduct({id: myProduct[key].id})} >delete</a>
                </td>
            </tr>
        )
    })
}
function DeleteProduct(props){
    let {id} = props
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + userToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
    };
    axios.get(`http://localhost/laravel8/laravel8/public/api/user/product/delete/${id}`, config)
    .then(res => RenderMyProduct(res.data.data))
    .catch(err => console.log(err))
}
function MyProduct() {
    const [myProduct, setMyProduct] = useState([])
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + userToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
    };
    useEffect(() => {
        axios.get('http://localhost/laravel8/laravel8/public/api/user/my-product', config)
            .then(res => setMyProduct(res.data.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead style={{ backgroundColor: 'orange', color: "white" }}>
                                    <tr className="cart_menu">
                                        <td className="id">id</td>
                                        <td className="description">name</td>
                                        <td className="image">image</td>
                                        <td className="price">price</td>
                                        <td className="total">action</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    <RenderMyProduct myProduct={myProduct} />
                                </tbody>
                            </table>
                            <button style={{ backgroundColor: 'orange', border: 'none', padding: "10px" }}><Link style={{ color: 'white' }} to='/account/addproduct'>Add New</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyProduct