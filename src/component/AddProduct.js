import axios from "axios"
import { useEffect, useState } from "react"

function AddProduct() {
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    const [status, setStatus] = useState(1)
    const [err, setErr] = useState({})
    const [files, setFile] = useState({})
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company_profile: '',
        detail: '',
        status: '1',
        sale: '',
    })
    useEffect(() => {
        axios.get('http://localhost/laravel8/laravel8/public/api/category-brand')
            .then(res => {
                setCategory(res.data.category)
                setBrand(res.data.brand)
            })
            .catch(err => console.log(err))
    }, [])
    function RenderCategory() {
        return (
            <select name="category" onChange={HandleInput}>
                <option value='' selected disabled>
                    Please choose category
                </option>
                {category.map((value, index) => (
                    <option value={value.id} key={index}>{value.category}</option>
                ))}
            </select>
        )
    }
    function RenderBrand() {
        return (
            <select name="brand" onChange={HandleInput}>
                <option value='' selected disabled>
                    Please choose brand
                </option>
                {brand.map((value, index) => (
                    <option value={value.id} key={index}>{value.brand}</option>
                ))}
            </select>
        )
    }
    function HandleStatus(e) {
        setStatus(e.target.value)
        setProduct(state => ({ ...state, [e.target.name]: e.target.value }))
    }
    function HandleInput(e) {
        let nameInput = e.target.name
        let valueInput = e.target.value
        setProduct(state => ({ ...state, [nameInput]: valueInput }))
    }

    const handleInputFile = (e) => {
        let file = e.target.files
        setFile(file)
    }
    function HandleSubmit(e) {
        e.preventDefault();
        let errSubmit = {}
        let flag = true

        if (product.name === '') {
            errSubmit.name = 'name k duoc de trong'
            flag = false
        } else {
            delete errSubmit.name
            flag = true
        }

        if (product.price === '') {
            errSubmit.price = 'price k duoc de trong'
            flag = false
        } else {
            delete errSubmit.price
            flag = true
        }

        if (product.category === '') {
            errSubmit.category = 'category k duoc de trong'
            flag = false
        } else {
            delete errSubmit.category
            flag = true
        }

        if (product.brand === '') {
            errSubmit.brand = 'brand k duoc de trong'
            flag = false
        } else {
            delete errSubmit.brand
            flag = true
        }

        if (product.sale === '') {
            errSubmit.sale = 'sale k duoc de trong'
            flag = false
        } else {
            delete errSubmit.sale
            flag = true
        }

        if (Object.keys(files).length > 3) {
            errSubmit.filesLength = 'toi da la 3 anh'
        } else if (Object.keys(files).length === 0) {
            errSubmit.filesLength = 'phai co anh'
        } else {
            var duoiFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
            Object.keys(files).map((key, index) => {
                if (files[key].size > 1024 * 1024) {
                    errSubmit.size = 'anh phai co size <= 1mb'
                    flag = false
                } else if (!duoiFile.includes((files[key].name).split(".")[1])) {
                    errSubmit.fileDD = 'anh k duoc dinh dang'
                    flag = false
                } else {
                    delete errSubmit.size
                    delete errSubmit.fileDD
                    flag = true
                }
            })
        }

        if (!flag) {
            setErr(errSubmit)
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
            formData.append('name', product.name)
            formData.append('price', product.price)
            formData.append('category', product.category)
            formData.append('brand', product.brand)
            formData.append('company_profile', product.company_profile)
            formData.append('detail', product.detail)
            formData.append('status', product.status)
            formData.append('sale', product.sale)

            console.log(product);

            Object.keys(files).map((key,index) =>{
                formData.append('file[]', files[key])
            })

            axios.post('http://localhost/laravel8/laravel8/public/api/user/product/add', formData , config)
            .then(res => {
                alert('thanh cong')
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
                                <form action="/action_page.php" onSubmit={HandleSubmit}>
                                    <input type="text" placeholder="Name" name="name" onChange={HandleInput} />
                                    <p>{err.name}</p>
                                    <input type="text" placeholder="Price" name="price" onChange={HandleInput} />
                                    <p>{err.price}</p>
                                    {RenderCategory()}
                                    <p>{err.category}</p>
                                    {RenderBrand()}
                                    <p>{err.brand}</p>
                                    <select onChange={HandleStatus} name="status" >
                                        <option value={1}>New</option>
                                        <option value={0}>Sale</option>
                                    </select>
                                    {status == 0 ? (
                                        <>
                                            <div style={{ display: "flex", alignItems: 'center' }}>
                                                <input style={{ width: '20%' }} type="text" placeholder="0" name='sale' onChange={HandleInput} />
                                                <span style={{ fontSize: '20px' }}>%</span>
                                            </div>
                                            <p>{err.sale}</p>
                                        </>
                                    ) : null}
                                    <input type="text" placeholder="Company profile" name="company" onChange={HandleInput} />
                                    <input type="file" id="files" name="files" multiple onChange={handleInputFile} />
                                    <p>{err.filesLength}</p>
                                    <p>{err.size}</p>
                                    <p>{err.fileDD}</p>
                                    <textarea placeholder="Detail" onChange={HandleInput} name="detail" />
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

export default AddProduct