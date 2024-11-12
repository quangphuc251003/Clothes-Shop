import axios from "axios"
import { data, get } from "jquery"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Cmt(props){
    const {id} = props
    const {idCha} = props
    const [getCmt, setCmt] = useState('')
    const [error , setError] =useState('')
    let navigator = useNavigate()
    const handleText = (e) =>{
         setCmt(e.target.value)
    }

    function HandleSubmit(){
        let isLogin = JSON.parse(localStorage.getItem('isLogin'))
        if(!isLogin){
            alert('Vui long dang nhap')
            navigator('/login')
        }else{
            let userData = JSON.parse(localStorage.getItem('user'))
            let userToken = JSON.parse(localStorage.getItem('userToken'))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            };

        if(getCmt != ''){
                const formData = new FormData();
                formData.append('id_blog', id)
                formData.append('id_user', userData['id'])
                formData.append('id_comment', idCha ? idCha : 0)
                formData.append('comment', getCmt)
                formData.append('image_user', userData['avatar'])
                formData.append('name_user', userData['name'])

                axios.post(`http://localhost/laravel8/laravel8/public/api/blog/comment/${id}`,formData , config )
                .then(res =>
                    
                    props.getCmtt(res.data.data),
                    setCmt('')
                )
                .catch(error => console.log(error))
            }else{
               setError('Vui long nhap binh luan')
            }
        }
    }
   return (
    <div className="replay-box">
    <div className="row">
        <div className="col-sm-12">
            <h2>Leave a replay</h2>
            
            <div className="text-area">
                <div className="blank-arrow">
                    <label>Your Name</label>
                </div>
                <span>*</span>
                <textarea name="message" rows="11" value={getCmt} onChange={handleText}></textarea>
                <a className="btn btn-primary" onClick={HandleSubmit}>post comment</a>
                <p>{error}</p>
            </div>
        </div>
    </div>
</div>
   )
}

export default Cmt