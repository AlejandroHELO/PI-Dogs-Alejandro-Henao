const { Dog, Temperaments} = require('../db');
const { getMixedInfo} = require('./utils');

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
        // totalDogs.forEach(obj => obj.name = obj.name.toLowerCase())
        // console.log("Hola soy totalDogs en Minusculas", totalDogs)
        
        if(name){
            let dogName = totalDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
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

const postDog = async (req, res) => {
    const {name, height, weight, breedGroup, lifeSpan, temperaments, image, creadoEnDb} = req.body

    if ( !name || !height || !weight ) res.status(400).send('Falta enviar datos obligatorios')
    else if (typeof name !== 'string' || typeof height !== 'string' || typeof weight !== 'string') {
    res.status(400).send("Error, los tipos de datos son incorrectos")}
    
    try {
        let createDog = await Dog.create({
            name: name,
            height: `${height} CM`,
            weight: `${weight} KG`,
            breedGroup: breedGroup,
            lifeSpan: `${lifeSpan} years`,
            image: image,
            creadoEnDb
        });
        // console.log('Soy temperament body', temperament)
        // res.json({created: created, Temp});

        // await temperament.map(async e => {
        //     let Temp = await Temperaments.findOne( {where: {name: e} } );
        //     await createDog.addTemperaments(Temp);
        //     console.log(Temp)
        // })
        
        const alltemps = await Temperaments.findAll({
            where: { name : temperaments}
        })
        console.log('Hola Soy temperament', alltemps)
        
        createDog.addTemperaments(alltemps)

        // let temperamentDb = await Temperament.findAll({ // el post de temp.lo hago desde la Db que es donde tengo los temp. guardados
        //     where: { name: temperament }
        // })
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