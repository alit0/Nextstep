import React, { useEffect } from 'react';
import '../index.css';
import '../accessibility.css';
import '../fixes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import NextstepLogo from '../assets/Nextstep.svg';

// Importación de componentes de layout
import Header from './layout/Header';
import Chatbot from './layout/Chatbot';

// Importación de componentes de secciones
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import GaitTypes from './sections/GaitTypes';
import WhyChoose from './sections/WhyChoose';
import Contact from './sections/Contact';

/**
 * Componente principal de la aplicación
 * Integra todos los componentes siguiendo una estructura organizada y accesible
 */
function App() {
  // Efecto para manejar el cambio de secciones en el hash de URL
  useEffect(() => {
    // Función para manejar cambios de hash en URL
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        // Aplicar desplazamiento suave a la sección
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          // Agregar pequeño retraso para asegurar que la navegación funcione correctamente
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Ejecutar al cargar la página en caso de URL con hash
    handleHashChange();
    
    // Agregar listener para cambios de hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Limpieza al desmontar
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      {/* Estructura principal con skip links para accesibilidad */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      
      <Header />
      
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <GaitTypes />
        <WhyChoose />
        <Contact />
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={NextstepLogo} alt="Nextstep Logo" />
            </div>
            <div className="footer-info">
              <p>&copy; {new Date().getFullYear()} Next Step - Plantillas Digitalizadas a Medida</p>
            </div>
            <div className="footer-social">
              <a 
                href="https://www.instagram.com/nextsteep" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Síguenos en Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} title="Instagram" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61564477432169" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visítanos en Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} title="Facebook" />
              </a>
              <a 
                href="https://wa.me/541124011312" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Contáctanos por WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} title="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <Chatbot />
    </>
  );
}

export default App;
