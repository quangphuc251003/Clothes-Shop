import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function RenderError(props){
    let {error} = props
    if(Object.keys(error).length > 0){
        return Object.keys(error).map((key,index) =>{
            return <li>{error[key]}</li>
        })
    }
}
function Login() {
    const navigate = useNavigate()
    const [getLogin, setLogin] = useState({
        email: '',
        password: '',
        level: 0
    })
    const [erros , setErros] = useState({})
    function handleInput(e){
        let nameInput = e.target.name
        let valueInput = e.target.value
        setLogin(state => ({...state, [nameInput]:valueInput}))
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorsSubmit = {}
        let flag = true
        
        var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (getLogin.email.trim() == '' || !(regexEmail.test(getLogin.email.trim()))) {
            errorsSubmit.email = 'vui long nhap email'
            flag = false
        } else {
            delete errorsSubmit.email
            flag = true
        }

        if (getLogin.password.trim() == '') {
            errorsSubmit.password = 'Vui long nhap pass'
            flag = false
        } else {
            delete errorsSubmit.password
            flag = true
        }

        if(!flag){
            setErros(errorsSubmit)
        }else{
            axios.post('http://localhost/laravel8/laravel8/public/api/login', getLogin)
            .then(res =>{
                if(res.data.errors){
                    setErros(res.data.errors)
                }else{
                    localStorage.setItem('isLogin' , JSON.stringify(true))
                    localStorage.setItem('user', JSON.stringify((res.data)['Auth']))
                    localStorage.setItem('userToken', JSON.stringify((res.data)['token']))
                    alert("thanh cong")
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
        }

    }
    return (
        <div className="login-form">
            <h2>Login to your account</h2>
            <ul>
               <RenderError error = {erros} />
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Emai" name="email" onChange={handleInput}/>
                <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                <span>
                    <input type="checkbox" className="checkbox" />
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
            </form>
        </div>
    )
}

export default Login