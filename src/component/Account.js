import { useEffect, useState } from "react"
import MenuAcc from "./MenuAccount"
import axios from "axios"
function Account() {
    const [errors, setErrors] = useState({})
    let userData = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        level: 0
    })
    useEffect(() =>{
        if(userData){
            setUser({
                name: userData.name,
                email: userData.email,
                address: userData.address,
                phone: userData.phone,
            });
        }
    }, [])
    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setUser(state => ({ ...state, [nameInput]: valueInput }))
    }
    const handleInputFile = (e) => {
        const file = e.target.files
        let reader = new FileReader()
        reader.onload = (e) => {
            setUser(state => ({
                ...state,
                avatar: e.target.result,
                file: file[0]
            }))
        }
        reader.readAsDataURL(file[0])
    }
    const handleUpdate = (e) =>{
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        var regexNumber = /^[0-9]*\d$/
        if (user.name.trim() == '') {
            errorsSubmit.name = 'Vui long nhap name'
            flag = false
        } else if (regexNumber.test(user.name.trim())) {
            errorsSubmit.nameIsNumber = 'Name khong duoc la so'
            flag = false
        }
        else {
            delete errorsSubmit.name
            delete errorsSubmit.nameIsNumber
            flag = true
        }
        var regexPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        if (user.phone.trim() == '' || !regexPhone.test(user.phone.trim())) {
            errorsSubmit.phone = 'Vui long nhap phone'
            flag = false
        } else {
            delete errorsSubmit.phone
            flag = true
        }
        if (user.address.trim() == '') {
            errorsSubmit.address = 'Vui long nhap Address'
            flag = false
        } else {
            delete errorsSubmit.address
            flag = true
        }
        if(user.avatar){
            var duoiFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
            var a = user.file['name'].split(".")[1]
            if (user.file.size > 1024 * 1024) {
                errorsSubmit.avatar = 'anh phai co size <= 1mb'
                flag = false
            } else if (!duoiFile.includes(a)) {
                errorsSubmit.avatar = 'anh k duoc dinh dang'
                flag = false
            } else {
                delete errorsSubmit.avatar
                flag = true
            }
        }


        if(!flag){
            setErrors(errorsSubmit)
        }else{
            let userToken = JSON.parse(localStorage.getItem('userToken'))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            };
            const formData = new FormData();
                formData.append('name', user.name)
                formData.append('email', user.email)
                formData.append('password', user.password ? user.password : "")
                formData.append('phone', user.phone)
                formData.append('address', user.address)
                formData.append('avatar', user.avatar ? user.avatar : "")
            axios.post(`http://localhost/laravel8/laravel8/public/api/user/update/${userData.id}`, formData, config )
            .then(res => {
                alert('Update thanh cong')
                localStorage.setItem('user', JSON.stringify(res.data.Auth))

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
                            <h2 className="title text-center">Update user</h2>
                            <div className="signup-form">
                                <form encType="multipart/form-data" onSubmit={handleUpdate}>
                                    <input type="text" placeholder="Name" name="name" value={user.name} onChange={handleInput}/>
                                    <p>{errors.name}</p>
                                    <p>{errors.nameIsNumber}</p>
                                    <input type="email" readOnly placeholder="Email" name="email" value={user.email} onChange={handleInput}/>
                                    <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                                    <input type="text" placeholder="xxx-xxx-xxxx" name="phone" value={user.phone} onChange={handleInput}/>
                                    <p>{errors.phone}</p>
                                    <input type="text" placeholder="Address" name="address" value={user.address} onChange={handleInput}/>
                                    <p>{errors.address}</p>
                                    <input type="file" name="avatar" onChange={handleInputFile}/>
                                    <p>{errors.avatar}</p>
                                    <button type="submit" className="btn btn-default">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Account