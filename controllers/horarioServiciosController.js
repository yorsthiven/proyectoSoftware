const HorarioServicio = require('../models/HorarioServicio')
const Estilista = require('../models/Estilista')
const Servicio = require('../models/Servicio')
const asyncHandler = require('express-async-handler')

// @desc Obtener todos los horarios de servicio
// @route GET /horarios
// @access Private
const obtenerHorarios = asyncHandler(async (req, res) => {
    const horarios = await HorarioServicio.find()
        .populate('estilista', 'nombre')
        .populate('servicio', 'nombre')
        .lean()

    if (!horarios?.length) {
        return res.status(400).json({ message: 'No se encontraron horarios' })
    }

    res.json(horarios)
})

// @desc Crear un nuevo horario de servicio
// @route POST /horarios
// @access Private
const crearNuevoHorario = asyncHandler(async (req, res) => {
    const { estilista, servicio, fecha, hora } = req.body

    if (!estilista || !servicio || !fecha || !hora) {
        return res.status(400).json({ message: 'Todos los campos son requeridos!' })
    }

    // Verificar si el estilista y el servicio existen
    const estilistaExiste = await Estilista.findById(estilista).exec()
    const servicioExiste = await Servicio.findById(servicio).exec()

    if (!estilistaExiste || !servicioExiste) {
        return res.status(400).json({ message: 'Estilista o servicio no válidos' })
    }

    const nuevoHorario = await HorarioServicio.create({ estilista, servicio, fecha, hora })

   if (nuevoHorario) {
res.status(201).json(nuevoHorario); // devuelve el objeto completo, incluido _id
} else {
res.status(400).json({ message: 'Datos inválidos' })
}
})

// @desc Modificar un horario de servicio
// @route PATCH /horarios
// @access Private
const modificarHorario = asyncHandler(async (req, res) => {
    const { id, estilista, servicio, fecha, hora } = req.body

    if (!id || !estilista || !servicio || !fecha || !hora) {
        return res.status(400).json({ message: 'Todos los campos son requeridos!' })
    }

    const horario = await HorarioServicio.findById(id).exec()

    if (!horario) {
        return res.status(400).json({ message: 'Horario no encontrado!' })
    }

    horario.estilista = estilista
    horario.servicio = servicio
    horario.fecha = fecha
    horario.hora = hora

    const horarioModificado = await horario.save()

    res.json({ message: `Horario modificado correctamente` })
})

// @desc Borrar un horario de servicio
// @route DELETE /horarios
// @access Private
const borrarHorario = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Id del horario requerido' })
    }

    const horario = await HorarioServicio.findById(id).exec()

    if (!horario) {
        return res.status(400).json({ message: 'Horario no encontrado!' })
    }

    const resultado = await horario.deleteOne()

    if (resultado) {
        res.json({ message: `Horario con ID ${horario._id} fue eliminado` })
    } else {
        res.status(404).json({ message: 'Algo salió mal!' })
    }
})

module.exports = {
    obtenerHorarios,
    crearNuevoHorario,
    modificarHorario,
    borrarHorario
}