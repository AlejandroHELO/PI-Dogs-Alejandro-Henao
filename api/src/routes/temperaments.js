const express = require('express');
const router = express.Router();

const { getAllTemps } = require('../methods/utils');

// router.get('/', async (req, res) => {
//     try {
//         const tempsApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//         let tempsSinDividir = tempsApi.data.map(dog => dog.temperament);
//         let tempsFinal = tempsSinDividir.toString().replace(/ /g, "").split(',');
        
//         tempsFinal.forEach(temp => {
//             Temperament.findOrCreate({
//                 where: { name: temp }
//             })
//         })

//         const allTemperaments = await Temperament.findAll();
//         console.log ("HOLA SOY allTemperaments", allTemperaments)
//         res.json(allTemperaments);

//     } catch (error) {
//         console.log("Something went wrong, ", error)
//     }  
// });

router.get('/', getAllTemps);

module.exports = router;