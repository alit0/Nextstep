import React, { useState, useEffect, lazy, Suspense } from 'react';
import './animations.css';
import './index.css';
import './components/sections/privacy-policy.css';
import './components/layout/footer.css';
import './components/sections/privacy-navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importar solo los iconos que se usan en este archivo principal
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faRobot } from '@fortawesome/free-solid-svg-icons/faRobot';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons/faShoePrints';
import { faWalking } from '@fortawesome/free-solid-svg-icons/faWalking';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons/faShieldAlt';
import { faChild } from '@fortawesome/free-solid-svg-icons/faChild';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import NextstepLogo from './assets/Nextstep.svg';

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const toggleMobileMenu = () => {
    setIsNavActive(!isNavActive);
  };

  // Método simple de detección por rangos de scroll
  useEffect(() => {
    const handleScroll = () => {
      // Detectar si el header debe estar scrolled
      if (window.scrollY > 100) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
      
      // Obtener todos los elementos de sección
      // No usamos 'inicio' directamente, pero lo mantenemos consistente en la detección
      const nosotros = document.getElementById('nosotros');
      const servicios = document.getElementById('servicios');
      const pisada = document.getElementById('pisada');
      const contacto = document.getElementById('contacto');
      
      // Establecer umbrales fijos para cada sección
      const scrollY = window.scrollY;
      
      // Logica simplificada basada en el desplazamiento
      if (scrollY < nosotros?.offsetTop - 100) {
        setActiveSection('inicio');
      } else if (scrollY < servicios?.offsetTop - 100) {
        setActiveSection('nosotros');
      } else if (scrollY < pisada?.offsetTop - 100) {
        setActiveSection('servicios');
      } else if (scrollY < contacto?.offsetTop - 100) {
        setActiveSection('pisada');
      } else {
        setActiveSection('contacto');
      }
    };

    // Añadir listener
    window.addEventListener('scroll', handleScroll);
    
    // Ejecutar inmediatamente
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Sin dependencia para evitar problemas

  return (
    <header className={`header ${isHeaderScrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <div className="logo">
          <img src={NextstepLogo} className="logo" alt="Nextstep logo" />
        </div>
        <div className={`nav-content ${isNavActive ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#inicio" onClick={toggleMobileMenu} className={activeSection === 'inicio' ? 'active' : ''}>Inicio</a></li>
            <li><a href="#nosotros" onClick={toggleMobileMenu} className={activeSection === 'nosotros' ? 'active' : ''}>Nosotros</a></li>
            <li><a href="#servicios" onClick={toggleMobileMenu} className={activeSection === 'servicios' ? 'active' : ''}>Servicios</a></li>
            <li><a href="#pisada" onClick={toggleMobileMenu} className={activeSection === 'pisada' ? 'active' : ''}>Tu Pisada</a></li>
            <li><a href="#contacto" onClick={toggleMobileMenu} className={activeSection === 'contacto' ? 'active' : ''}>Contacto</a></li>
            <div className="mobile-social">
              <a href="https://www.instagram.com/nextsteep" target="_blank" rel="noopener" title="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61564477432169" target="_blank" rel="noopener" title="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://wa.me/541124011312" target="_blank" rel="noopener" title="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </ul>
        </div>
        <div className={`mobile-menu ${isNavActive ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1>Plantillas Digitalizadas a Medida</h1>
        <p>Cuidamos la salud de tus músculos y articulaciones con tecnología de última generación para evaluar la biomecánica de tu pie</p>
        <a href="#contacto" className="cta-button">
          <FontAwesomeIcon icon={faCalendarCheck} /> Agenda tu Evaluación
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="section about">
      <div className="container">
        <h2 className="section-title">Sobre Nosotros</h2>
        <p className="section-subtitle">Somos un equipo de salud dedicado al cuidado, prevención y concientización del desarrollo y funcionamiento biomecánico del cuerpo humano.</p>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Nuestra Misión</h3>
            <p>Equilibramos la vida brindando la información para un cuerpo donde los síntomas no sean un límite. Diseñamos plantillas digitalizadas a medida para ayudarte a que te muevas con seguridad y disfrutes de las actividades que te apasionan.</p>
            <p>Nuestra metodología de trabajo y tecnología nos permite evaluar al paciente en su totalidad para mejorar su calidad de vida y bienestar.</p>
          </div>
          
          <div className="professional">
            <h4>Nuestro Profesional</h4>
            <h5>NICOLÁS MILAZZO</h5>
            <p><strong>Lic. Terapia Física - Osteópata</strong></p>
            <p>Con múltiples certificaciones internacionales en:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>• Tapping Neuromuscular</li>
              <li>• Kinesiología deportiva aplicada al Running</li>
              <li>• Rehabilitación Postural</li>
              <li>• Osteopatía EOBA</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="section services">
      <div className="container">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="section-subtitle">Utilizamos tecnología de vanguardia para brindarte el mejor cuidado podal</p>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <FontAwesomeIcon icon={faShoePrints} />
            </div>
            <h4>Baropodometría Digital</h4>
            <p>Escaneamos tu pisada con tecnología digital para obtener un diagnóstico visual y preciso de los diferentes puntos de apoyo del pie.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <FontAwesomeIcon icon={faShoePrints} />
            </div>
            <h4>Plantillas Personalizadas</h4>
            <p>Diseñadas 100% a medida con goma eva y resina termo-moldeable que se adapta perfectamente a tus pies.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <FontAwesomeIcon icon={faWalking} />
            </div>
            <h4>Estudio Digital de Marcha</h4>
            <p>Análisis completo de datos estáticos y dinámicos de tus pisadas, ideal para deportistas y uso diario.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GaitTypes() {
  return (
    <section id="pisada" className="section gait-types">
      <div className="container">
        <h2 className="section-title">Conoce Tu Pisada</h2>
        <p className="section-subtitle">Identificamos tu tipo de pisada para diseñar la plantilla perfecta para ti</p>
        
        <div className="gait-grid">
          <div className="gait-card pronada">
            <h4>PISADA PRONADA (Plano)</h4>
            <p>El pie se va hacia afuera y el arco colapsa para absorber el impacto. Necesita corrección específica para evitar lesiones.</p>
          </div>
          
          <div className="gait-card neutra">
            <h4>PISADA NEUTRA</h4>
            <p>Los pies y tobillos mantienen la línea vertical. Es la pisada ideal que buscamos mantener o lograr.</p>
          </div>
          
          <div className="gait-card supinada">
            <h4>PISADA SUPINADA (Cavo)</h4>
            <p>El apoyo es hacia el borde externo y el pie no rota hacia adentro. Requiere soporte especializado.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section why-choose">
      <div className="container">
        <h2 className="section-title">¿Por Qué Elegir Next Step?</h2>
        <p className="section-subtitle">Beneficios que solo nuestras plantillas personalizadas pueden ofrecerte</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon={faShieldAlt} size="3x" />
            <h4>Garantía de 15 Días</h4>
            <p>Período de prueba completo con ajustes sin cargo adicional</p>
          </div>
          
          <div className="feature-card">
            <FontAwesomeIcon icon={faChild} size="3x" />
            <h4>Para Toda la Familia</h4>
            <p>Atendemos adultos y niños desde los 4 años de edad</p>
          </div>
          
          <div className="feature-card">
            <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
            <h4>Durabilidad Garantizada</h4>
            <p>Nuestras plantillas duran hasta 1 año completo</p>
          </div>
          
          <div className="feature-card">
            <FontAwesomeIcon icon={faHeart} size="3x" />
            <h4>Prevención de Lesiones</h4>
            <p>Reduce compensaciones y alivia dolencias articulares y musculares</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="section contact">
      <div className="container">
        <div className="urgent-cta">
          <div className="highlight">🎯 OFERTA LIMITADA</div>
          <h3>¡EVALUACIÓN GRATUITA por Tiempo Limitado!</h3>
          <p><strong>Ahorra $15.000</strong> en tu consulta inicial. Descubre qué está causando tus dolores y cómo las plantillas personalizadas pueden cambiar tu vida.</p>
          <a href="https://wa.me/541124011312?text=¡Hola!%20Quiero%20agendar%20mi%20evaluación%20GRATUITA%20de%20pisada.%20¿Cuándo%20tienen%20disponibilidad?" target="_blank" className="mega-button">
            <FontAwesomeIcon icon={faWhatsapp} /> AGENDAR AHORA GRATIS
          </a>
          <div className="urgency-text">⏰ Solo quedan pocas fechas disponibles este mes</div>
        </div>
        
        <h2 className="section-title">Contactanos</h2>
        <p className="section-subtitle">Estamos aquí para ayudarte a mejorar tu calidad de vida</p>
        
        <div className="contact-grid">
          <div className="contact-info">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <h4>Dirección</h4>
            <p>Tapia de Cruz 1382 Local N°4<br/>Belén de Escobar, Buenos Aires</p>
          </div>
          
          <div className="contact-info">
            <FontAwesomeIcon icon={faPhone} />
            <h4>WhatsApp</h4>
            <p>+54 11 2401-1312</p>
          </div>
          
          <div className="contact-info">
            <FontAwesomeIcon icon={faEnvelope} />
            <h4>Email</h4>
            <p>plantillasnextstep@gmail.com</p>
          </div>
        </div>
        
        <div className="social-links">
          <a href="https://www.instagram.com/nextsteep" target="_blank" rel="noopener" title="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61564477432169" target="_blank" rel="noopener" title="Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://wa.me/541124011312" target="_blank" rel="noopener" title="WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Chatbot() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: '¡Hola! 👋 Soy el asistente de Next Step. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showAttention, setShowAttention] = useState(false);

  const chatbotResponses = {
    '¿Cómo funciona la evaluación?': 'La evaluación es completamente gratuita 🆓. Utilizamos un scanner digital (baropodometría) para analizar tu pisada. Te mostraremos visualmente los puntos de presión y te explicaremos si necesitas plantillas personalizadas. ¡Todo en una sola sesión!',
    '¿Cuánto cuestan las plantillas?': 'El precio varía según tu caso específico 💰. Incluyen: evaluación gratuita, plantillas 100% personalizadas, materiales de primera calidad y garantía de 15 días con ajustes sin cargo. ¡Contactanos por WhatsApp para un presupuesto personalizado!',
    '¿Atienden niños?': '¡Por supuesto! 👶 Atendemos niños desde los 4 años. Es muy importante evaluar la pisada durante el crecimiento para prevenir problemas futuros. Entre los 3-10 años los huesos del pie son más moldeables, ¡es el momento ideal!',
    'Quiero agendar una cita': '¡Excelente! 📅 Para agendar tu evaluación gratuita puedes: \n• Llamarnos al +54 11 2401-1312 \n• Escribirnos por WhatsApp \n• Enviarnos un email a plantillasnextstep@gmail.com \n¡Estamos en Belén de Escobar!'
  };

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const handleSendMessage = (messageText) => {
    if (messageText.trim() === '') return;

    const newUserMessage = { type: 'user', text: messageText };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = chatbotResponses[messageText] || 'Gracias por tu consulta. Te recomiendo contactarnos directamente para más información específica. 📞';
      const newBotMessage = { type: 'bot', text: botResponse };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputMessage);
    }
  };

  const selectQuickOption = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      handleSendMessage(selectedValue);
    }
  };

  // Efecto para manejar la atención del botón
  useEffect(() => {
    // Activar la animación de atención después de 5 segundos si el chat está cerrado
    const attentionTimeout = setTimeout(() => {
      if (!chatbotOpen) {
        setShowAttention(true);
      }
    }, 5000);
    
    // Mostrar un mensaje recordatorio cada 45 segundos si el chat está cerrado
    const reminderInterval = setInterval(() => {
      if (!chatbotOpen && Math.random() > 0.5) { // 50% de probabilidad para no ser muy invasivo
        setShowAttention(true);
        
        // Desactivar el efecto después de 5 segundos
        setTimeout(() => {
          setShowAttention(false);
        }, 5000);
      }
    }, 45000); // 45 segundos
    
    return () => {
      clearTimeout(attentionTimeout);
      clearInterval(reminderInterval);
    };
  }, [chatbotOpen]);
  
  // Efecto para mantener el scroll del chat hacia abajo
  useEffect(() => {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={`chatbot-btn ${showAttention ? 'chatbot-btn-attention' : ''}`} onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faComments} />
      </div>
      
      <div className="chatbot-window" id="chatbot-window" style={{ display: chatbotOpen ? 'flex' : 'none' }}>
        <div className="chatbot-header">
          <h4><FontAwesomeIcon icon={faRobot} /> Asistente Next Step</h4>
          <button className="close-chat" onClick={toggleChatbot}>&times;</button>
        </div>
        <div className="chatbot-messages" id="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}-message`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="quick-options">
          <select onChange={selectQuickOption} id="quick-select">
            <option value="">Preguntas frecuentes...</option>
            <option value="¿Cómo funciona la evaluación?">¿Cómo funciona la evaluación?</option>
            <option value="¿Cuánto cuestan las plantillas?">¿Cuánto cuestan las plantillas?</option>
            <option value="¿Atienden niños?">¿Atienden niños?</option>
            <option value="Quiero agendar una cita">Quiero agendar una cita</option>
            <option value="¿Qué incluye la garantía?">¿Qué incluye la garantía?</option>
            <option value="¿Dónde están ubicados?">¿Dónde están ubicados?</option>
          </select>
        </div>
        <div className="chat-input-container">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Escribe tu mensaje..." 
            id="chat-input" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-btn" onClick={() => handleSendMessage(inputMessage)} disabled={!inputMessage.trim()}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </>
  );
}

// Lazy load para componentes pesados
const LazyAbout = lazy(() => import('./components/sections/About.jsx'));
const LazyContact = lazy(() => import('./components/sections/Contact.jsx'));
const LazyServices = lazy(() => import('./components/sections/Services.jsx'));
const LazyGaitTypes = lazy(() => import('./components/sections/GaitTypes.jsx'));
const LazyWhyChoose = lazy(() => import('./components/sections/WhyChoose.jsx'));
const LazyPrivacyPolicy = lazy(() => import('./components/sections/PrivacyPolicy.jsx'));

// Componente de carga mientras los componentes lazy se cargan
const LoadingFallback = () => <div className="loading-container">Cargando...</div>;

// Componente Footer con enlaces legales
function Footer({ showPrivacyPage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={NextstepLogo} alt="Nextstep Logo" />
          </div>
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} Next Step - Plantillas Digitalizadas a Medida</p>
            <p>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                showPrivacyPage();
              }} className="footer-link">Política de Privacidad</a>
            </p>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/nextsteep" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61564477432169" target="_blank" rel="noopener noreferrer" aria-label="Visítanos en Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://wa.me/541124011312" target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [showPrivacyPage, setShowPrivacyPage] = useState(false);
  
  useEffect(() => {
    // Smooth scrolling con mejor performance usando requestAnimationFrame
    const smoothScroll = (targetId) => {
      const target = document.querySelector(targetId);
      if (!target) return;
      
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800; // ms
      let startTime = null;
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // función de ease-in-out
        
        window.scrollTo(0, startPosition + distance * ease(progress));
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      requestAnimationFrame(animation);
    };
    
    // Delegación de eventos para mejor performance
    document.body.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        smoothScroll(anchor.getAttribute('href'));
      }
    });

    // Animation on scroll optimizado
    const observerOptions = {
      threshold: 0.15, // Mejor umbral
      rootMargin: '0px 0px -50px 0px'
    };

    // Crear observador una sola vez
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          // Usar clases CSS para animar en lugar de estilo inline
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    // Observer con requestIdleCallback para mejor rendimiento
    const elementsToObserve = document.querySelectorAll('.service-card, .gait-card, .feature-card, .contact-info');
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        elementsToObserve.forEach(card => observer.observe(card));
      });
    } else {
      // Fallback para navegadores que no soportan requestIdleCallback
      elementsToObserve.forEach(card => observer.observe(card));
    }
    
    // Limpieza al desmontar
    return () => {
      elementsToObserve.forEach(element => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {!showPrivacyPage ? (
        <>
          <Header />
          <Hero />
          <Suspense fallback={<LoadingFallback />}>
            <LazyAbout />
            <LazyServices />
            <LazyGaitTypes />
            <LazyWhyChoose />
            <LazyContact />
          </Suspense>
          <Chatbot />
          <Footer showPrivacyPage={() => setShowPrivacyPage(true)} />
        </>
      ) : (
        <>
          <div className="privacy-page-container">
            <div className="privacy-header">
              <button onClick={() => setShowPrivacyPage(false)} className="back-button">
                &larr; Volver al inicio
              </button>
            </div>
            <LazyPrivacyPolicy />
            <div className="privacy-footer-nav">
              <button onClick={() => setShowPrivacyPage(false)} className="back-button">
                &larr; Volver al inicio
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;