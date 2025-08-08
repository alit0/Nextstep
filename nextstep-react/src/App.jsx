import React, { useState, useEffect } from 'react';
import './index.css';

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsNavActive(!isNavActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isHeaderScrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <div className="logo">
          NEXT <span className="step">STEP</span>
        </div>
        <div className={`nav-content ${isNavActive ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#inicio" onClick={toggleMobileMenu}>Inicio</a></li>
            <li><a href="#nosotros" onClick={toggleMobileMenu}>Nosotros</a></li>
            <li><a href="#servicios" onClick={toggleMobileMenu}>Servicios</a></li>
            <li><a href="#pisada" onClick={toggleMobileMenu}>Tu Pisada</a></li>
            <li><a href="#contacto" onClick={toggleMobileMenu}>Contacto</a></li>
            <div className="mobile-social">
              <a href="https://www.instagram.com/nextsteep" target="_blank" rel="noopener" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61564477432169" target="_blank" rel="noopener" title="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://wa.me/541124011312" target="_blank" rel="noopener" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </ul>
          <div className="nav-social">
            <a href="https://www.instagram.com/nextsteep" target="_blank" rel="noopener" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61564477432169" target="_blank" rel="noopener" title="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://wa.me/541124011312" target="_blank" rel="noopener" title="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
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
          <i className="fas fa-calendar-check"></i> Agenda tu Evaluación Gratuita
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
              <i className="fas fa-foot-print"></i>
            </div>
            <h4>Baropodometría Digital</h4>
            <p>Escaneamos tu pisada con tecnología digital para obtener un diagnóstico visual y preciso de los diferentes puntos de apoyo del pie.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-shoe-prints"></i>
            </div>
            <h4>Plantillas Personalizadas</h4>
            <p>Diseñadas 100% a medida con goma eva y resina termo-moldeable que se adapta perfectamente a tus pies.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-walking"></i>
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
            <i className="fas fa-shield-alt"></i>
            <h4>Garantía de 15 Días</h4>
            <p>Período de prueba completo con ajustes sin cargo adicional</p>
          </div>
          
          <div className="feature-card">
            <i className="fas fa-child"></i>
            <h4>Para Toda la Familia</h4>
            <p>Atendemos adultos y niños desde los 4 años de edad</p>
          </div>
          
          <div className="feature-card">
            <i className="fas fa-calendar-alt"></i>
            <h4>Durabilidad Garantizada</h4>
            <p>Nuestras plantillas duran hasta 1 año completo</p>
          </div>
          
          <div className="feature-card">
            <i className="fas fa-heart"></i>
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
            <i className="fab fa-whatsapp"></i> AGENDAR AHORA GRATIS
          </a>
          <div className="urgency-text">⏰ Solo quedan pocas fechas disponibles este mes</div>
        </div>
        
        <h2 className="section-title">Contactanos</h2>
        <p className="section-subtitle">Estamos aquí para ayudarte a mejorar tu calidad de vida</p>
        
        <div className="contact-grid">
          <div className="contact-info">
            <i className="fas fa-map-marker-alt"></i>
            <h4>Dirección</h4>
            <p>Tapia de Cruz 1382 Local N°4<br/>Belén de Escobar, Buenos Aires</p>
          </div>
          
          <div className="contact-info">
            <i className="fas fa-phone"></i>
            <h4>WhatsApp</h4>
            <p>+54 11 2401-1312</p>
          </div>
          
          <div className="contact-info">
            <i className="fas fa-envelope"></i>
            <h4>Email</h4>
            <p>plantillasnextstep@gmail.com</p>
          </div>
        </div>
        
        <div className="social-links">
          <a href="https://www.instagram.com/nextsteep" target="_blank" rel="noopener" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61564477432169" target="_blank" rel="noopener" title="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://wa.me/541124011312" target="_blank" rel="noopener" title="WhatsApp">
            <i className="fab fa-whatsapp"></i>
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

  useEffect(() => {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="chatbot-btn" onClick={toggleChatbot}>
        <i className="fas fa-comments"></i>
      </div>
      
      <div className="chatbot-window" id="chatbot-window" style={{ display: chatbotOpen ? 'flex' : 'none' }}>
        <div className="chatbot-header">
          <h4><i className="fas fa-robot"></i> Asistente Next Step</h4>
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
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
      });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.service-card, .gait-card, .feature-card, .contact-info').forEach(card => {
      observer.observe(card);
    });

  }, []);

  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Services />
      <GaitTypes />
      <WhyChoose />
      <Contact />
      <Chatbot />
    </div>
  );
}

export default App;