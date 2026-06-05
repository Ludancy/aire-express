import React from 'react';
import { Calendar, Award, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const timelineItems = [
    {
      year: '2014',
      title: 'Fundación',
      desc: 'Inicio como taller técnico local.',
      icon: <Zap size={16} />
    },
    {
      year: '2018',
      title: 'Expansión',
      desc: 'Climatización comercial e industrial 24/7.',
      icon: <Award size={16} />
    },
    {
      year: '2022',
      title: 'Tecnología',
      desc: 'Soluciones HVAC de bajo consumo ecológico.',
      icon: <Shield size={16} />
    },
    {
      year: 'Hoy',
      title: 'Liderazgo',
      desc: 'Climatización premium a nivel nacional.',
      icon: <Calendar size={16} />
    }
  ];

  return (
    <section id="nosotros" className="about-section">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-img-box">
              <div className="about-logo-wrapper">
                <img src="/logo2.jpg" alt="Express HVAC Logo" />
              </div>
              <h3 className="about-exp-title">Trayectoria HVAC</h3>
              <p className="about-exp-subtitle">Líderes con garantía y eficiencia absoluta</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
              Sobre Nosotros
            </h2>
            <p className="about-text" style={{ marginBottom: '32px' }}>
              Especialistas en ingeniería térmica, ventilación y refrigeración comercial. Diseñamos soluciones a la medida con alta eficiencia y garantía absoluta.
            </p>

            <h3 className="about-features-title" style={{ marginBottom: '24px' }}>Nuestra Historia</h3>
            
            <div className="about-timeline">
              <div className="timeline-line"></div>
              {timelineItems.map((item, index) => (
                <motion.div
                  className="timeline-item"
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-dot-wrapper">
                    <div className="timeline-dot">
                      {item.icon}
                    </div>
                  </div>
                  <div className="timeline-content-box">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
