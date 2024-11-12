import { useDispatch } from "react-redux"
import { addNewHobby } from "../../actions/hobby"
import React from "react"
function Index(props){
   const dispatch = useDispatch()
   const handleAddClick = () => {
     const newHobby = 3

     const action = addNewHobby(newHobby)
     dispatch(action)
   }
   return (
     <>
       <button onClick={handleAddClick}>ADD</button>
     </>
   )
}

export default Index