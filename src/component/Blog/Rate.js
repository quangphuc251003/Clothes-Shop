import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

function Rate(props) {
    const { id } = props
    const [rating, setRating] = useState(0)
    const navigator = useNavigate()
    let userData = JSON.parse(localStorage.getItem('user'))
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    function changeRating(newRating, name) {
        setRating(newRating)
        let isLogin = JSON.parse(localStorage.getItem('isLogin'))
        if (!isLogin) {
            navigator('/login')
        } else {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            }
            const formData = new FormData()
            formData.append('user_id', userData['id'])
            formData.append('blog_id', id)
            formData.append('rate', newRating)

            axios.post(`http://localhost/laravel8/laravel8/public/api/blog/rate/${id}`, formData, config)
                .catch(err => console.log(err))
        }
    }
    useEffect(() => {
        axios.get(`http://localhost/laravel8/laravel8/public/api/blog/rate/${id}`)
            .then(res => {
                let dataRate = res.data.data
                let RateTb = 0
                let tong = 0
                if (Object.keys(dataRate)) {
                    Object.keys(dataRate).map((key, index) => {
                        tong += dataRate[key]['rate']
                    })
                    props.sl(Object.keys(dataRate).length)
                }
                Rate = tong / Object.keys(dataRate).length
                setRating(Rate)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <StarRatings
            rating={rating}
            starRatedColor="yellow"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
        />
    )
}

export default Rate