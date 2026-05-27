import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const contactOptions = [
    {
      icon: <Phone size={22} />,
      title: 'Teléfono Principal',
      value: '+57 322 648 0757',
      href: 'tel:+573226480757'
    },
    {
      icon: <MessageSquare size={22} />,
      title: 'WhatsApp Directo',
      value: '+57 322 648 0757',
      href: 'https://wa.me/573226480757'
    },
    {
      icon: <Mail size={22} />,
      title: 'Correo Electrónico',
      value: 'multiserviciosexpresshvac@gmail.com',
      href: 'mailto:multiserviciosexpresshvac@gmail.com'
    },
    {
      icon: <MapPin size={22} />,
      title: 'Nuestra Ubicación',
      value: 'Ciudad, País',
      href: '#'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setFeedback({ type: 'error', text: 'Por favor, rellena todos los campos obligatorios.' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFeedback({
          type: 'success',
          text: '¡Mensaje enviado con éxito! Tu consulta ha sido registrada.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setFeedback({
          type: 'error',
          text: result.error || 'Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.'
        });
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setFeedback({
        type: 'error',
        text: 'No se pudo enviar el formulario. Intenta de nuevo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-subtitle">
            ¿Necesitas instalación, mantenimiento o una reparación urgente? Completa el formulario o contáctanos directamente.
          </p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info-panel"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-info-card">
              <h3 className="contact-info-header">Información Directa</h3>
              <div className="contact-info-list">
                {contactOptions.map((opt, index) => (
                  <a
                    key={index}
                    href={opt.href}
                    className="contact-item-link"
                    onClick={opt.href === '#' ? (e) => e.preventDefault() : undefined}
                    target={opt.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                  >
                    <div className="contact-item-icon">
                      {opt.icon}
                    </div>
                    <div className="contact-item-details">
                      <h5>{opt.title}</h5>
                      <p>{opt.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-box"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="form-title">Envíanos un Mensaje</h3>
            
            {feedback && (
              <div className={`form-feedback ${feedback.type === 'success' ? 'form-feedback-success' : 'form-feedback-error'}`}>
                {feedback.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                <span>{feedback.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Ej. Juan Pérez"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Ej. juan@correo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono de Contacto *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Ej. +57 322 648 0757"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Asunto de Consulta *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    placeholder="Ej. Presupuesto instalación"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group form-full-width">
                  <label htmlFor="message">Mensaje / Detalle de Requerimiento *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder="Describe en detalle qué equipo tienes y qué servicio requieres..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Enviar Consulta'}
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
