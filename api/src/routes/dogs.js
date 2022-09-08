const express = require('express');
const router = express.Router();
const {getAllDogs, getByName, getByBreed, postDog} = require('../methods/dogs');

router.get('/', getAllDogs);
router.get('?name=', getByName);
router.get('/:id', getByBreed);
router.post('/', postDog);
// router.put('/', updateDog);
// router.delete('/', deleteDog);