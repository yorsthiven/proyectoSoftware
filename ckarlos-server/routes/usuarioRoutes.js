const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuariosController')

//En caso de querer usar autenticacion por JWT descomentar
//const verifyJWT = require('../middleware/verifyJWT')
//router.use(verifyJWT)

router.route('/')
    .get(usuariosController.obtenerUsuarios)
    .post(usuariosController.crearUsuario)
    .patch(usuariosController.modificarUsuario)
    .delete(usuariosController.borrarUsuario)

module.exports = router