import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import NextstepLogo from '../../assets/Nextstep.svg';

/**
 * Componente Header principal con navegación accesible
 * Implementa navegación por teclado, ARIA y semántica correcta
 */
function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsNavActive(!isNavActive);
  };

  const handleKeyboardToggle = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMobileMenu();
    }
  };

  // Cierra el menú si se presiona Escape
  const handleEscKey = (e) => {
    if (e.key === 'Escape' && isNavActive) {
      setIsNavActive(false);
    }
  };

  useEffect(() => {
    // Efecto para manejo de scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
    };

    // Agregar event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscKey);

    // Limpieza de event listeners al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isNavActive]); // Dependencia para handleEscKey

  return (
    <header className={`header ${isHeaderScrolled ? 'scrolled' : ''}`} role="banner">
      <nav className="nav" aria-label="Navegación principal">
        <div className="logo">
          <a href="#inicio" aria-label="Ir a la página de inicio">
            <img src={NextstepLogo} alt="Nextstep - Plantillas digitalizadas" />
          </a>
        </div>

        <button 
          className={`mobile-menu ${isNavActive ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          onKeyDown={handleKeyboardToggle}
          aria-expanded={isNavActive}
          aria-controls="nav-content"
          aria-label={isNavActive ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="linea1 sr-only">Menú</span>
          <span className="linea2"></span>
          <span className="linea3"></span>
        </button>

        <div 
          id="nav-content"
          className={`nav-content ${isNavActive ? 'active' : ''}`}
          aria-hidden={!isNavActive}
        >
          <ul className="nav-links">
            <li><a href="#inicio" onClick={toggleMobileMenu} aria-current={window.location.hash === '#inicio' ? 'page' : undefined}>Inicio</a></li>
            <li><a href="#nosotros" onClick={toggleMobileMenu} aria-current={window.location.hash === '#nosotros' ? 'page' : undefined}>Nosotros</a></li>
            <li><a href="#servicios" onClick={toggleMobileMenu} aria-current={window.location.hash === '#servicios' ? 'page' : undefined}>Servicios</a></li>
            <li><a href="#pisada" onClick={toggleMobileMenu} aria-current={window.location.hash === '#pisada' ? 'page' : undefined}>Tu Pisada</a></li>
            <li><a href="#contacto" onClick={toggleMobileMenu} aria-current={window.location.hash === '#contacto' ? 'page' : undefined}>Contacto</a></li>
          </ul>
          
          {/* Separar las redes sociales de los links de navegación para mejor estructura */}
          <div className="social-container">
            <div className="nav-social" role="group" aria-label="Redes sociales">
              <a 
                href="https://www.instagram.com/nextsteep" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Síguenos en Instagram"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faInstagram} title="Instagram" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61564477432169" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visítanos en Facebook"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faFacebook} title="Facebook" />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://wa.me/541124011312" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Contáctanos por WhatsApp"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faWhatsapp} title="WhatsApp" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>
          
          {/* Redes sociales para versión móvil */}
          <div className="mobile-social" role="group" aria-label="Redes sociales para móvil">
            <a 
              href="https://www.instagram.com/nextsteep" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Síguenos en Instagram"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faInstagram} title="Instagram" />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61564477432169" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visítanos en Facebook"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faFacebook} title="Facebook" />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href="https://wa.me/541124011312" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Contáctanos por WhatsApp"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faWhatsapp} title="WhatsApp" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
