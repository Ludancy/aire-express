import React from 'react';
import { Hammer, Settings, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const servicesList = [
    {
      icon: <Hammer size={28} />,
      title: 'Instalación Premium',
      desc: 'Montaje profesional de climatización y aire acondicionado central de alta eficiencia.',
      tag: 'Eficiencia A++'
    },
    {
      icon: <Settings size={28} />,
      title: 'Mantenimiento Preventivo',
      desc: 'Limpieza integral y diagnóstico para optimizar el consumo eléctrico.',
      tag: 'Ahorro de Energía'
    },
    {
      icon: <Wrench size={28} />,
      title: 'Reparación Especializada',
      desc: 'Diagnóstico rápido y reparación de compresores y fallas mecánicas.',
      tag: 'Soporte 24/7'
    }
  ];

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Servicios</h2>
          <p className="section-subtitle">
            Soluciones integrales de climatización y refrigeración con la más alta tecnología.
          </p>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="service-icon-container">
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
              <span className="service-tag">{service.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
