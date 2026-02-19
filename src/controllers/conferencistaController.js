import Conferencista from '../models/Conferencista.js';

export const obtenerConferencistas = async (req, res) => {
    try {
        const conferencistas = await Conferencista.find();
        res.status(200).json({
            mensaje: `Bienvenido ${req.usuario.nombre} ${req.usuario.apellido}`,
            conferencistas
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los conferencistas',
            error: error.message
        });
    }
};

export const obtenerConferencistaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const conferencista = await Conferencista.findById(id);

        if (!conferencista) {
            return res.status(404).json({
                mensaje: 'Conferencista no encontrado'
            });
        }

        res.status(200).json({
            conferencista
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de conferencista no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al obtener el conferencista',
            error: error.message
        });
    }
};

export const crearConferencista = async (req, res) => {
    try {
        const { nombre, apellido, cedula, genero, ciudad, direccion, fecha_nacimiento, telefono, email, empresa } = req.body;

        const conferencistaExiste = await Conferencista.findOne({ $or: [{ cedula }, { email }] });
        if (conferencistaExiste) {
            return res.status(400).json({
                mensaje: 'Ya existe un conferencista con esa cédula o email'
            });
        }

        const conferencista = new Conferencista({
            nombre,
            apellido,
            cedula,
            genero,
            ciudad,
            direccion,
            fecha_nacimiento,
            telefono,
            email,
            empresa
        });

        await conferencista.save();

        res.status(201).json({
            mensaje: 'Conferencista creado exitosamente',
            conferencista
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el conferencista',
            error: error.message
        });
    }
};

export const actualizarConferencista = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        if (datosActualizados.cedula || datosActualizados.email) {
            const conferencistaExiste = await Conferencista.findOne({
                _id: { $ne: id },
                $or: [
                    { cedula: datosActualizados.cedula },
                    { email: datosActualizados.email }
                ]
            });

            if (conferencistaExiste) {
                return res.status(400).json({
                    mensaje: 'Ya existe un conferencista con esa cédula o email'
                });
            }
        }

        const conferencista = await Conferencista.findByIdAndUpdate(
            id,
            datosActualizados,
            { returnDocument: 'after', runValidators: true }
        );

        if (!conferencista) {
            return res.status(404).json({
                mensaje: 'Conferencista no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Conferencista actualizado exitosamente',
            conferencista
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de conferencista no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al actualizar el conferencista',
            error: error.message
        });
    }
};

export const eliminarConferencista = async (req, res) => {
    try {
        const { id } = req.params;
        const conferencista = await Conferencista.findByIdAndDelete(id);

        if (!conferencista) {
            return res.status(404).json({
                mensaje: 'Conferencista no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Conferencista eliminado exitosamente',
            conferencista
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de conferencista no válido'
            });
        }
        res.status(500).json({
            mensaje: 'Error al eliminar el conferencista',
            error: error.message
        });
    }
};
