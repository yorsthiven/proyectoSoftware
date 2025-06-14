const express = require('express')
const router = express.Router()
const serviciosController = require('../controllers/serviciosController')

//En caso de querer usar autenticacion por JWT descomentar
//const verifyJWT = require('../middleware/verifyJWT')
//router.use(verifyJWT)

router.route('/')
    .get(serviciosController.obtenerServicios)
    .post(serviciosController.crearNuevoServicio)
    .patch(serviciosController.modificarServicio)
    .delete(serviciosController.borrarServicio)

module.exports = router