import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import heroVideo from '../../assets/videos/hero.mp4';

/**
 * Componente Hero - Sección principal de la landing page
 * Implementa elementos semánticos y accesibles para mejorar la experiencia de usuario
 */
function Hero() {
  // Función para manejar interacciones de teclado en elementos interactivos
  const handleKeyboardAction = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  // Función para ir a la sección de contacto
  const goToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={heroVideo} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
      <div className="hero-content">
        <h1 id="hero-title">Plantillas Digitalizadas a Medida</h1>
        <p>Cuidamos la salud de tus músculos y articulaciones con tecnología de última generación para evaluar la biomecánica de tu pie</p>
        
        <a 
          href="#contacto" 
          className="cta-button"
          onClick={(e) => { 
            e.preventDefault(); 
            goToContact(); 
          }}
          onKeyDown={(e) => handleKeyboardAction(e, goToContact)}
          aria-label="Agenda tu evaluación personalizada"
          role="button"
        >
          <FontAwesomeIcon 
            icon={faCalendarCheck} 
            aria-hidden="true" 
          /> 
          <span>Agenda tu Evaluación</span>
        </a>
      </div>
    </section>
  );
}

export default Hero;
