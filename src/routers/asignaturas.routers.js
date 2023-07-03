const express = require('express');
const router = express.Router();

// Importar controladores de las rutas
const userAsignaturasController = require('../controller/user.asignaturas');

// Rutas de asignaturas
router.get('/media/:id', userAsignaturasController.getMediaById);
router.get('/apuntadas/:id', userAsignaturasController.getAsignaturasById);
router.get('/apuntadas', userAsignaturasController.getAlumnosAsignaturas);
router.get('/impartidas/:id', userAsignaturasController.getAsignaturasImpartidasById);
router.get('/impartidas', userAsignaturasController.getProfesoresAsignaturas);

module.exports = router;
