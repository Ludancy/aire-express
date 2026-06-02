import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('inicio');
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled || mobileMenuOpen ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#inicio" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('inicio'); }}>
          <img src="/logo.jpg" alt="Aire Express" className="navbar-logo-img" />
          <span>Express HVAC</span>
        </a>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
