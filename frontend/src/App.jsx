import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    document.title = 'Multiservicios Express HVAC | Climatización y Refrigeración Industrial';
  }, []);

  useEffect(() => {
    const sections = ['inicio', 'servicios', 'nosotros', 'contacto'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleActionClick = (id) => {
    setActiveSection(id);
    setTimeout(() => {
      if (id === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };

  return (
    <div className="app-container">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <Hero onActionClick={handleActionClick} />
      <Benefits />
      <Services />
      <About />
      <Testimonials />
      <Contact />

      <Footer onLinkClick={handleActionClick} />
    </div>
  );
}

export default App;
