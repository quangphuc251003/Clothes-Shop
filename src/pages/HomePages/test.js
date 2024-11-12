import { useSelector } from "react-redux";
import React from "react";
function Test(props){
    const hobbList = useSelector(state => state.hobby.qty)
    console.log(hobbList);
    const renderList = () => {
        return hobbList.map((value,index) =>{
            return <li key={index}>{value}</li>
        })
    }

    return (
      <ul>
        {renderList()}
      </ul>
    )
}

export default Test