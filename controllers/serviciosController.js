const Servicio = require('../models/Servicio')
const HorarioServicio = require('../models/HorarioServicio')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Obtener todos los servicios
// @route GET /servicios
// @access Private
const obtenerServicios = asyncHandler (async (req, res) => {
    const servicios = await Servicio.find().select().lean()
    if(!servicios?.length) {
        return res.status(400).json({ message: 'No se encontraron servicios'})
    }
    res.json(servicios)
})

// @desc Crear un nuevo servicio
// @route POST /servicios
// @access Private
const crearNuevoServicio = asyncHandler (async (req, res) => {
    const { nombre, costo, descripcion } = req.body

    //Confirmar datos
    if(!nombre || !costo || !descripcion){
        return res.status(400).json({ message: 'Todos los campos son requeridos!'})
    }

    //Verificar duplicados
    const duplicado = await Servicio.findOne({ nombre }).lean().exec()
    if(duplicado){
        return res.status(409).json({ message: 'Nombre duplicado!'})
    }

    const servicioObj = { nombre, costo, descripcion}
    const servicio = await Servicio.create(servicioObj)

    if(servicio){
        res.status(201).json({ message: `Nuevo servicio: ${nombre}`})
    } else {
        res.status(400).json({ message: 'Datos invalidos!'})
    }
})

// @desc Modificar un servicio
// @route PATCH /servicios
// @access Private
const modificarServicio = asyncHandler (async (req, res) => {
    const { id, nombre, costo, descripcion } = req.body

    //Confirmar datos
    if(!id || !nombre || !costo || !descripcion){
        return res.status(400).json({ message: 'Todos los campos son requeridos!'})
    }

    const servicio = await Servicio.findById(id).exec()
    if(!servicio){
        return res.status(400).json({ message: 'Servicio no encontrado!'})
    }

    //Verificar duplicado
    const duplicado = await Servicio.findOne({ nombre }).lean().exec()
    if(duplicado && duplicado?._id.toString() !== id){
        return res.status(409).json({ message: 'Nombre de servicio duplicado!'})
    }

    servicio.nombre = nombre
    servicio.costo = costo
    servicio.descripcion = descripcion

    const servicioModificado = await servicio.save()

    res.json({message: `${servicioModificado.nombre} modificado`})
})

// @desc Borrar un servicio
// @route DELETE /servicios
// @access Private
const borrarServicio = asyncHandler (async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Id de Servicio requerido'})
    }

    const horariosAsociados = await HorarioServicio.findOne({ servicio: id }).lean().exec()
    if (horariosAsociados) {
        return res.status(400).json({ message: 'No se puede eliminar: hay horarios asociados a este servicio' })
    }

    const servicio = await Servicio.findById(id).exec()

    if (!servicio) {
        return res.status(400).json({ message: 'Servicio no encontrado!'})
    }

    const resultado = await servicio.deleteOne()

    if(resultado){
        res.json({ message: `Servicio ${servicio.nombre} con ID ${servicio._id} fue eliminado` })
    } else {
        res.status(404).json({ message: 'Algo salió mal!' })
    }

})

module.exports = {
    obtenerServicios,
    crearNuevoServicio,
    modificarServicio,
    borrarServicio
}