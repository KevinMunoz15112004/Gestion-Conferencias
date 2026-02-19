import Reserva from '../models/Reserva.js';
import Auditorio from '../models/Auditorio.js';
import Conferencista from '../models/Conferencista.js';

export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find()
            .populate('auditorio')
            .populate('conferencista');

        res.status(200).json({
            mensaje: `Bienvenido ${req.usuario.nombre} ${req.usuario.apellido}`,
            reservas
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las reservas',
            error: error.message
        });
    }
};

export const obtenerReservaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findById(id)
            .populate('auditorio')
            .populate('conferencista');

        if (!reserva) {
            return res.status(404).json({
                mensaje: 'Reserva no encontrada'
            });
        }

        res.status(200).json({
            reserva
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de reserva no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al obtener la reserva',
            error: error.message
        });
    }
};

export const crearReserva = async (req, res) => {
    try {
        const { codigo, descripcion, auditorio, conferencista } = req.body;

        const reservaExiste = await Reserva.findOne({ codigo });
        if (reservaExiste) {
            return res.status(400).json({
                mensaje: 'Ya existe una reserva con ese código'
            });
        }

        const auditorioExiste = await Auditorio.findById(auditorio);
        if (!auditorioExiste) {
            return res.status(404).json({
                mensaje: 'El auditorio especificado no existe'
            });
        }

        const conferencistaExiste = await Conferencista.findById(conferencista);
        if (!conferencistaExiste) {
            return res.status(404).json({
                mensaje: 'El conferencista especificado no existe'
            });
        }

        const reserva = new Reserva({
            codigo,
            descripcion,
            auditorio,
            conferencista
        });

        await reserva.save();
        await reserva.populate('auditorio');
        await reserva.populate('conferencista');

        res.status(201).json({
            mensaje: 'Reserva creada exitosamente',
            reserva
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la reserva',
            error: error.message
        });
    }
};

export const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        if (datosActualizados.codigo) {
            const reservaExiste = await Reserva.findOne({
                _id: { $ne: id },
                codigo: datosActualizados.codigo
            });

            if (reservaExiste) {
                return res.status(400).json({
                    mensaje: 'Ya existe una reserva con ese código'
                });
            }
        }

        if (datosActualizados.auditorio) {
            const auditorioExiste = await Auditorio.findById(datosActualizados.auditorio);
            if (!auditorioExiste) {
                return res.status(404).json({
                    mensaje: 'El auditorio especificado no existe'
                });
            }
        }

        if (datosActualizados.conferencista) {
            const conferencistaExiste = await Conferencista.findById(datosActualizados.conferencista);
            if (!conferencistaExiste) {
                return res.status(404).json({
                    mensaje: 'El conferencista especificado no existe'
                });
            }
        }

        const reserva = await Reserva.findByIdAndUpdate(
            id,
            datosActualizados,
            { returnDocument: 'after', runValidators: true }
        )
            .populate('auditorio')
            .populate('conferencista');

        if (!reserva) {
            return res.status(404).json({
                mensaje: 'Reserva no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Reserva actualizada exitosamente',
            reserva
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de reserva no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al actualizar la reserva',
            error: error.message
        });
    }
};

export const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByIdAndDelete(id)
            .populate('auditorio')
            .populate('conferencista');

        if (!reserva) {
            return res.status(404).json({
                mensaje: 'Reserva no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Reserva eliminada exitosamente',
            reserva
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de reserva no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al eliminar la reserva',
            error: error.message
        });
    }
};
