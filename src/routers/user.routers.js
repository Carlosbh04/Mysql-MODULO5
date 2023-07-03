const express = require('express');
const router = express.Router();

// Importar controladores de las rutas
const userController = require('../controller/user.controller');

// Rutas de usuarios (alumnos)
router.get('/:id', userController.getAlumnoById);
router.get('/', userController.getAlumnos);
router.post('/', userController.addAlumno);
router.put('/', userController.updateAlumno);
router.delete('/', userController.deleteAlumno);

// Middleware para el manejo de errores
router.use(userController.errorHandler);

module.exports = router;
