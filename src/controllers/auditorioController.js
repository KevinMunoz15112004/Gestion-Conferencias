import Auditorio from '../models/Auditorio.js';

export const obtenerAuditorios = async (req, res) => {
    try {
        const auditorios = await Auditorio.find();
        res.status(200).json({
            mensaje: `Bienvenido ${req.usuario.nombre} ${req.usuario.apellido}`,
            auditorios
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los auditorios',
            error: error.message
        });
    }
};

export const obtenerAuditorioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const auditorio = await Auditorio.findById(id);

        if (!auditorio) {
            return res.status(404).json({
                mensaje: 'Auditorio no encontrado'
            });
        }

        res.status(200).json({
            auditorio
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de auditorio no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al obtener el auditorio',
            error: error.message
        });
    }
};

export const crearAuditorio = async (req, res) => {
    try {
        const { codigo, nombre, ubicacion, capacidad, descripcion } = req.body;

        const auditorioExiste = await Auditorio.findOne({ codigo });
        if (auditorioExiste) {
            return res.status(400).json({
                mensaje: 'Ya existe un auditorio con ese código'
            });
        }

        const auditorio = new Auditorio({
            codigo,
            nombre,
            ubicacion,
            capacidad,
            descripcion
        });

        await auditorio.save();

        res.status(201).json({
            mensaje: 'Auditorio creado exitosamente',
            auditorio
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el auditorio',
            error: error.message
        });
    }
};

export const actualizarAuditorio = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        if (datosActualizados.codigo) {
            const auditorioExiste = await Auditorio.findOne({
                _id: { $ne: id },
                codigo: datosActualizados.codigo
            });

            if (auditorioExiste) {
                return res.status(400).json({
                    mensaje: 'Ya existe un auditorio con ese código'
                });
            }
        }

        const auditorio = await Auditorio.findByIdAndUpdate(
            id,
            datosActualizados,
            { returnDocument: 'after', runValidators: true }
        );

        if (!auditorio) {
            return res.status(404).json({
                mensaje: 'Auditorio no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Auditorio actualizado exitosamente',
            auditorio
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de auditorio no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al actualizar el auditorio',
            error: error.message
        });
    }
};

export const eliminarAuditorio = async (req, res) => {
    try {
        const { id } = req.params;
        const auditorio = await Auditorio.findByIdAndDelete(id);

        if (!auditorio) {
            return res.status(404).json({
                mensaje: 'Auditorio no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Auditorio eliminado exitosamente',
            auditorio
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de auditorio no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al eliminar el auditorio',
            error: error.message
        });
    }
};
