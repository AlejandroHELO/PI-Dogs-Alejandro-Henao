const { Router } = require('express');
const Dogs = require ("./dogs.js")
const Temperaments = require ("./temperaments.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', Dogs),
router.use('/temperaments', Temperaments)

module.exports = router;
