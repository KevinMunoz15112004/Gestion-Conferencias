import express from 'express';
import {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva
} from '../controllers/reservaController.js';
import { validarCrearReserva, validarActualizarReserva } from '../validators/reservaValidator.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de reservas son privadas
router.use(verificarToken);

router.get('/', obtenerReservas);
router.get('/:id', obtenerReservaPorId);
router.post('/crear', validarCrearReserva, crearReserva);
router.put('/actualizar/:id', validarActualizarReserva, actualizarReserva);
router.delete('/eliminar/:id', eliminarReserva);

export default router;
