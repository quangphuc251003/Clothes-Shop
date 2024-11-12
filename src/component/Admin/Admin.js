import axios from "axios"
import { useState } from "react"

function Admin() {
    const [blog, setBlog] = useState({
        id_category: '',
        id_brand: '',
        id_user: '',
        name: '',
        image: '',
        price: '',
        status: '',
        sale: '',
        detail: '',
        created_at: '',
        update_at: ''
    })
    const [country, setCountry] = useState({
        name: ''
    })
    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setBlog(state => ({ ...state, [nameInput]: valueInput }))
    }
    const handleInputCountry = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setCountry(state => ({ ...state, [nameInput]: valueInput }))
    }
    const handleInputFile = (e) => {
        const file = e.target.files
        // let reader = new FileReader()
        // reader.onload = (e) => {
        //     setBlog(state => ({
        //         ...state,
        //         image: e.target.result,
        //         // file: file[0]
        //     }))
        // }
        // reader.readAsDataURL(file[0])
        setBlog(state => ({
            ...state, image: file
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        let config = {
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoibmhhdCIsImlhdCI6MTcyMzI4NTc5NywiZXhwIjoxNzIzMzAzNzk3fQ.o8q1OTpgBQUG_7qmcT06GD6ILFHQRx19utv9fIIJluM",
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        };
        const formData = new FormData()
        formData.append('id_category', 1)
        formData.append('id_brand', 2)
        formData.append('id_user', 8)
        formData.append('name', 'nhat')
        // formData.append('image', blog.image)
        formData.append('price', 8000)
        formData.append('status', 0)
        formData.append('sale', 0)
        formData.append('detail', 'product new')
        formData.append('created_at', '2023-08-08 12:34:56')
        formData.append('update_at', '2023-08-08 12:34:56')
        console.log(blog)
        Object.keys(blog.image).map((key,index) =>{
            formData.append('image', blog.image[key])
        })
        axios.get('http://localhost:4000/api/product/cart')
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    const obj = {
        1:30,
    }
    const handleSubmitCountry = (e) => {
        e.preventDefault();
        console.log(obj);
        axios.get('http://localhost:4000/api/product/cart', obj)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    return (
        <>
            <h1>Member</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                {/* name: <input type="text" name="name" onChange={handleInput}></input>
                email: <input type="text" name="email" onChange={handleInput}></input>
                password: <input type="text" name="password" onChange={handleInput}></input>
                phone: <input type="text" name="phone" onChange={handleInput}></input>
                address: <input type="text" name="address" onChange={handleInput}></input>
                country: <input type="text" name="country" onChange={handleInput}></input>
                levl: <input type="text" name="levl" onChange={handleInput}></input> */}
                image: <input type="file" name="files" multiple onChange={handleInputFile}></input>
                <button type="submit" className="btn btn-default">Signup</button>
            </form>

            <h1>Country</h1>
            <form onSubmit={handleSubmitCountry}>
                <button type="submit" className="btn btn-default">Signup</button>
            </form>
        </>
    )
}

export default Admin