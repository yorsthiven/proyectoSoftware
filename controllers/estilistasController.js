const Estilista = require('../models/Estilista')
const HorarioServicio = require('../models/HorarioServicio')
const asyncHandler = require('express-async-handler')

// @desc Obtener todos los estilistas
// @route GET /estilistas
// @access Private
const obtenerEstilistas = asyncHandler (async (req, res) => {
    const estilistas = await Estilista.find().select().lean()
    if(!estilistas?.length) {
        return res.status(400).json({ message: 'No se encontraron estilistas'})
    }
    res.json(estilistas)
})

// @desc Crear un nuevo estilista
// @route POST /estilistas
// @access Private
const crearNuevoEstilista = asyncHandler (async (req, res) => {
    const { nombre, especialidad , descripcion } = req.body

    //Confirmar datos
    if(!nombre || !especialidad || !descripcion){
        return res.status(400).json({ message: 'Todos los campos son requeridos!'})
    }

    //Verificar duplicados
    const duplicado = await Estilista.findOne({ nombre }).lean().exec()
    if(duplicado){
        return res.status(409).json({ message: 'Nombre duplicado!'})
    }

    const estilistaObj = { nombre, especialidad, descripcion}
    const estilista = await Estilista.create(estilistaObj)

    if(estilista){
        res.status(201).json({ message: `Nuevo estilista: ${nombre}`})
    } else {
        res.status(400).json({ message: 'Datos invalidos!'})
    }
})

// @desc Modificar un estilista
// @route PATCH /estilistas
// @access Private
const modificarEstilista = asyncHandler (async (req, res) => {
    const { id, nombre, especialidad, descripcion } = req.body

    //Confirmar datos
    if(!id || !nombre || !especialidad || !descripcion){
        return res.status(400).json({ message: 'Todos los campos son requeridos!'})
    }

    const estilista = await Estilista.findById(id).exec()
    if(!estilista){
        return res.status(400).json({ message: 'Estilista no encontrado!'})
    }

    //Verificar duplicado
    const duplicado = await Estilista.findOne({ nombre }).lean().exec()
    if(duplicado && duplicado?._id.toString() !== id){
        return res.status(409).json({ message: 'Nombre de estilista duplicado!'})
    }

    estilista.nombre = nombre
    estilista.especialidad = especialidad
    estilista.descripcion = descripcion

    const estilistaModificado = await estilista.save()

    res.json({message: `${estilistaModificado.nombre} modificado`})
})

// @desc Borrar un estilista
// @route DELETE /estilistas
// @access Private
const borrarEstilista = asyncHandler (async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Id de Estilista requerido'})
    }

    const horariosAsociados = await HorarioServicio.findOne({ estilista: id }).lean().exec()

    if (horariosAsociados) {
        return res.status(400).json({ message: 'No se puede eliminar: hay horarios asociados a este estilista' })
    }

    const estilista = await Estilista.findById(id).exec()

    if (!estilista) {
        return res.status(400).json({ message: 'Estilista no encontrado!'})
    }

    const resultado = await estilista.deleteOne()

    if(resultado){
        res.json({ message: `Estilista ${estilista.nombre} con ID ${estilista._id} fue eliminado` })
    } else {
        res.status(404).json({ message: 'Algo salió mal!' })
    }

})

module.exports = {
    obtenerEstilistas,
    crearNuevoEstilista,
    modificarEstilista,
    borrarEstilista
}