import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import contactImage from '../../assets/img/calzado-mano.jpg';

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
  
  // Estado para manejar errores de validación
  const [formErrors, setFormErrors] = useState({});
  
  // Estado para mensaje de éxito
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!/^[0-9\s()-]+$/.test(formData.phone)) {
      errors.phone = 'El teléfono solo debe contener números y símbolos válidos';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es obligatorio';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica para enviar el formulario
      console.log('Formulario enviado:', formData);
      
      // Mostrar mensaje de éxito
      setSubmitSuccess(true);
      
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
                  <address>San Isidro, Buenos Aires</address>
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
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nombre completo <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${formErrors.phone ? 'error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
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
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea ${formErrors.message ? 'error' : ''}`}
                  rows="5"
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                ></textarea>
                {formErrors.message && (
                  <div id="message-error" className="error-message" role="alert">
                    {formErrors.message}
                  </div>
                )}
              </div>
              
              <button type="submit" className="submit-button">
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" /> Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
