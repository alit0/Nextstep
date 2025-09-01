import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faRobot, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente Chatbot - Chat de asistencia virtual accesible
 * Implementa diálogos ARIA, manejo de foco y navegación por teclado
 */
function Chatbot() {
  // Estados para controlar el chatbot
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Referencias para manejo de DOM
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Preguntas frecuentes predefinidas para respuestas automáticas
  const faqResponses = {
    'hola': '¡Hola! Soy el asistente virtual de Nextstep. ¿En qué puedo ayudarte?',
    'precio': 'El precio de nuestras plantillas personalizadas varía según el tipo de pisada y las necesidades específicas. La evaluación inicial es completamente gratuita.',
    'turno': 'Para agendar una evaluación gratuita, puedes completar el formulario de contacto o llamarnos al 1124011312.',
    'ubicacion': 'Estamos ubicados en San Isidro, Buenos Aires. Te enviamos la dirección exacta cuando agendas tu cita.',
    'horario': 'Nuestro horario de atención es de lunes a viernes de 9:00 a 19:00 y sábados de 9:00 a 13:00.',
    'duracion': 'La evaluación inicial dura aproximadamente 30 minutos. La entrega de plantillas personalizadas es en 3-5 días hábiles.'
  };

  // Función para alternar la visibilidad del chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Manejar evento de teclado para el botón de alternar
  const handleToggleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChatbot();
    }
  };

  // Manejar cambio de entrada de texto
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Procesamiento de mensajes del usuario
  const processUserMessage = (message) => {
    // Convertir a minúsculas para facilitar la comparación
    const lowerMessage = message.toLowerCase();
    
    // Buscar palabras clave en el mensaje
    let response = '';
    for (const [keyword, resp] of Object.entries(faqResponses)) {
      if (lowerMessage.includes(keyword)) {
        response = resp;
        break;
      }
    }
    
    // Respuesta predeterminada si no se encuentra coincidencia
    if (!response) {
      response = 'Gracias por tu mensaje. Para una atención más personalizada, te recomendamos contactarnos directamente por teléfono al 1140898343 o completar el formulario de contacto.';
    }
    
    return response;
  };

  // Enviar mensaje
  const sendMessage = (e) => {
    e && e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: processUserMessage(userMessage.text),
        isUser: false
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
      
      // Notificar a lectores de pantalla que hay un nuevo mensaje
      const ariaLive = document.getElementById('chat-aria-live');
      if (ariaLive) {
        ariaLive.textContent = `Nuevo mensaje: ${botResponse.text}`;
      }
    }, 1000);
  };

  // Manejar el evento de teclado para enviar mensaje
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Manejar eventos de teclado para el chatbot
  const handleChatbotKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      toggleChatbot();
      toggleButtonRef.current?.focus();
    }
  };

  // Efecto para manejar el foco cuando se abre/cierra el chatbot
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Enfocar el input cuando se abre el chatbot
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Efecto para desplazar al final cuando hay nuevos mensajes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Botón para alternar chatbot */}
      <div 
        className="chatbot-btn" 
        onClick={toggleChatbot}
        onKeyDown={handleToggleKeyDown}
        role="button"
        tabIndex="0"
        ref={toggleButtonRef}
        aria-label={isOpen ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
        aria-expanded={isOpen}
        aria-controls="chatbot-dialog"
      >
        <FontAwesomeIcon icon={faComments} title="Chat de asistencia" />
        <span className="chatbot-tooltip">¿Necesitas ayuda?</span>
      </div>

      {/* Contenedor principal del chatbot */}
      {isOpen && (
        <div 
          id="chatbot-dialog"
          className="chatbot-container"
          role="dialog"
          aria-labelledby="chatbot-title"
          aria-modal="true"
          onKeyDown={handleChatbotKeyDown}
        >
          {/* Región de anuncios para lectores de pantalla */}
          <div 
            id="chat-aria-live" 
            className="sr-only" 
            aria-live="polite" 
            aria-relevant="additions"
          ></div>

          {/* Cabecera del chatbot */}
          <div className="chatbot-header">
            <FontAwesomeIcon icon={faRobot} aria-hidden="true" />
            <h3 id="chatbot-title">Asistente Virtual</h3>
            <button 
              className="close-btn" 
              onClick={toggleChatbot}
              aria-label="Cerrar chat"
            >
              <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
            </button>
          </div>
          
          {/* Contenedor de mensajes */}
          <div 
            className="chatbot-messages" 
            ref={chatContainerRef}
            role="log"
            aria-label="Conversación con asistente virtual"
          >
            {/* Mensaje inicial */}
            {messages.length === 0 && (
              <div className="chat-message bot">
                <span>¡Hola! Soy el asistente virtual de Nextstep. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre precios, horarios, ubicación o cómo agendar un turno.</span>
              </div>
            )}
            
            {/* Listado de mensajes */}
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`chat-message ${message.isUser ? 'user' : 'bot'}`}
                role={message.isUser ? 'listitem' : 'listitem'}
              >
                <span>{message.text}</span>
              </div>
            ))}
            
            {/* Indicador de escritura */}
            {isTyping && (
              <div className="chat-message bot typing">
                <span>Escribiendo<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></span>
              </div>
            )}
          </div>
          
          {/* Formulario de entrada */}
          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Escribe tu mensaje aquí..."
              aria-label="Mensaje para el asistente virtual"
              ref={inputRef}
            />
            <button 
              type="submit" 
              aria-label="Enviar mensaje"
              disabled={!inputValue.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
