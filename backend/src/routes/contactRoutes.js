import express from 'express';
import { MessageModel } from '../models/messageModel.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Middleware simple de autenticación de Administrador
const adminAuth = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET || 'admin123';
  const clientSecret = req.headers['x-admin-secret'];

  if (clientSecret === adminSecret) {
    next();
  } else {
    res.status(401).json({ success: false, error: 'No autorizado. Se requiere token administrativo válido.' });
  }
};

// POST /api/contact - Recibir mensaje y enviarlo
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Por favor, completa todos los campos obligatorios.' });
    }

    // Guardar en la base de datos (MongoDB o JSON Fallback)
    const savedMessage = await MessageModel.create({
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date()
    });

    // --- Simulación / Envío de Email ---
    console.log('✉️ Nuevo mensaje guardado en la base de datos. Simulando envío de correo...');
    console.log(`De: ${name} <${email}>`);
    console.log(`Asunto: ${subject}`);
    console.log(`Mensaje: ${message}`);

    // Si se configuran variables de entorno para Nodemailer, enviamos un correo real
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: process.env.EMAIL_PORT === '465',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: `"${name}" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
          replyTo: email,
          subject: `Contacto HVAC: ${subject}`,
          text: `Has recibido un nuevo mensaje desde la web de Aire Express:\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8ed; border-radius: 8px;">
              <h2 style="color: #01304a; border-bottom: 2px solid #01304a; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Asunto:</strong> ${subject}</p>
              <div style="background-color: #f5f8fa; padding: 15px; border-radius: 4px; margin-top: 15px;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="font-size: 0.8em; color: #8899a6; margin-top: 20px; text-align: center;">Multiservicios Express HVAC - Sistema Automático</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Correo electrónico enviado correctamente a través de Nodemailer.');
      } catch (emailError) {
        console.error('⚠️ Error enviando correo real (Nodemailer):', emailError.message);
      }
    } else {
      console.log('💡 Envío de correo real no configurado (Variables de Nodemailer ausentes). Mensaje simulado en consola.');
    }

    res.status(201).json({
      success: true,
      message: 'Mensaje recibido y procesado con éxito.',
      data: savedMessage
    });

  } catch (error) {
    console.error('❌ Error en el endpoint de contacto:', error);
    res.status(500).json({ success: false, error: 'Hubo un error al procesar tu mensaje de contacto.' });
  }
});

// GET /api/admin/messages - Obtener todos los mensajes (Admin)
router.get('/admin/messages', adminAuth, async (req, res) => {
  try {
    const messages = await MessageModel.find();
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    console.error('❌ Error obteniendo mensajes en el panel admin:', error);
    res.status(500).json({ success: false, error: 'Error al recuperar los mensajes.' });
  }
});

// PUT /api/admin/messages/:id - Marcar mensaje como leído / no leído (Admin)
router.put('/admin/messages/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const updated = await MessageModel.findByIdAndUpdate(id, { read });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Mensaje no encontrado.' });
    }

    res.status(200).json({ success: true, message: 'Mensaje actualizado correctamente.', data: updated });
  } catch (error) {
    console.error('❌ Error actualizando estado de mensaje:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar el mensaje.' });
  }
});

// DELETE /api/admin/messages/:id - Eliminar un mensaje (Admin)
router.delete('/admin/messages/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MessageModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Mensaje no encontrado.' });
    }

    res.status(200).json({ success: true, message: 'Mensaje eliminado correctamente.' });
  } catch (error) {
    console.error('❌ Error eliminando mensaje:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar el mensaje.' });
  }
});

export default router;
