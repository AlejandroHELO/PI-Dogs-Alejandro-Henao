const express = require('express');
const router = express.Router();
const { getAllDogsAndByName, getByBreedId, postDog} = require('../methods/dogs');

// router.get('/', getAllDogs);
router.get('/', getAllDogsAndByName);
router.get('/:id', getByBreedId);
router.post('/', postDog);
// router.put('/', updateDog);
// router.delete('/', deleteDog);

module.exports = router;