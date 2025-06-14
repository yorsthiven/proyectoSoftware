const express = require('express')
const router = express.Router()
const estilistasController = require('../controllers/estilistasController')

//En caso de querer usar autenticacion por JWT descomentar
//const verifyJWT = require('../middleware/verifyJWT')
//router.use(verifyJWT)

router.route('/')
    .get(estilistasController.obtenerEstilistas)
    .post(estilistasController.crearNuevoEstilista)
    .patch(estilistasController.modificarEstilista)
    .delete(estilistasController.borrarEstilista)

module.exports = router