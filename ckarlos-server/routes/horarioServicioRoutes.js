const express = require('express')
const router = express.Router()
const horarioServiciosController = require('../controllers/horarioServiciosController')

//En caso de querer usar autenticacion por JWT descomentar
//const verifyJWT = require('../middleware/verifyJWT')
//router.use(verifyJWT)

router.route('/')
    .get(horarioServiciosController.obtenerHorarios)
    .post(horarioServiciosController.crearNuevoHorario)
    .patch(horarioServiciosController.modificarHorario)
    .delete(horarioServiciosController.borrarHorario)

module.exports = router