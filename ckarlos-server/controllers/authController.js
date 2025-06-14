const { Usuario } = require('../models/Usuario')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Login de usuario
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
const { correo, contrasena } = req.body

if (!correo || !contrasena) {
return res.status(400).json({ message: 'Todos los campos son requeridos' })
}

const usuarioDB = await Usuario.findOne({ correo }).exec()
if (!usuarioDB) {
return res.status(401).json({ message: 'Credenciales inválidas' })
}

const coincide = await bcrypt.compare(contrasena, usuarioDB.contrasena)
if (!coincide) {
return res.status(401).json({ message: 'Credenciales inválidas' })
}

const token = jwt.sign(
{
usuarioId: usuarioDB._id,
nombre: usuarioDB.nombre,
tipo: usuarioDB.tipo
},
process.env.JWT_SECRET,
{ expiresIn: '30d' }
)

res.json({
token,
usuario: {
_id: usuarioDB._id,
nombre: usuarioDB.nombre,
tipo: usuarioDB.tipo
}
})
})

module.exports = { login }