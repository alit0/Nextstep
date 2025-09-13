import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import '../accessibility.css';
import '../fixes.css';
import '../components/sections/privacy-policy.css';
import '../components/sections/privacy-navigation.css';
import '../components/sections/data-deletion.css';
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

// Importación de páginas legales
const PrivacyPolicy = lazy(() => import('./sections/PrivacyPolicy'));
const DataDeletionInstructions = lazy(() => import('./sections/DataDeletionInstructions'));

// Componente para el fallback de carga
const LoadingFallback = () => <div className="loading-container">Cargando...</div>;

/**
 * Componente principal de la aplicación
 * Integra todos los componentes siguiendo una estructura organizada y accesible
 */
function App() {
  // Estados para controlar la visibilidad de páginas legales
  const [showPrivacyPage, setShowPrivacyPage] = useState(false);
  const [showDeletionPage, setShowDeletionPage] = useState(false);
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
      {!showPrivacyPage && !showDeletionPage ? (
        // Vista principal de la aplicación
        <>
          {/* Skip link para accesibilidad */}
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
        </>
      ) : showPrivacyPage ? (
        // Vista de políticas de privacidad
        <div className="privacy-page-container">
          <div className="privacy-header">
            <button onClick={() => setShowPrivacyPage(false)} className="back-button">
              &larr; Volver al inicio
            </button>
          </div>
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPolicy showDeletionInstructions={() => {
              setShowPrivacyPage(false);
              setShowDeletionPage(true);
            }} />
          </Suspense>
          <div className="privacy-footer-nav">
            <button onClick={() => setShowPrivacyPage(false)} className="back-button">
              &larr; Volver al inicio
            </button>
          </div>
        </div>
      ) : (
        // Vista de instrucciones de eliminación de datos
        <div className="privacy-page-container">
          <div className="privacy-header">
            <div className="header-nav-buttons">
              <button onClick={() => {
                setShowDeletionPage(false);
                setShowPrivacyPage(false);
              }} className="back-button">
                &larr; Volver al inicio
              </button>
              <button onClick={() => {
                setShowDeletionPage(false);
                setShowPrivacyPage(true);
              }} className="secondary-button">
                Volver a Política de Privacidad
              </button>
            </div>
          </div>
          <Suspense fallback={<LoadingFallback />}>
            <DataDeletionInstructions />
          </Suspense>
          <div className="privacy-footer-nav">
            <button onClick={() => {
              setShowDeletionPage(false);
              setShowPrivacyPage(false);
            }} className="back-button">
              &larr; Volver al inicio
            </button>
          </div>
        </div>
      )}
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={NextstepLogo} alt="Nextstep Logo" />
            </div>
            <div className="footer-info">
              <p>&copy; {new Date().getFullYear()} Next Step - Plantillas Digitalizadas a Medida</p>
              <p>
                <Link to="/politicas" className="footer-link">Política de Privacidad</Link>
              </p>
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
