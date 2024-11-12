import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

function EditProduct(props) {
    let params = useParams()
    let navigator = useNavigate()
    const [myProduct, setMyProduct] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        detail: '',
    })
    console.log(myProduct);
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    const [avatarCheckbox, setAvatarCheckbox] = useState([])
    const [errors , setErrors] = useState({})
    const [files, setFile] = useState({})
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + userToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
    };
    useEffect(() => {
        axios.get(`http://localhost/laravel8/laravel8/public/api/user/product/${params.id}`, config)
            .then(res => setMyProduct({
                name: (res.data.data).name,
                price: (res.data.data).price,
                company_profile: (res.data.data).company_profile,
                detail: (res.data.data).detail,
                image: (res.data.data).image,
                category: (res.data.data).id_category,
                brand: (res.data.data).id_brand
            }))
            .catch(err => console.log(err))
        axios.get('http://localhost/laravel8/laravel8/public/api/category-brand')
            .then(res => {
                setCategory(res.data.category)
                setBrand(res.data.brand)
            })
            .catch(err => console.log(err))
    }, [])
    const handleInputFile = (e) => {
        let file = e.target.files
        setFile(file)
    }
    function RenderCategory() {
        return (
            <select name="category" onChange={HandleInput}>
                {category.map((value, index) => {
                    if (value.id == myProduct.id_category) {
                        return (
                            <option value={value.id} key={value.id}>{value.category}</option>
                        )
                    } else {
                        return (
                            <option value={value.id} key={value.id}>{value.category}</option>
                        )
                    }
                })}
            </select>
        )
    }
    function RenderBrand() {
        return (
            <select name="brand" onChange={HandleInput}>
                {brand.map((value, index) => {
                    if (value.id == myProduct.id_brand) {
                        return (
                            <option value={value.id} key={value.id}>{value.brand}</option>
                        )
                    } else {
                        return (
                            <option value={value.id} key={value.id}>{value.brand}</option>
                        )
                    }
                })}
            </select>
        )
    }
    function RenderImg() {
        let user = JSON.parse(localStorage.getItem('user'))
        if (myProduct.image) {
            return (
                <div style={{ display: 'flex' }}>
                    {myProduct.image.map((value, index) => {
                        return (
                            <div key={index}>
                                <img src={`http://localhost/laravel8/laravel8/public/upload/product/${user.id}/` + value} />
                                <input name={value} type="checkbox" value={value} onChange={(e) => IsChecked(e)} />
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
    function IsChecked(e) {
        if (e.target.checked == true) {
            setAvatarCheckbox(state => [...state,e.target.value])
        } else {
            setAvatarCheckbox((state) => state.filter((item) => item !== e.target.value))
        }
    }
    function HandleInput(e) {
        let nameInput = e.target.name
        let valueInput = e.target.value
        setMyProduct(state => ({ ...state, [nameInput]: valueInput }))
    }
    function HandleSubmit(e) {
        e.preventDefault();
        let errSubmit = {}
        let flag = true
        if (!flag) {
            setErrors(errSubmit)
        } else {
            let userToken = JSON.parse(localStorage.getItem('userToken'))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            };
            let formData = new FormData()
            formData.append('name', myProduct.name)
            formData.append('price', myProduct.price)
            formData.append('category', myProduct.category)
            formData.append('brand', myProduct.brand)
            formData.append('company', myProduct.company)
            formData.append('detail', myProduct.detail)
            // formData.append('avatarCheckBox[]', avatarCheckbox)
            Object.keys(files).map((key,index) =>{
                formData.append('file[]', files[key])
            })
            avatarCheckbox.map((value,index) =>{
                formData.append('avatarCheckBox[]', value)
            })

            axios.post(`http://localhost/laravel8/laravel8/public/api/user/product/update/${params.id}`, formData , config)
            .then(res => {
                alert('thanh cong')
                navigator('/account/myproduct')
            })
            .catch(err => console.log(err))

        }
    }
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Add product</h2>
                            <div className="signup-form">
                                <h2>Create product!</h2>
                                <form onSubmit={HandleSubmit}>
                                    <input type="text" placeholder="Name" name="name" value={myProduct.name} onChange={HandleInput}/>
                                    <input type="text" placeholder="Price" name="price" value={myProduct.price} onChange={HandleInput}/>
                                    {RenderCategory()}
                                    {RenderBrand()}
                                    <input type="text" placeholder="Company profile" name="company_profile" value={myProduct.company_profile} onChange={HandleInput}/>
                                    <input type="file" id="files" name="files" multiple onChange={handleInputFile}/>
                                    {RenderImg()}
                                    <textarea placeholder="Detail" name="detail" value={myProduct.detail} onChange={HandleInput}/>
                                    <button type="submit" className="btn btn-default">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default EditProduct