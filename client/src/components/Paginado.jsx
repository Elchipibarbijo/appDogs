import React from "react";

export default function Paginado ({dogPerPage, allDogs, paginado }){

     const pageNumber = []

     for (let i = 1; i <= Math.ceil(allDogs/dogPerPage); i++){
        pageNumber.push(i)
     } 


     return (
        <nav>
            <ul className="paginado">
                {pageNumber && pageNumber.map(number =>(
                
                    <button className="paginado" key={number} onClick={()=> paginado(number) } >{number} </button> 
                    
                ))}
            </ul> 
        </nav>
     )
  
}