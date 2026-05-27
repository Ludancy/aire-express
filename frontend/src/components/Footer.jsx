import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = ({ onLinkClick }) => {
  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onLinkClick('inicio');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-branding">
            <a href="#inicio" className="footer-logo" onClick={handleScrollTop}>
              <img src="/logo.jpg" alt="Aire Express" className="footer-logo-img" />
              <span>Express HVAC</span>
            </a>
            <p className="footer-desc">
              Especialistas líderes en ingeniería térmica, refrigeración comercial y sistemas de aire acondicionado. Garantizamos soluciones eficientes y duraderas.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/multiserviciosexpress.hvac/" className="footer-social-link" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="http://facebook.com/profile.php?id=100078944981772#" className="footer-social-link" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://wa.me/573226480757" className="footer-social-link" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Secciones</h4>
            <ul className="footer-links">
              <li>
                <a href="#inicio" className="footer-link" onClick={handleScrollTop}>
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="footer-link" onClick={(e) => { e.preventDefault(); onLinkClick('servicios'); }}>
                  Servicios
                </a>
              </li>
              <li>
                <a href="#nosotros" className="footer-link" onClick={(e) => { e.preventDefault(); onLinkClick('nosotros'); }}>
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="footer-link" onClick={(e) => { e.preventDefault(); onLinkClick('contacto'); }}>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Servicios</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-link" style={{ cursor: 'default' }}>Instalación HVAC</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'default' }}>Mantenimiento Clima</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'default' }}>Reparación Compresores</span>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'default' }}>Sistemas Industriales</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <div className="footer-info-item">
              <Phone size={18} />
              <span>+57 322 648 0757</span>
            </div>
            <div className="footer-info-item">
              <Mail size={18} />
              <span>multiserviciosexpresshvac@gmail.com</span>
            </div>
            <div className="footer-info-item">
              <MapPin size={18} />
              <span>Ciudad, País</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Multiservicios Express HVAC. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#inicio" className="footer-social-link" onClick={handleScrollTop} aria-label="Volver arriba">
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
