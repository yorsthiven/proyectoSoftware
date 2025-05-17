const { Usuario, Cliente, Administrador } = require('../models/Usuario')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const enviarCorreo = require('../utils/mailer')

// @desc Obtener todos los usuarios
// @route GET /usuarios
// @access Private
const obtenerUsuarios = asyncHandler(async (req, res) => {
    const usuarios = await Usuario.find().lean()
    if (!usuarios?.length) {
        return res.status(400).json({ message: 'No se encontraron usuarios' })
    }
    res.json(usuarios)
})

// @desc Crear nuevo usuario (Cliente o Administrador)
// @route POST /usuarios
// @access Private
const crearUsuario = asyncHandler(async (req, res) => {
    const { usuario, contrasena, nombre, telefono, correo, tipo, fechaNacimiento, genero, nivelAcceso } = req.body

    if (!usuario || !contrasena || !nombre || !correo || !tipo) {
        return res.status(400).json({ message: 'Campos requeridos faltantes' })
    }

    const duplicado = await Usuario.findOne({ correo }).lean().exec()
    if (duplicado) {
        return res.status(409).json({ message: 'Correo en uso!' })
    }

    const hashPassword = await bcrypt.hash(contrasena, 10)

    let nuevoUsuario
    if (tipo === 'Cliente') {
        nuevoUsuario = await Cliente.create({
            usuario,
            contrasena: hashPassword,
            nombre,
            telefono,
            correo,
            fechaNacimiento,
            genero
        })
    } else if (tipo === 'Administrador') {
        nuevoUsuario = await Administrador.create({
            usuario,
            contrasena: hashPassword,
            nombre,
            telefono,
            correo,
            nivelAcceso
        })
    } else {
        return res.status(400).json({ message: 'Tipo de usuario inválido' })
    }

    if (nuevoUsuario) {
        // Enviar correo de confirmación
        await enviarCorreo(correo, nombre);
        res.status(201).json({ message: `Usuario ${tipo} creado` })
    } else {
        res.status(400).json({ message: 'Datos inválidos' })
    }
})

// @desc Modificar un usuario
// @route PATCH /usuarios
// @access Private
const modificarUsuario = asyncHandler(async (req, res) => {
    const { id, usuario, contrasena, nombre, telefono, correo } = req.body

    if (!id || !usuario || !nombre || !correo) {
        return res.status(400).json({ message: 'Todos los campos obligatorios deben estar presentes' })
    }

    const user = await Usuario.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' })
    }

    const duplicado = await Usuario.findOne({ usuario }).lean().exec()
    if (duplicado && duplicado._id.toString() !== id) {
        return res.status(409).json({ message: 'Nombre de usuario duplicado' })
    }

    user.usuario = usuario
    user.nombre = nombre
    user.telefono = telefono
    user.correo = correo

    if (contrasena) {
        user.contraseña = await bcrypt.hash(contrasena, 10)
    }

    const usuarioActualizado = await user.save()
    //TODO crear funcion para notificar por correo la modificacion del usuario / correo nuevo?
    res.json({ message: `${usuarioActualizado.usuario} actualizado` })
})

// @desc Eliminar un usuario
// @route DELETE /usuarios
// @access Private
const borrarUsuario = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'ID requerido' })
    }

    const user = await Usuario.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' })
    }

    const result = await user.deleteOne()
    if(result){
        res.json({ message: `Usuario ${user.usuario} con ID ${user._id} fue eliminado` })
    } else {
        res.status(404).json({ message: 'Algo salió mal!' })
    }
})

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    modificarUsuario,
    borrarUsuario
}