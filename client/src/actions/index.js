import axios from 'axios';
 
const ORDER_ASC = 'ORDER_ASC'
 const ORDER_DES= 'ORDER_DES'

export  function getDogs(){
    return async function(dispatch){
        var json = await axios ("http://localhost:3001/dogs")
           
        return dispatch({            
            type: 'GET_DOGS',
            payload: json.data,
        })

    }


 
}export  function getNameDog(){
    return async function(dispatch){
        var json = await axios ("http://localhost:3001/dogs")
           
        return dispatch({            
            type: 'GET_NAME_DOGS',
            payload: json.data,
        })

    }} 
    export function postDogs(payload){
        return async function(dispatch){
           const json = await axios.post("http://localhost:3001/dogs",payload)
           return json;}
           
        
        



    }
  export function getTemperaments(){
    return async function(dispatch){
        var json = await axios ("http://localhost:3001/temperaments")

        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data

        })
    }

    
  }
  export function getNameDogs(name){
    console.log('asd ')
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({type:'GET_NAME_DOGS', payload: json.data});   
        }catch (error) {
            console.log(error) }
            }
  }
  export function filterTemperaments (payload){
    return {
        type: 'FILTER_BY_FILTER',
        payload
    }

  }


  export function filterBsYApi(payload){
        return {
            type: 'FILTER_CREATED',
            payload

            }

  }
                               
  export function OrderByName(payload) {
    return { 
        type: 'ORDER_BY_NAME',
        payload
    }

};

export function OrderByWeigth(payload) {
    return { 
        type: 'ORDER_BY_WEIGTH',
        payload
    }
};

//---------------------------------------------------------------------------------



export function cleanDetail(){
    return{
        type: 'CLEAN_DETAIL'
    }
}
//---------------------------------------------------------------------------------

export function getDogsByParams(id){
    return async function (dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/dogs/${id.id}`)
            return dispatch({
                type: 'GET_DOGS_BY_ID',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


    export function getNameDogsCreated (name){
        return async function (dispatch) {
            try{
                var json= await axios.get( "http://localhost:3001/dogs?name=" + name);
                return dispatch({type:'GET_NAME_DOGS_CREATED', payload: json.data});   
            }catch (error) {
                console.log(error) }
                }
            

        }
    
