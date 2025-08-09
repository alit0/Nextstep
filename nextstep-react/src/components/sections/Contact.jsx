import React, { useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import contactImage from '../../assets/img/calzado-mano.jpg';
import './contact.css'; // Importar estilos específicos para contacto

/**
 * Componente Contact - Sección de contacto con formulario accesible
 * Implementa validación y feedback para mejor experiencia de usuario
 */
function Contact() {
  // Estado para manejar el formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Constantes para validación
  const MAX_MESSAGE_LENGTH = 500; // Límite de caracteres para el mensaje
  
  // Estado para manejar errores de validación
  const [formErrors, setFormErrors] = useState({});
  
  // Estado para mensaje de éxito
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Estado para manejar proceso de envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para error de envío
  const [submitError, setSubmitError] = useState('');

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Aplicar restricciones según el campo
    let processedValue = value;
    
    if (name === 'phone') {
      // Solo permitir números y caracteres de formato (+, -, espacio, paréntesis)
      processedValue = value.replace(/[^0-9+\-\s()]/g, '');
    } else if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
      // Limitar longitud del mensaje
      processedValue = value.substring(0, MAX_MESSAGE_LENGTH);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
    
    // Eliminar error cuando el usuario comienza a corregir
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Valida el formulario antes de enviarlo
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      errors.phone = 'El teléfono solo debe contener números y símbolos válidos';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es obligatorio';
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      errors.message = `El mensaje no debe exceder ${MAX_MESSAGE_LENGTH} caracteres`;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Verifica si el formulario es válido para habilitar/deshabilitar el botón de envío
  const isFormValid = useCallback(() => {
    // Verificar que todos los campos requeridos tengan valor
    if (!formData.name.trim() || !formData.email.trim() || 
        !formData.phone.trim() || !formData.message.trim()) {
      return false;
    }
    
    // Verificar que no haya errores activos
    if (Object.keys(formErrors).length > 0) {
      return false;
    }
    
    // Validar formato de email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      return false;
    }
    
    return true;
  }, [formData, formErrors]);

  // Inicializar EmailJS
  useEffect(() => {
    // Inicialización de EmailJS - Estos son valores de ejemplo, tendrás que reemplazarlos con tus propias credenciales
    emailjs.init("dS3ymEQpvDlRFT3Zd"); // Reemplazar con tu clave pública de EmailJS
  }, []);
  
  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      
      // Preparar plantilla de parámetros para EmailJS
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        phone: formData.phone,
        message: formData.message
      };
      
      // Enviar email usando EmailJS
      emailjs.send(
        'service_de9nmfj', // Reemplazar con tu ID de servicio EmailJS
        'template_np82jrs', // Reemplazar con tu ID de plantilla EmailJS
        templateParams
      )
        .then((response) => {
          console.log('Email enviado con éxito:', response);
          setSubmitSuccess(true);
          setIsSubmitting(false);
          
          // Resetear formulario después de 5 segundos
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: ''
            });
            setSubmitSuccess(false);
          }, 5000);
        })
        .catch((error) => {
          console.error('Error al enviar el email:', error);
          setSubmitError('Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.');
          setIsSubmitting(false);
        });
    } else {
      // Anunciar errores para lectores de pantalla
      document.getElementById('form-errors-alert').focus();
    }
  };

  return (
    <section id="contacto" className="section contact parallax-section" aria-labelledby="contact-title" style={{backgroundImage: `url(${contactImage})`}}>
      <div className="parallax-overlay"></div>
      <div className="container">
        <h2 id="contact-title" className="section-title">Contacto</h2>
        <p className="section-subtitle">Estamos listos para ayudarte a mejorar tu calidad de vida</p>
        
        <div className="contact-container">
          {/* Panel de información de contacto */}
          <div className="contact-info-panel">
            <div className="contact-details-grid">
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <FontAwesomeIcon icon={faMapMarkerAlt} aria-hidden="true" className="contact-icon" />
                </div>
                <div className="contact-text">
                  <strong>Ubicación:</strong>
                  <a href="https://www.google.com/maps/place/Av.+Eugenia+Tapia+de+Cruz+1382+Local+N%C2%B04,+B1625+Bel%C3%A9n+de+Escobar,+Provincia+de+Buenos+Aires/@-34.3524302,-58.8025634,17z/data=!3m1!4b1!4m5!3m4!1s0x95bb61b94cd3bfed:0x4b53f873cf8fa6c5!8m2!3d-34.3524347!4d-58.7999885?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><address>Tapia de Cruz 1382 Local N°4, Belén de Escobar, Buenos Aires.</address></a>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <FontAwesomeIcon icon={faPhone} aria-hidden="true" className="contact-icon" />
                </div>
                <div className="contact-text">
                  <strong>Teléfono:</strong>
                  <a href="tel:+541124011312" aria-label="Llamar al teléfono +54 11 24011312">+54 11 24011312</a>
                </div>
              </div>                      
              
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className="contact-icon" />
                </div>
                <div className="contact-text">
                  <strong>Email:</strong>
                  <a href="mailto:contacto@nextstep.com.ar" aria-label="Enviar email a contacto@nextstep.com.ar">contacto@nextstep.com.ar</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div 
                id="form-errors-alert" 
                className="sr-only" 
                aria-live="assertive"
                tabIndex="-1"
              >
                {Object.values(formErrors).length > 0 && 'Hay errores en el formulario. Por favor, corrígelos.'}
              </div>
              
              {submitSuccess && (
                <div className="success-message" role="alert">
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </div>
              )}
              
              {submitError && (
                <div className="error-message" role="alert">
                  {submitError}
                </div>
              )}
              
              {isSubmitting && (
                <div className="info-message" role="status">
                  Enviando mensaje...
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nombre completo <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ej: Juan Pérez"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${formErrors.name ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                />
                {formErrors.name && (
                  <div id="name-error" className="error-message" role="alert">
                    {formErrors.name}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${formErrors.email ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && (
                  <div id="email-error" className="error-message" role="alert">
                    {formErrors.email}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Teléfono <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Ej: +54 11 12345678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${formErrors.phone ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                  inputMode="tel"
                />
                {formErrors.phone && (
                  <div id="phone-error" className="error-message" role="alert">
                    {formErrors.phone}
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Mensaje <span className="required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Escribe tu mensaje aquí (máximo 500 caracteres)"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea ${formErrors.message ? 'error' : ''}`}
                  rows="5"
                  maxLength={MAX_MESSAGE_LENGTH}
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                ></textarea>
                <div className="character-count">
                  {formData.message.length}/{MAX_MESSAGE_LENGTH} caracteres
                </div>
                {formErrors.message && (
                  <div id="message-error" className="error-message" role="alert">
                    {formErrors.message}
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                className={`submit-button ${isSubmitting || !isFormValid() ? 'disabled' : ''}`}
                disabled={isSubmitting || !isFormValid()}
                title={isFormValid() ? 'Enviar mensaje' : 'Complete todos los campos correctamente para enviar'}
              >
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" /> 
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
