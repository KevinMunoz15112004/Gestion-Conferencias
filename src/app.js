import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import conferencistaRoutes from './routes/conferencistaRoutes.js';
import auditorioRoutes from './routes/auditorioRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API del Sistema de Gestión de Conferencias'
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/conferencistas', conferencistaRoutes);
app.use('/api/auditorios', auditorioRoutes);
app.use('/api/reservas', reservaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada'
  });
});

export default app;
