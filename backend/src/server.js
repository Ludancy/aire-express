import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', '*'], // Permitir local Vite y comodín
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-admin-secret']
}));

app.use(express.json());

// Ruta base para test de salud
app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'Multiservicios Express HVAC API',
    status: 'online',
    version: '1.0.0'
  });
});

// Rutas de la API
app.use('/api', contactRoutes);

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint no encontrado.' });
});

// Conectar a la base de datos e iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
