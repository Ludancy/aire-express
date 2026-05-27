import React from 'react';
import { Snowflake, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ onActionClick }) => {
  return (
    <header id="inicio" className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Lado Izquierdo: Textos y CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-tagline">
              <Snowflake size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
              <span>Servicio Premium 24/7</span>
            </div>
            
            <h1 className="hero-title">
              Multiservicios
              <span className="hero-highlight">Express HVAC</span>
            </h1>
            
            <p className="hero-description">
              Refrigeración industrial y climatización comercial de alta eficiencia.
            </p>
            
            <div className="hero-cta">
              <button
                className="btn btn-primary"
                onClick={() => onActionClick('contacto')}
              >
                Solicitar Servicio
                <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onActionClick('servicios')}
              >
                Servicios
              </button>
            </div>
          </motion.div>

          {/* Lado Derecho: Tarjeta Visual de Alta Gama */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="hero-card">
              <div className="hero-glow"></div>
              <motion.img
                src="/logo.jpg"
                alt="Express HVAC Logo"
                className="hero-card-img"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <h3 className="hero-card-title">Climatización Avanzada</h3>
              <p className="hero-card-text">
                Técnicos certificados para asegurar el máximo rendimiento de tus equipos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
