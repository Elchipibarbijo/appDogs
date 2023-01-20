const axios = require('axios');
const {Dog, Temperament} = require ('../db'); 
const {API_KEY} =process.env;

let apiKey = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

// const router= Router();

//// ---------------------------------------- TRAER INFO DE LA API --------------------------------------------------
const getApiInfo = async (req,res) => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const infoApi = await apiUrl.data.map(e => {
    return {
    
        id: e.id,
            name: e.name,
            height_min: e.height.metric.split(' - ')[0] && e.height.metric.split(' - ')[0],
            height_max: e.height.metric.split(' - ')[1] && e.height.metric.split(' - ')[1],
            weight_min: e.weight.metric.split(' - ')[0] && e.weight.metric.split(' - ')[0],
            weight_max: e.weight.metric.split(' - ')[1] && e.weight.metric.split(' - ')[1],
            life_span_min: e.life_span.split(' - ')[0] && e.life_span.split(' - ')[0],
            life_span_max: e.life_span.split(' - ')[1] && e.life_span.split(' - ')[1],
            image: e.image.url,
            temperament: e.temperament


        }
    });
 return infoApi
}

//// -------------------------------------------- GUARDAR EN BS DE DT -----------------
const getDbInfo = async () =>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes: [],
        },}})
      
    
 }
 const getAllDogs = async ()=> {
    const apiInfo = await getApiInfo();
    const  DbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(DbInfo);
    return infoTotal;

 }
 const  dogTotalf = async (req,res)=>{   
             const {name} = req.query
             const dogsTotal = await getAllDogs();
             if (name){
                 let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())) 
                 dogsName ? res.status(200).send(dogsName) : res.status(400).send('Canino no encontrado :(');
             }else{
                  res.status(200).send(dogsTotal)
             }}
  /// -------------------------------- OBTENER PERROS POR ID -------------------------------------------------          
    const  dogParams = async (req,res)=>{   
             const {id} = req.params
             const dogsId = await getAllDogs();
             const idFiltro= dogsId.filter(e => e.id == id)
             if (idFiltro.length > 0 ){
                res.status(200).send(idFiltro)    
             }else{
                  res.status(400).send('Pichicho no existe')
             }}

/// --------------------------------- OBTENER TEMPERAMENTOS ----------------------------------------------
   
 // ('https://api.thedogapi.com/v1/breeds'); 
    const tempGet = async (req,res )=>{
        const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const temperaments = tempApi.data.map(e=>e.temperament)
        const temp = temperaments.toString().split(",") // devuelve una cadena como objeto , divide un string como un array
        temp.forEach(e => {
            let i= e.trim() //elimina los espacios en blanco en ambos extremos del string
            Temperament.findOrCreate({     
                where: {name:i}
            })  //este findeOrcreate, busca si no lo encuentra lo crea ya que si existe se duplica
        });

        const allTemp= await Temperament.findAll();
        res.send(allTemp)
    }
    // --------------------------------------- CREAR PERRO --------------------------------------------------------------
   

        const createDog = async (req,res)=>{
           const {
                name,
                height_min,
                height_max,
                weight_max,
                weight_min,
                life_span_max,
                life_span_min,
                temperament,
                image,
            }= req.body
             const pichucho = {name,
                height_min,
                height_max,
                weight_max,
                weight_min,
                life_span_max,
                life_span_min,
                image,} 

          
          try { 

            const dogCreated = await Dog.create( pichucho );
             let tempDb = await Temperament.findAll({
                where: {name : temperament}
             })
             dogCreated.addTemperament(tempDb)
             res.status(200).send('Pichucho creado, dr frankentein')
          } catch (error) {
             console.log(error)
          }  
         
        };
      
     // ---------------------------delete--------------------------------

    //  const deleteDog = await DbInfo.findAll({
    //     where: id
    //  })
           
            
     

module.exports={
   
    dogTotalf,
    dogParams,
    tempGet,
    createDog,
   
};