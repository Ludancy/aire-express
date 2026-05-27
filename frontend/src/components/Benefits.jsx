import React from 'react';
import { ShieldCheck, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Benefits = () => {
  const benefitsList = [
    {
      icon: <Award size={24} />,
      title: 'Técnicos Certificados',
      desc: 'Personal especializado en las marcas líderes del mercado HVAC.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Soporte de Emergencia 24/7',
      desc: 'Atendemos urgencias de refrigeración a cualquier hora.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Garantía Completa',
      desc: 'Respaldamos todos nuestros trabajos de instalación y reparación.'
    }
  ];

  return (
    <section className="benefits-bar">
      <div className="container">
        <div className="benefits-grid">
          {benefitsList.map((benefit, index) => (
            <motion.div
              className="benefit-item"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="benefit-icon-wrapper">
                {benefit.icon}
              </div>
              <div className="benefit-info">
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
