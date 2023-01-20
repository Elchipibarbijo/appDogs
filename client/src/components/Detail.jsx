import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogsByParams, cleanDetail } from '../actions/index'
import { useEffect } from "react";
// import '../css/Detail.css'
// import LogoGif from '../img/LogoGif.gif'
// import img from '../img/defaultCreation.png'


export default function Detail(id){
    const dispatch = useDispatch();
    const perros = useSelector(state => state.detail)
    
    console.log(perros ,'estado local ')
    
    
    useEffect(() =>{
        dispatch(getDogsByParams(id))
    },[dispatch])

    useEffect(() => {
        return function () {
            dispatch(cleanDetail())
        }
    },[dispatch])

return(
    <div >
        <div><button><Link  to='/home'>Volver</Link></button></div>
        {
             perros.length > 0 ?
          
            <div className="cuerpo">
                    <div >
                        <h1 className="tipo">{perros.map(e=>e.name)}</h1>
                      
                    </div>
                    <br/>
                    <div  >
                        <img className="imagen" src={ perros.map(e=>e.image) } alt="logoimg"  />
                       </div>  
                        <div  className="tipo">
                         <h4>Temperamentos:{perros.temperaments? perros.temperaments.map(e=> e.name):perros.map(e=>' '+e.temperament)}</h4> 
                         <h4>Vida: { perros.map(e=>e.life_span_min) + ' - ' + perros.map(e=>e.life_span_max)}</h4>
                         <h4>Peso:{  perros.map(e=>e.weight_min) +' - '+ perros.map(e=>e.weight_max)}</h4>
                         <h4>Altura:{   perros.map(e=>e.height_min) + ' - ' + perros.map(e=>e.height_max)} </h4>
                         
                         {/* <h4>Ataque: {perros.map(e=>e.attack) }        Vida: {perros.map(e=>e.hp)}</h4> */}
                         {/* <h4>Defensa: {perros.map(e=>e.defense)}  Velocidad: {perros.map(e=>e.speed)}</h4> */}
                        </div>  
                                 
             </div> : (
                <div >
                    <h1>Loading...</h1>
                    {/* <img src={LogoGif} alt="logoload" /> */}
                </div> )}
            </div>)}