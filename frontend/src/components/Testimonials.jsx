import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonialsList = [
    {
      stars: 5,
      content: "Excelente servicio técnico. Realizaron la instalación de 4 aires acondicionados centrales en nuestro restaurante en solo un fin de semana. Super recomendados por su velocidad y limpieza.",
      author: "Carlos Mendoza",
      role: "Gerente, Plaza Food Hall",
      initial: "C"
    },
    {
      stars: 5,
      content: "El plan de mantenimiento preventivo mensual que contratamos ha reducido nuestras fallas de climatización a cero en las oficinas. Muy formales, puntuales y profesionales.",
      author: "Sofía Rodríguez",
      role: "Administradora, Corporativo Alpha",
      initial: "S"
    },
    {
      stars: 5,
      content: "Tuvimos una emergencia de refrigeración con una de nuestras cavas a las 2 AM. El equipo Express HVAC respondió de inmediato y solucionaron la fuga en menos de dos horas.",
      author: "Roberto Castillo",
      role: "Director de Operaciones, Carnes del Sur",
      initial: "R"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Casos de Éxito</h2>
          <p className="section-subtitle">
            Lo que dicen nuestros clientes comerciales sobre la confiabilidad, velocidad y profesionalismo de nuestro servicio HVAC.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonialsList.map((testi, index) => (
            <motion.div
              className="testimonial-card"
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div>
                <div className="testimonial-stars">
                  {[...Array(testi.stars)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-content">"{testi.content}"</p>
              </div>

              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testi.initial}
                </div>
                <div className="testimonial-author-name">
                  <h5>{testi.author}</h5>
                  <p>{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
