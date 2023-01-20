import   React   from "react";

import { useEffect,useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getDogs, getTemperaments, filterTemperaments,filterBsYApi, OrderByName, OrderByWeigth} from '../actions';
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import './SearchBar.css';
import DogCreate from "./DogCreate";




export default function Home(){

    const dispatch = useDispatch()
    const allDogs  = useSelector((state)=> state.allDogsTemp) 
   //  const allDogs  = useSelector((state)=> state.allDogs) 
    console.log(allDogs)     // igual que mapStateToProps
    const allTemp = useSelector((state)=> state.temperaments)
    const [currentPage, setCurrentPage] = useState(1)
    const [dogPerPage, setDogPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogPerPage 
    const indexOffFirstDog = indexOfLastDog - dogPerPage
    const currentDog = allDogs.slice(indexOffFirstDog,indexOfLastDog)  // TRAIGO DEL REDUCER A LOS PERROS y con el metod slice divido de donde hasta donde
    const [order, setOrder]= useState('')
    const [renderDog, setRenderDog]= useState()
    const filteredDogs = useSelector(state=>state.filteredDogs)
    
    useEffect(() => {
      setRenderDog(filteredDogs)
    }, [filteredDogs]) 
    

   useEffect(() => {
      setRenderDog(currentDog)
    }, [dispatch])
    
    useEffect(() => {
       console.log(filteredDogs)
    }, [filteredDogs])
    
   const paginado = (pageNumber) => {
      setCurrentPage (pageNumber)
   }   

  useEffect(()=>{
    dispatch(getDogs());
    dispatch(getTemperaments());
       }, [dispatch])

       function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
       }

       function handleOrderByWeigth(e){
        e.preventDefault()
        dispatch(OrderByWeigth(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)
       }
       
       function handleFilterTemp(e){
         e.preventDefault()
         dispatch(filterTemperaments(e.target.value))
         setCurrentPage(1)

       }
       function handlefilterBsYApi(e){
         dispatch (filterBsYApi(e.target.value))
       }
       function handleOrderByName (e)  {
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
      //  dispatch(ordenarAsc(e.target.value));
        
       
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`);
      };



       return (
        <div>
        <Link to = '/CrearDogs'> Crear Dog </Link>
        <h1>Pichichos</h1> 
        
         <SearchBar /> 
        
        <button onClick={e=> {handleClick(e)}}>Volver a cargar los perros</button>
           <div>
            <select onChange={(e) => handleOrderByName (e)}>
                {/* <option disabled selected defaultValue >Orden Alfabetico</option> */}
                <option defaultValue >Orden Alfabetico</option>
                <option value='A-Z'>A - Z</option>
                <option value='Z-A'>Z - A</option>
            </select>
            <select onChange={(e)=> handleOrderByWeigth (e)}>
               {/* <option disabled selected defaultValue >Peso</option> */}
               <option  defaultValue >Peso</option>
                <option value='men'>Menor</option>
                <option value='may'>Mayor</option>
            </select>

            <select onChange={e =>handleFilterTemp(e)} >
                  <option value='all'>Temperamentos</option> 
                { allTemp.map((e,i)=>{
                 return (
                    <option key={i}>{e.name}</option>
                 )}
                  )
              }   
            
              </select>  
              
           
                   {/* ver el paginado , el orden alfabetico, terminar el formulario,  */} 
           
            <select onChange={e =>handlefilterBsYApi(e)}>
            <option value='all'>Todos</option>
            <option value='created'>Creados</option>
            <option value='api'>Existente</option>
            </select>
              <Paginado dogPerPage ={dogPerPage}
                        allDogs= {allDogs.length}
                        allTemp= {allTemp.temperaments}
                        paginado ={paginado}   
                        />
          {
            // renderDog && renderDog.map((e,i)=>{
               currentDog && currentDog.map((e,i)=>{
                return(
                   <div key={i}>
                    <Link to={'/dogs/' + e.id} >
                    <Card name={e.name} temperament={e.temperament? e.temperament: e.temperaments} image={e.image} />
                   </Link>
                   </div>
                )
          })}
          
           </div>
        </div>
        )}
        
        
        
        
        
    
        