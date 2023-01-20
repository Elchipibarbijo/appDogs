import React, {useEffect, useState} from "react";
import { Link,useHistory } from "react-router-dom";
import { postNameDogs, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function DogCreate (){
    const dispatch = useDispatch();
    const temperaments = useSelector((state)=>state.temperaments)

    const [input,setInput] =useState({
        name:"",
        weigth_min:"",
        weigth_max:"",
        heigth_min:"",
        heigth_max:"",
        life_span:"",
        image: "",
        temperaments:[],
   })


   function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value    
    })
    console.log(input)
   }

   function handleCheck(e){
    if(e.target.checked){
        setInput({
            ...input,
            temperaments: e.target.value,
        })
    }
   }

   function handleSelect(e){
    setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value]
    })
   }

   useEffect(()=> {
    dispatch(getTemperaments())
     
   },[]);
    return (
        <div>
            <Link to='/home'><button>Volver</button></Link> 
            <h1>Crea a tu pichicho</h1>
            <form>
                <div>
                    <label>Nombre: </label>
                        <input 
                        type='text'
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                        />
                        </div>
                    <div>
                    <label>Peso: </label>
                    <input
                     type='text'
                     value={input.weigth}
                     name="weigth"
                     
                     onChange={handleChange}/>
                     
                    </div>
                    <div>
                    <label>Altura: </label>
                    <input
                       type='text'
                       value={input.heigth}
                       name="heigth"
                       onChange={handleChange}/>
                    </div>
                    <div>
                    <label onChange={(e)=> handleSelect(e)}>Temperamentos: </label> 
                        
                        <select>
                            {temperaments.map((t)=>(
                            <option value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    
                    </div>
                    <div>
                        <label>Imagen: </label>
                        <input
                       type='text'
                       value={input.image}
                       name="image"
                       onChange={handleChange} />
                    </div>
                          
                    <button type="summit">Crear perro</button>
                
            </form>
        </div>
    )
}