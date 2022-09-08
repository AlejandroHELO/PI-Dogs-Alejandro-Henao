const express = require('express');
const router = express.Router();
const { getAllTemps} = require('../methods/temperaments');

router.get('/', getAllTemps);

module.exports = router;