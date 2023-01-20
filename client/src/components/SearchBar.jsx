import React from 'react';
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getNameDogs } from '../actions/index';

//  function SearchBar({placeholder, data}) {
//   return (
//     <div className='search' >
//         <div className='searchInput'>
//             <input type="text" placeholder={placeholder} />
//             <div className='searchIcon'></div>
//         </div>
//         <div className='dataResult'></div>
//         </div>
//   )
// }

function SearchBar (){
  const dispatch = useDispatch();
  const [name, setName] = useState("")

  function handleInputChange(e){
    e.preventDefault()
    setName (e.target.value) 
    
    
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log(name)
    dispatch( getNameDogs(name))
    setName("")
  }
 
  return (
   <div>
    <input 
    value={name}
      type='text' 
      placeholder='Buscador de pichichos' 
      onChange={(e)=> handleInputChange(e)}/>
      <button onClick={(e) => handleSubmit(e)}>Buscar</button>

   </div>
  )

}

export default SearchBar