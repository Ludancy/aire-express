import mongoose from 'mongoose';
import fs from 'fs';
import { getLocalDbPath } from '../config/db.js';

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
});

const MongoMessage = mongoose.models.Message || mongoose.model('Message', MessageSchema);

const readLocalJSON = () => {
  try {
    const data = fs.readFileSync(getLocalDbPath(), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo base de datos JSON:', error);
    return [];
  }
};

const writeLocalJSON = (data) => {
  try {
    fs.writeFileSync(getLocalDbPath(), JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error escribiendo base de datos JSON:', error);
  }
};

export const MessageModel = {
  create: async (data) => {
    const isMongo = mongoose.connection.readyState === 1;

    if (isMongo) {
      return await MongoMessage.create(data);
    } else {
      const messages = readLocalJSON();
      const newMessage = {
        _id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
        ...data,
        read: false,
        fecha: new Date().toISOString()
      };
      messages.unshift(newMessage);
      writeLocalJSON(messages);
      return newMessage;
    }
  },

  find: async () => {
    const isMongo = mongoose.connection.readyState === 1;

    if (isMongo) {
      return await MongoMessage.find().sort({ fecha: -1 });
    } else {
      return readLocalJSON();
    }
  },

  findByIdAndUpdate: async (id, updateData) => {
    const isMongo = mongoose.connection.readyState === 1;

    if (isMongo) {
      return await MongoMessage.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      const messages = readLocalJSON();
      const index = messages.findIndex(m => m._id === id);
      if (index !== -1) {
        messages[index] = { ...messages[index], ...updateData };
        writeLocalJSON(messages);
        return messages[index];
      }
      return null;
    }
  },

  findByIdAndDelete: async (id) => {
    const isMongo = mongoose.connection.readyState === 1;

    if (isMongo) {
      return await MongoMessage.findByIdAndDelete(id);
    } else {
      const messages = readLocalJSON();
      const filtered = messages.filter(m => m._id !== id);
      const isDeleted = messages.length !== filtered.length;
      if (isDeleted) {
        writeLocalJSON(filtered);
        return true;
      }
      return null;
    }
  }
};
