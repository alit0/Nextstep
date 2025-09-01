import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importar iconos individuales para reducir tamaño del bundle
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
// Importar imagen con metadatos para mejor optimización
import contactImage from '../../assets/img/calzado-mano.jpg?width=1200&format=webp';
import './contact.css'; // Importar estilos específicos para contacto

/**
 * Componente Contact - Sección de contacto con formulario accesible
 * Implementa validación y feedback para mejor experiencia de usuario
 */
function Contact() {

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
                  <a href="https://www.google.com/maps/place/Kinedep/@-34.3514327,-58.8018714,17z/data=!4m15!1m8!3m7!1s0x95bb61bbe3f9ee8b:0xbb5d68b0bcf79b15!2sAlberdi+608,+B1625GWN+Bel%C3%A9n+de+Escobar,+Provincia+de+Buenos+Aires!3b1!8m2!3d-34.3514372!4d-58.7992965!16s%2Fg%2F11l_4lnjl6!3m5!1s0x95bb610039989dc1:0x56278c146b1bcc81!8m2!3d-34.3514372!4d-58.7992965!16s%2Fg%2F11w_zl0p0y?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><address>Alberdi 608, Belén de Escobar, Buenos Aires</address></a>
                  <a href="https://www.google.com/maps/place/Chingolo+480,+B1624+CHQ,+Provincia+de+Buenos+Aires/@-34.4293693,-58.5967327,17z/data=!3m1!4b1!4m6!3m5!1s0x95bca5ae0833eeb9:0xa8f220d623bc1ac1!8m2!3d-34.4293738!4d-58.5941578!16s%2Fg%2F11j2p91c6z?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><address>Chingolo 480, Tigre, Buenos Aires</address></a>
                  <a href="https://www.google.com/maps/place/Complejo+VOHE/@-34.4354686,-58.8320217,17z/data=!4m15!1m8!3m7!1s0x95bc9c27fdb5d489:0x2b45803c4238d710!2sR.+Caama%C3%B1o+1370,+B1631BVB+La+Lonja,+Provincia+de+Buenos+Aires!3b1!8m2!3d-34.4354731!4d-58.8294468!16s%2Fg%2F11sxx52ssk!3m5!1s0x95bc9c27f989ebe1:0x5e43d230bf31e42!8m2!3d-34.4355932!4d-58.8292178!16s%2Fg%2F11bz0x5mhg?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><address>R. Caamaño 1370, Pilar, Buenos Aires</address></a>
                  <a href="https://www.google.com/maps/place/Virrey+del+Pino+2428,+C1426+EGQ,+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.566289,-58.4577957,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcb5d0381639cd:0x29bbe39288e03962!8m2!3d-34.5662935!4d-58.4529248!16s%2Fg%2F11xd4nknmp?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><address>Virrey del pino 2428, Belgrano, CABA</address></a>

                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <FontAwesomeIcon icon={faPhone} aria-hidden="true" className="contact-icon" />
                </div>
                <div className="contact-text">
                  <strong>Teléfono:</strong>
                  <a href="tel:+541140898343" aria-label="Llamar al teléfono +54 11 40898343">+54 11 40898343</a>
                </div>
              </div>                      
              
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className="contact-icon" />
                </div>
                <div className="contact-text">
                  <strong>Email:</strong>
                  <a href="mailto:plantillasnextstep@gmail.com" aria-label="Enviar email a plantillasnextstep@gmail.com">plantillasnextstep@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulario de contacto */}
{/*           <div className="contact-form-container">
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
                className={`submit-button ${isSubmitting || !isFormValid ? 'disabled' : ''}`}
                disabled={isSubmitting || !isFormValid}
                title={isFormValid ? 'Enviar mensaje' : 'Complete todos los campos correctamente para enviar'}
              >
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" /> 
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Contact;
