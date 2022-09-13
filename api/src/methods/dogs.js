const { Dog, Temperament} = require('../db');
const { getApiInfo, getDbInfo, getMixedInfo} = require('./utils');

const getAllDogs = async (req, res) =>{
    try{
        const allDogs = await getMixedInfo()
        res.status(200).send(allDogs)
    } catch (error) {
        console.log("Something went wrong, ", error)
    }
};

const getAllDogsAndByName = async (req, res) => {
    const {name} = req.query;

    try{
        let totalDogs = await getMixedInfo();
        totalDogs.forEach(obj => obj.name = obj.name.toLowerCase())
        // console.log("Hola soy totalDogs en Minusculas", totalDogs)
        
        if(name){
            let dogName = totalDogs.filter(dog => dog.name.includes(name.toLowerCase()))
            // console.log('Soy DOGNAME', dogName);
            dogName.length > 0 ? res.status(200).json(dogName) : res.status(404).json('Dog no encontrado');
        } else {
            res.status(200).json(totalDogs);
        }
    } catch (error){
        console.log ('Algo ha salido mal: ', error)
    }
};

const getByBreedId = async (req, res) => {
    try{
        // const {id} = Number(req.params);
        const {id} = req.params;
        
        let totalDogs = await getMixedInfo();

        if(id) {
            let dogSearch = totalDogs.filter(dog => dog.id.toString() === id.toString());
            dogSearch.length ? res.status(200).send(dogSearch) : res.status(404).send(`El dog no ha sido encontrado`);
        }
    } catch (error){
        console.log ('Algo ha salido mal: ', error)
    }
};


// const getDogsByTemps = async (req, res) => {
//     const { temp } = req.query;

//     if (temp) {
//         // const dogs = await getMixedInfo();
//         // const allFilterDogs = dogs.filter(dog => dog.temperament.includes(temp));

//         const apiDogs = await getApiInfo();
//         const api_dogs_filtrados = apiDogs.filter(dog => dog.temperament.includes(temp));
        
//         const dogsDb = await Dog.findAll({
//                 include: {
//                     model: Temperament,
//                     where: {
//                         name: temp
//                     }
//                 }
//         })
        
//         const all_dogs_filtrados = api_dogs_filtrados.concat(dogsDb);        
//         all_dogs_filtrados > 0 ? res.status(200).json(all_dogs_filtrados) : res.status(400).send(`No se encontraron dogs con el temperamento ${temp}`);
//     }
//     return res.status(404).send('Falta enviar datos')
// };

const postDog = async (req, res) => {
    const {name, height, weight, breedGroup, lifeSpan, temperament, image, creadoEnDb} = req.body

    if ( !name || !height || !weight ) res.status(400).send('Falta enviar datos obligatorios')
    else if (typeof name !== 'string' || typeof height !== 'string' || typeof weight !== 'string') {
    res.status(400).send("Error, los tipos de datos son incorrectos")}

    // const primerLetraMayuscula = name.charAt(0).toUpperCase();
    // const restoString = name.slice(1).toLowerCase();
    // const fullName = primerLetraMayuscula + restoString;

    // let grupoRaza
    // if (breedGroup.length >= 1) {
    //     const primerString = breedGroup.charAt(0).toUpperCase();
    //     const restoStr = breedGroup.slice(1);
    //     grupoRaza = primerString + restoStr;
    // }
    // grupoRaza = breedGroup;
    
    try {
        let createDog = await Dog.create({
            name: name,
            height: `${height} CM`,
            weight: `${weight} KG`,
            breedGroup: breedGroup,
            lifeSpan: `${lifeSpan} years`,
            image: image,
            temperament : temperament || "",
            creadoEnDb
        });
    
        let [dogCreated, creado] = await Temperament.findOrCreate({ 
            where: { name: temperament } 
        })
        // res.json({created: created, Temp});
        // let temperamentDb = await Temperament.findAll({ where: { name: temperament } })
        createDog.addTemperament(dogCreated);

        res.status(200).send('Dog creado con éxito');
    } catch(e) {
        console.log(e);
        res.status(406).send('Error al crear el dog')
    }
};

// Falta getByName

module.exports = {
    getAllDogs,
    getAllDogsAndByName,
    getByBreedId,
    postDog,
}