import man1 from '../../images/blog/man-one.jpg'
import man2 from '../../images/blog/man-two.jpg'
import man3 from '../../images/blog/man-three.jpg'
import man4 from '../../images/blog/man-four.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cmt from './Cmt'
function ListCmt(props) {
    const { arr } = props
    function renderListCmt() {
        if (arr.length > 0) {
            return arr.map((value, index) => {
                if (value.id_comment == 0) {
                    return (
                        <>
                            <li className="media second-media" key={index}>
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={'http://localhost/laravel8/laravel8/public/upload/user/avatar/' + value.image_user} alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>{value.name_user}</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <a className="btn btn-primary" id={value.id} onClick={getIdCha}><i className="fa fa-reply"></i>Replay</a>
                                </div>

                                {arr.map((value1, index) => {
                                    if (value1.id_comment == value.id) {
                                        return (
                                            <li className="media second-media" key={index}>
                                                <a className="pull-left" href="#">
                                                    <img className="media-object" src={'http://localhost/laravel8/laravel8/public/upload/user/avatar/' + value1.image_user} alt="" />
                                                </a>
                                                <div className="media-body">
                                                    <ul className="sinlge-post-meta">
                                                        <li><i className="fa fa-user"></i>{value1.name_user}</li>
                                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                                    </ul>
                                                    <p>{value1.comment}</p>
                                                    <a className="btn btn-primary"><i className="fa fa-reply"></i>Replay</a>
                                                </div>
                                            </li>
                                        )
                                    }
                                })}
                            </li>
                        </>
                    )
                }
            })
        }
    }
    function getIdCha(e) {
        props.GetIdCha(e.target.id)
    }
    return (
        <div className="response-area">
            <h2>{arr.length} RESPONSES</h2>
            <ul className="media-list">
                {renderListCmt()}
            </ul>
        </div>
    )
}

export default ListCmt