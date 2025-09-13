import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faRobot, faPaperPlane, faTimes, faMicrophone, faPlay, faPause, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import './permission-styles.css';
import './chatbot-reconnection.css';

/**
 * Componente Chatbot - Chat de asistencia virtual accesible
 * Implementa diálogos ARIA, manejo de foco y navegación por teclado
 */
function Chatbot() {
  // Función para formatear tiempo de grabación (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Estados para controlar el chatbot
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');  
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [micPermissionStatus, setMicPermissionStatus] = useState('unknown'); // 'unknown', 'denied', 'granted'
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  const [microphoneStream, setMicrophoneStream] = useState(null); // Store the stream separately
  const recordingIntervalRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const micButtonRef = useRef(null);
  const sessionIdRef = useRef(null);
  // Usar la URL de webhook apropiada (testWebhook para pruebas, prodWebhook para producción)
  const WEBHOOK_URL = import.meta.env.VITE_TEST_N8N_URL;
  
  // Constantes para webhook
  const MAX_WEBHOOK_RETRIES = 3;
  const WEBHOOK_RETRY_DELAY = 2000; // 2 segundos
  const WEBHOOK_TIMEOUT = 60000; // 60 segundos máximo para la respuesta
  
  // Nota: Ya no utilizamos patrones para detectar listas y elementos

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

  // Función para enviar mensajes al webhook (permite audio y texto)
  const sendMessageToWebhook = useCallback(async (message, isAudio = false) => {
    // Preparar datos para la solicitud
    let body;
    const headers = {};
    
    // Diferentes formatos según sea audio o texto
    if (isAudio && message instanceof Blob) {
      const formData = new FormData();
      formData.append('audio', message, 'audio.webm');
      formData.append('sessionId', sessionIdRef.current || `audio-${Date.now()}`);
      body = formData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify({
        message: message,
        sessionId: sessionIdRef.current || `text-${Date.now()}`
      });
    }
    
    // Envío sin timeout para permitir respuestas largas (hasta 60+ segundos)
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers,
      body
    });
    
    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }
    
    const responseText = await response.text();
    
    // Procesar respuesta (puede ser JSON o texto plano)
    try {
      const responseData = JSON.parse(responseText);
      const data = Array.isArray(responseData) ? responseData[0] : responseData;
      return data.output || data.text || data.message || responseText;
    } catch {
      // Si no es JSON válido, devolver el texto tal cual
      return responseText;
    }
  }, [WEBHOOK_URL]);

  // Solicitar permiso de micrófono de forma explícita
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Permiso concedido
      setMicPermissionStatus('granted');
      setShowPermissionButton(false);
      
      // Detener los tracks para no mantener el micrófono abierto
      stream.getTracks().forEach(track => track.stop());
      
      return true;
    } catch (error) {
      console.error('Error solicitando permiso de micrófono:', error);
      
      if (error.name === 'NotAllowedError') {
        setMicPermissionStatus('denied');
        console.warn('Permiso de micrófono denegado.');
      } else if (error.name === 'NotFoundError') {
        console.warn('No se encontró ningún micrófono conectado.');
      }
      
      setShowPermissionButton(true);  // Mostrar botón para volver a intentar
      return false;
    }
  };
  
  // Verificar y solicitar permisos explícitamente
  const checkMicrophonePermission = async () => {
    try {
      console.log('Verificando permisos de micrófono...');
      
      // Verificar si el navegador tiene la API de permisos
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'microphone' });
        console.log('Estado de permisos del micrófono:', result.state);
        
        setMicPermissionStatus(result.state);
        
        // Configurar eventos de cambio de estado de permisos
        result.onchange = () => {
          console.log('¡Estado de permiso cambiado a:', result.state);
          setMicPermissionStatus(result.state);
          
          if (result.state === 'granted') {
            setShowPermissionButton(false);
          } else {
            setShowPermissionButton(true);
          }
        };
        
        if (result.state === 'denied') {
          // Permisos denegados anteriormente
          console.warn('Permisos de micrófono denegados');
          setShowPermissionButton(true);
          return false;
        }
        
        if (result.state === 'prompt') {
          // Si está en estado prompt, siempre mostrar el botón de permiso
          console.log('Permisos en estado prompt - mostrando botón de solicitud');
          setShowPermissionButton(true);
          // Retornar false para que el usuario tenga que hacer clic explícito
          return false;
        }
        
        // Si está en estado granted, podemos continuar
        if (result.state === 'granted') {
          console.log('Permisos ya concedidos');
          setShowPermissionButton(false);
          return true;
        }

        // Si llegamos aquí, intentar solicitar permiso explícitamente
        return await requestMicrophonePermission();
      }
      
      // Si no hay API de permisos, mostrar botón y esperar clic explícito
      console.log('API de permisos no disponible, mostrando botón');
      setShowPermissionButton(true);
      return false;
    } catch (error) {
      console.error('Error checking microphone permission:', error);
      setShowPermissionButton(true);
      return false;
    }
  };

  // Inicializar grabación de audio
  const initializeRecording = async () => {
    try {
      // Verificar si el navegador soporta getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Tu navegador no soporta grabación de audio');
      }

      // Verificar permisos antes de solicitar
      const canProceed = await checkMicrophonePermission();
      if (!canProceed) {
        // Mostrar botón de solicitud de permiso explícito
        setShowPermissionButton(true);
        return null;
      }

      // Solicitar acceso al micrófono
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });
      
      // Actualizar estado para reflejar que el permiso ha sido concedido
      setMicPermissionStatus('granted');
      setShowPermissionButton(false);
      
      // Almacenar el stream en el estado para poder acceder a él más tarde
      setMicrophoneStream(stream);
      
      // Crear MediaRecorder sin opciones específicas para máxima compatibilidad
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = recorder;
      return recorder;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      
      let errorMessage = 'No se pudo acceder al micrófono. ';
      if (error.name === 'NotAllowedError') {
        // Actualizar estado para mostrar que el permiso fue denegado
        setMicPermissionStatus('denied');
        errorMessage += 'Debes permitir el acceso al micrófono en tu navegador.\n\n' +
                        'Si no ves el diálogo de permisos:\n' +
                        '1. Haz clic en el icono de candado/sitio en la barra de direcciones\n' +
                        '2. Cambia los permisos del micrófono a "Permitir"\n' +
                        '3. Recarga la página';
        
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No se encontró ningún micrófono conectado.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Tu navegador no soporta grabación de audio.';
      } else {
        errorMessage += 'Verifica los permisos y que tengas un micrófono conectado.';
      }
      
      // Asegurar que se muestre el botón de permiso explícito
      setShowPermissionButton(true);
      console.warn(errorMessage);
      return null;
    }
  };

  // Iniciar grabación
  const startRecording = async () => {
    try {
      // Siempre crear un nuevo recorder para evitar problemas de estado
      const recorder = await initializeRecording();
      if (!recorder) return;

      // Limpiar los chunks de audio anteriores
      audioChunksRef.current = [];
      setIsRecording(true);
      setRecordingTime(0);
      
      console.log('Iniciando grabación...');
      // Iniciar grabación sin timeslice para máxima compatibilidad
      recorder.start();
      
      // Contador de tiempo de grabación
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      console.warn('Error al iniciar la grabación: ' + error.message);
    }
  };

  // Detener grabación y enviar audio
  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || !isRecording) return;

    const currentDuration = recordingTime;

    recorder.onstop = async () => {
      // Evitar envío si ya hay uno en curso
      if (isProcessingMessage) {
        return;
      }
      
      // Procesar audio grabado
      const chunks = audioChunksRef.current;
      
      if (chunks && chunks.length > 0) {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Crear mensaje de audio con ID único
        const audioMessage = {
          id: `audio-${Date.now()}`,
          audioUrl: audioUrl,
          duration: currentDuration,
          isUser: true,
          isAudio: true
        };

        // Añadir mensaje al estado con validación de array
        setMessages(prev => [...(Array.isArray(prev) ? prev : []), audioMessage]);

        // Marcar que estamos procesando un mensaje e indicar espera
        setIsProcessingMessage(true);
        setIsTyping(true);
        
        try {
          // Enviar directamente el mensaje de audio
          const responseText = await sendMessageToWebhook(audioBlob, true);
          
          // Dividir la respuesta en múltiples mensajes
          const splitMessages = splitMessageIntoSentences(responseText);
          
          // Añadir cada parte como un mensaje separado
          const currentTime = Date.now();
          
          // Usar un enfoque secuencial para añadir mensajes
          for (let i = 0; i < splitMessages.length; i++) {
            const botMessage = {
              id: `bot-audio-${currentTime}-${i}`,
              text: splitMessages[i],
              isUser: false
            };
            
            // Añadir cada mensaje al chat
            setMessages(prev => [...(Array.isArray(prev) ? prev : []), botMessage]);
          }
        } catch {
          // Añadir mensaje de error genérico
          const errorMessage = {
            id: `error-audio-${Date.now()}`,
            text: 'Lo siento, hubo un problema al procesar tu mensaje de audio.',
            isUser: false,
            isError: true
          };
          
          setMessages(prev => [...(Array.isArray(prev) ? prev : []), errorMessage]);
        } finally {
          // Siempre desactivar indicador de espera y marcar que terminamos
          setIsTyping(false);
          setIsProcessingMessage(false);
        }
      } else {
        console.log('No audio chunks available');
      }

      mediaRecorderRef.current = null;
    };

    try {
      recorder.stop();

      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        setMicrophoneStream(null);
      }
    } catch (error) {
      console.error('Error stopping MediaRecorder:', error);
    }

    setIsRecording(false);
    setRecordingTime(0);

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
  };

  // Manejar eventos del botón de micrófono
  const handleMicMouseDown = () => {
    startRecording();
  };

  const handleMicMouseUp = () => {
    stopRecording();
  };

  const handleMicMouseLeave = () => {
    if (isRecording) {
      stopRecording();
    }
  };

  const handleMicTouchStart = (e) => {
    e.preventDefault();
    startRecording();
  };

  const handleMicTouchEnd = (e) => {
    e.preventDefault();
    stopRecording();
  };

  // Variable para controlar si hay una solicitud en curso
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);

  // Función mejorada para enviar mensajes de texto
  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isProcessingMessage) return; // Evitar envío si ya hay uno en curso
    
    // Crear mensaje del usuario con ID único
    const userMessage = {
      id: `user-${Date.now()}`,
      text: trimmedInput,
      isUser: true
    };
    
    // Guardar mensaje y limpiar input primero
    const messageToSend = trimmedInput;
    setInputValue('');
    
    // Añadir mensaje al estado usando una función para prevenir problemas
    setMessages(prevMessages => {
      // Usar un array nuevo para evitar problemas de renderizado
      return [...(Array.isArray(prevMessages) ? prevMessages : []), userMessage];
    });
    
    // Marcar que estamos procesando un mensaje e indicar espera
    setIsProcessingMessage(true);
    setIsTyping(true);
    
    try {
      // Enviar mensaje al webhook y obtener respuesta
      const responseText = await sendMessageToWebhook(messageToSend, false);
      
      // Dividir la respuesta en múltiples mensajes
      const splitMessages = splitMessageIntoSentences(responseText);
      
      // Añadir cada parte como un mensaje separado
      const currentTime = Date.now();
      
      // Usar un enfoque secuencial para añadir mensajes
      for (let i = 0; i < splitMessages.length; i++) {
        const botMessage = {
          id: `bot-${currentTime}-${i}`,
          text: splitMessages[i],
          isUser: false
        };
        
        // Añadir cada mensaje al chat
        setMessages(prev => [...(Array.isArray(prev) ? prev : []), botMessage]);
      }
    } catch {
      // Añadir mensaje de error genérico
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: 'Lo siento, hubo un problema al procesar tu mensaje. Por favor inténtalo de nuevo.',
        isUser: false,
        isError: true
      };
      
      setMessages(prev => [...(Array.isArray(prev) ? prev : []), errorMessage]);
    } finally {
      // Desactivar indicador de espera y marcar que terminamos de procesar
      setIsTyping(false);
      setIsProcessingMessage(false);
    }
  };

  // Manejar clic en el botón de envío
  const handleSendClick = () => {
    sendMessage();
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

  // Función para dividir mensajes exactamente como lo solicita el usuario
  const splitMessageIntoSentences = useCallback((message) => {
    // Si no hay mensaje o no es texto, devolver como está
    if (!message || typeof message !== 'string') {
      return [message];
    }

    
    // Caso especial: puntos numerados para agendar un turno
    if (message.includes('agendar un turno') && message.includes('consultorio') && 
        message.includes('1.') && message.includes('2.')) {
      
      // Extraer las tres partes como en el ejemplo
      const firstBreak = message.indexOf('\n\nPara ayudarte');
      const lastBreak = message.lastIndexOf('\n\nUna vez');
      
      if (firstBreak > 0 && lastBreak > firstBreak) {
        return [
          // Primera parte: saludo inicial
          message.substring(0, firstBreak).trim().replace(/\n/g, '<br>'),
          
          // Segunda parte: instrucciones con puntos numerados
          message.substring(firstBreak + 2, lastBreak).trim().replace(/\n/g, '<br>'),
          
          // Tercera parte: mensaje final
          message.substring(lastBreak + 2).trim().replace(/\n/g, '<br>')
        ];
      }
    }
    
    // Caso genérico: dividir por \n\n y convertir \n simples en <br>
    if (message.includes('\n\n')) {
      // Dividir por dobles saltos de línea
      return message
        .split(/\n\n+/)
        .map(part => part.trim())
        .filter(part => part.length > 0)
        .map(part => part.replace(/\n/g, '<br>')); // Convertir \n simples a <br>
    }
    
    // Si no hay dobles saltos de línea, convertir los saltos simples a <br>
    if (message.includes('\n')) {
      return [message.replace(/\n/g, '<br>')];
    }
    
    // Si no hay saltos de línea, mantener como un solo mensaje
    return [message];
  }, []);

  // Nota: La función reconnectChatbot ha sido eliminada ya que no se usa con el nuevo enfoque simplificado
  // Ya no manejamos reconexiones automáticas para evitar problemas de estado

  // Nota: La función addToPendingQueue ha sido eliminada para simplificar
  // Ya no manejamos colas de mensajes pendientes
  
  // Nota: La función formatLongMessage ha sido eliminada para simplificar
  // Ya no hacemos procesamiento de mensajes largos para evitar problemas de renderizado

  // Nota: La función processPendingMessages ha sido eliminada para simplificar el código
  // y evitar problemas de estado. Ya no se maneja una cola de mensajes pendientes.

  // Función mínima para el manejo de visibilidad - sin efectos secundarios
  const handleVisibilityChange = useCallback(() => {
    // No hacemos nada cuando cambia la visibilidad, lo dejamos como referencia
  }, []);

  // Efecto para inicializar el sessionId y configurar detector de visibilidad
  useEffect(() => {
    // Crear un nuevo sessionId para cada sesión
    sessionIdRef.current = `chatbot-${Date.now()}`;
    
    // Configurar detector de visibilidad
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

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

  // Limpiar recursos al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpiar intervalo de grabación
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      
      // Asegurarse de cerrar cualquier stream de micrófono activo
      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [microphoneStream]);

  // Componente para mostrar mensajes de audio
  const AudioMessage = ({ audioUrl, duration, isUser }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleSeek = (e) => {
      if (audioRef.current && audioRef.current.duration) {
        const progressBar = e.currentTarget;
        const clickPosition = e.nativeEvent.offsetX;
        const barWidth = progressBar.clientWidth;
        audioRef.current.currentTime = (clickPosition / barWidth) * audioRef.current.duration;
      }
    };

    const totalDuration = audioRef.current && !isNaN(audioRef.current.duration) ? audioRef.current.duration : duration;
    const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

    return (
      <div className={`audio-message ${isUser ? 'user' : 'bot'}`}>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={() => setCurrentTime(0)}
        />
        <button
          className="audio-play-btn"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <div className="audio-info">
          <div className="audio-waveform" onClick={handleSeek}>
            <div className="audio-progress" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="audio-duration">
            {formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(totalDuration))}
          </span>
        </div>
      </div>
    );
  };

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
            
            {/* Listado de mensajes - implementación que maneja etiquetas <br> */}
            {Array.isArray(messages) && messages.map((message, index) => {
              // Preparar el texto del mensaje para manejar tags <br>
              const messageText = message.text || "[Sin texto]";
              
              // Dividir por <br> para convertir a elementos React
              const textParts = messageText.split('<br>');
              
              return (
                <div 
                  key={`message-${message.id || index}`}
                  className={`chat-message ${message.isUser ? 'user' : 'bot'}`}
                >
                  {message.isAudio ? (
                    <AudioMessage 
                      audioUrl={message.audioUrl} 
                      duration={message.duration} 
                      isUser={message.isUser} 
                    />
                  ) : (
                    <span>
                      {/* Renderizar partes con <br> intercalados */}
                      {textParts.map((part, i) => (
                        <React.Fragment key={`part-${i}`}>
                          {i > 0 && <br />}
                          {part}
                        </React.Fragment>
                      ))}
                    </span>
                  )}
                </div>
              );
            })}
            
            {/* Indicador de escritura solo visible cuando hay procesamiento */}
            {isTyping && isProcessingMessage && (
              <div className="chat-message bot typing">
                <span>Procesando tu consulta<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></span>
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
              placeholder={isRecording ? "Grabando audio..." : "Escribe tu mensaje aquí..."}
              aria-label="Mensaje para el asistente virtual"
              ref={inputRef}
              disabled={isRecording}
            />
            
            {/* Botón de envío */}
            <button 
              className="chatbot__send-button" 
              aria-label="Enviar mensaje" 
              title="Enviar mensaje"
              onClick={handleSendClick}
              disabled={isRecording}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            
            {/* Botón de permiso de micrófono - aparece cuando se necesita solicitar permiso */}
            {showPermissionButton && micPermissionStatus !== 'granted' && (
              <button
                className="chatbot__permission-button"
                aria-label="Permitir acceso al micrófono"
                title="Hacer clic para permitir acceso al micrófono"
                onClick={requestMicrophonePermission}
              >
                <FontAwesomeIcon icon={faMicrophoneSlash} />
                <span className="permission-text">Permitir micrófono</span>
              </button>
            )}
            
            {/* Botón de micrófono para grabación de voz */}
            <button 
              className={`chatbot__mic-button ${isRecording ? 'recording' : ''}`}
              aria-label={isRecording ? 'Detener grabación' : 'Grabar mensaje de voz'}
              title={isRecording ? 'Detener grabación' : 'Mantén presionado para grabar'}
              onMouseDown={handleMicMouseDown}
              onMouseUp={handleMicMouseUp}
              onMouseLeave={handleMicMouseLeave}
              onTouchStart={handleMicTouchStart}
              onTouchEnd={handleMicTouchEnd}
              ref={micButtonRef}
              disabled={isTyping || micPermissionStatus === 'denied'}
            >
              <FontAwesomeIcon icon={faMicrophone} />
              {isRecording && (
                <span className="recording-time">{formatTime(recordingTime)}</span>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
