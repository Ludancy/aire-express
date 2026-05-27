import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON en caso de fallback
const LOCAL_DB_PATH = path.join(__dirname, '..', '..', 'data', 'messages.json');

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      console.log('🔌 Conectado a MongoDB de manera exitosa.');
      return { type: 'mongodb' };
    } catch (error) {
      console.error('❌ Error conectando a MongoDB. Usando fallback de base de datos local JSON.', error.message);
    }
  }

  // Fallback a Base de Datos Local JSON
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
    console.log(`📂 Usando almacenamiento de archivos local JSON en: ${LOCAL_DB_PATH}`);
    return { type: 'json', path: LOCAL_DB_PATH };
  } catch (error) {
    console.error('❌ Error inicializando base de datos local JSON:', error.message);
    throw error;
  }
};

export const getLocalDbPath = () => LOCAL_DB_PATH;
