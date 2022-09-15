const express = require('express');
const router = express.Router();
const { getAllTemps } = require('../methods/utils');

router.get('/', getAllTemps);

module.exports = router;