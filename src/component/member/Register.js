import axios from "axios"
import { useState } from "react"
function Resgister(){
    const [getRegist, setRegist] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        level: 0
    })
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setRegist(state => ({ ...state, [nameInput]: valueInput }))
    }
    const handleInputFile = (e) => {
        const file = e.target.files
        let reader = new FileReader()
        reader.onload = (e) => {
            setRegist(state => ({
                ...state,
                avatar: e.target.result,
                file: file[0]
            }))
        }
        reader.readAsDataURL(file[0])
    }
    function handldeRegis(e) {
        e.preventDefault();
        let errorsSubmit = {}
        let flag = true

        var regexNumber = /^[0-9]*\d$/
        if (getRegist.name.trim() == '') {
            errorsSubmit.name = 'Vui long nhap name'
            flag = false
        } else if (regexNumber.test(getRegist.name.trim())) {
            errorsSubmit.nameIsNumber = 'Name khong duoc la so'
            flag = false
        }
        else {
            delete errorsSubmit.name
            delete errorsSubmit.nameIsNumber
            flag = true
        }
        var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (getRegist.email.trim() == '' || !(regexEmail.test(getRegist.email.trim()))) {
            errorsSubmit.email = 'vui long nhap email'
            flag = false
        } else {
            delete errorsSubmit.email
            flag = true
        }
        if (getRegist.password.trim() == '') {
            errorsSubmit.password = 'Vui long nhap pass'
            flag = false
        } else {
            delete errorsSubmit.password
            flag = true
        }
        var regexPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        if (getRegist.phone.trim() == '' || !regexPhone.test(getRegist.phone.trim())) {
            errorsSubmit.phone = 'Vui long nhap phone'
            flag = false
        } else {
            delete errorsSubmit.phone
            flag = true
        }
        if (getRegist.address.trim() == '') {
            errorsSubmit.address = 'Vui long nhap Address'
            flag = false
        } else {
            delete errorsSubmit.address
            flag = true
        }
        if (getRegist.avatar == '') {
            errorsSubmit.avatar = 'Vui long bo anh vao'
            flag = false
        } else {
            var duoiFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
            var a = getRegist.file['name'].split(".")[1]
            if (getRegist.file.size > 1024 * 1024) {
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

        if (!flag) {
            setErrors(errorsSubmit)
        } else {
            axios.post('http://localhost/laravel8/laravel8/public/api/register', getRegist)
                .then(res => {
                    if(res.data.errors){
                        setErrors(res.data.errors)
                    }else{
                        alert("thanh cong")
                    }
                })
                .catch(error => console.log(error))
        }
    }
     return (
        <div className="signup-form">
        <h2>New User Signup!</h2>
        <form encType="multipart/form-data" onSubmit={handldeRegis}>
            <input type="text" placeholder="Name" name="name" onChange={handleInput} />
            <p>{errors.name}</p>
            <p>{errors.nameIsNumber}</p>
            <input type="email" placeholder="Email" name="email" onChange={handleInput} />
            <p>{errors.email}</p>
            <input type="password" placeholder="Password" name="password" onChange={handleInput} />
            <p>{errors.password}</p>
            <input type="text" placeholder="xxx-xxx-xxxx" name="phone" onChange={handleInput} />
            <p>{errors.phone}</p>
            <input type="text" placeholder="Address" name="address" onChange={handleInput} />
            <p>{errors.address}</p>
            <input type="file" name="avatar" onChange={handleInputFile} />
            <p>{errors.avatar}</p>
            <button type="submit" className="btn btn-default">Signup</button>
        </form>
    </div>
     )
}

export default Resgister