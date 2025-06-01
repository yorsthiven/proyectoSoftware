const express = require('express')
const router = express.Router()
const citasController = require('../controllers/citasController')

//En caso de querer usar autenticacion por JWT descomentar
//const verifyJWT = require('../middleware/verifyJWT')
//router.use(verifyJWT)

router.get('/citas-por-servicio', citasController.generarReporteCitasPorServicio)

router.route('/')
    .get(citasController.obtenerCitas)
    .post(citasController.crearNuevaCita)
    .patch(citasController.modificarCita)
    .delete(citasController.borrarCita)

module.exports = router