const axios = require('axios');
const {Dog, Temperament} = require('../db');
const { API_KEY } = process.env;

const getApiInfo = async () => {
    try{
        let apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let dogs = await apiInfo.data.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: `${dog.height.metric} CM`,
                weight:`${dog.weight.metric} KG`,
                lifeSpan: dog.life_span,
                breedGroup: dog.breed_group,
                temperament: dog.temperament? dog.temperament : "",
                image: dog.image.url
            }
        });
        // console.log("SOY DOG: ", dogs);
        return dogs
    } catch (error){
        console.log("Something went wrong", error)
    }
};

const getDbInfo = async () => {
    try {
        let db = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: { attributes: []}
            }
        })
        // console.log('Soy DB: ', db)
        return db
    } 
    catch (error) {
        console.log("Something went wrong, ", error)
    }
};

const getMixedInfo = async () => {

    try {
        let apiInfo = await getApiInfo();
        let dbInfo = await getDbInfo();

        let allInfo = Promise.all([...apiInfo,...dbInfo])
        return await allInfo;
    } catch (error) {
        console.log("Something went wrong, ", error)
    }
};

const getAllTemps = async (req, res) => {
    const {temp} = req.query;

    try {
        if (temp){
            // const apiDogs = await getApiInfo();
            // const apiDogsFiltrados = apiDogs.filter(dog => dog.temperament.includes(temp));
        
            // const dogsDb = await Dog.findAll({
            //     include: {
            //         model: Temperament,
            //         where: {
            //             name: temp
            //         }
            //     }
            // })

            // const allFilterDogs = apiDogsFiltrados.concat(dogsDb);
            
            const apiDogs = await getMixedInfo();
            const apiDogsFiltrados = apiDogs.filter(dog => dog.temperament.includes(temp));

            apiDogsFiltrados.length > 0 ? res.status(200).json(apiDogsFiltrados) : res.status(400).send(`No se encontraron dogs con el temperamento ${temp}`);
        } else {
            const tempsApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            let tempsSinDividir = tempsApi.data.map(dog => dog.temperament);
            // console.log("Hola Soy TEMPS", tempsSinDividir)
            let tempsFinal = tempsSinDividir.toString().replace(/ /g, "").split(',');
            
            tempsFinal.forEach(temp => {
                Temperament.findOrCreate({
                    where: { name: temp }
                })
            })

            const allTemperaments = await Temperament.findAll();
            // console.log ("HOLA SOY allTemperaments", allTemperaments)
            res.json(allTemperaments);
        }
    } catch (error) {
        console.log("Something went wrong, ", error)
    }  
};

module.exports = {
    getApiInfo, getDbInfo, getMixedInfo, getAllTemps
}