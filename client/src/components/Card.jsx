import React from "react";


export default function Card({name, image, temperament, id, temperaments}) {
return (
    <div>
        
        <img src={image} alt="img not found" width="200px" height="250px"></img>
        <h3>{name}</h3>
        <h5>{temperament? temperament : temperaments}</h5>
        <h5>{id}</h5>
                               
    </div>
)



}
