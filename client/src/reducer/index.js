import { filterBsYApi } from "../actions"
const ORDER_ASC = 'ORDER_ASC'
 const ORDER_DES= 'ORDER_DES'
const initialState = {
  
    temperaments: [],
   allDogsTemp: [],
   detail: []
}



function rootReducer(state = initialState, action) {
    let arrayAux = [];
    let arrayAux2 = [];
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
               //  dogs: action.payload,
                 //allDogs: action.payload
               allDogsTemp: action.payload
            }
        case 'GET_NAME_DOGS':
            return {
                ...state,
               allDogsTemp: action.payload,
                // dogs: action.payload,

            }
            case 'GET_NAME_DOGS_CREATED':
                return {
                    ...state,
                   allDogsTemp: action.payload,
                    // dogs: action.payload,
                }
        case 'GET_SEARCH_BAR':
            return {
                ...state,
                allDogsTemp: action.payload,
                // dogs: action.payload,
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }

        case 'FILTER_BY_FILTER':
            const allTemp = state.allDogsTemp
            // const allTemp = state.allDogs
            let arr = []
            allTemp.map(e => {
                if (e.temperament !== undefined) {
                    if (e.temperament.includes(action.payload)) {
                        arr.push(e)
                    }
                }
            })

            return {
                ...state,
                allDogsTemp: arr,
                //allDogs: arr,
                // dogs: arr,
            }
            case 'POST_DOGS':
                return{
                    ...state,
                }

        case 'FILTER_CREATED':
            const allDogs = state.allDogsTemp
            // const allDogs = state.allDogs
            const filterDbApi = action.payload === 'created' ? allDogs.filter(e => e.createInDb) : allDogs.filter(e => !e.createInDb)
            return {
                ...state,
               allDogsTemp: filterDbApi
            //    dogs: filterDbApi
            }
    


            case 'ORDER_BY_NAME':
                const sortedName = action.payload === 'A-Z'
                 ? state.allDogsTemp.sort((a, b) => {
                    
                        if (a.name > b.name) {
                          return 1;
                        }
                        if (b.name > a.name) {
                          return -1;
                        }
                        return 0;
                      })
                    : state.allDogsTemp.sort((a, b) => {
                        if (a.name > b.name) {
                          return -1;
                        }
                        if (b.name > a.name) {
                          return 1;
                        }
                        return 0;
                      });
                return {
                  ...state,
                  allDogsTemp: sortedName,
                };

                case 'ORDER_BY_WEIGTH':
                    const sortedWeight = action.payload === 'men'
                      ? state.allDogsTemp.sort((a, b) => {
                       
                           if (parseInt(a.weight_min) > parseInt(b.weight_max)) {
                            //if(a.weight_min > b.weight_max) {
                             
                              return 1;
                            }
                            if (parseInt(b.weight_max) > parseInt(a.weight_min)) {
                              //  if(b.weight_max > a.weight_min) {
                              return -1;
                            }
                            return 0;
                          })
                        : state.allDogsTemp.sort((a, b) => {
                            if (parseInt(a.weight_min) > parseInt(b.weight_max)) {
                                // if(b.weight_max > a.weight_min) {
                              return -1;
                            }
                            if (parseInt(b.weight_max) > parseInt(a.weight_min)) {
                                // if(b.weight_max > a.weight_min) {
                              return 1;
                            }
                            return 0;
                          });
                    return {
                      ...state,
                      allDogsTemp: sortedWeight,
                    };

                    case 'CLEAN_DETAIL':
                      return{
                          ...state,
                          detail: []
                      }

                      case 'GET_DOGS_BY_ID':
                        return{
                            ...state,
                            detail: action.payload
                        }  


        default:
            return state;
    }
}


export default rootReducer;