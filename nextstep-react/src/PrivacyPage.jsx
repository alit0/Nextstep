import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons/faShieldAlt';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import './components/sections/privacy-policy.css';

function PrivacyPage() {
  // Obtener la fecha actual en formato localizado para español
  const currentDate = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <button onClick={goHome} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
        </button>
      </div>
      
      <section className="section privacy-policy" aria-labelledby="privacy-title">
        <div className="container">
          <h2 id="privacy-title" className="section-title">
            <FontAwesomeIcon icon={faShieldAlt} className="privacy-icon" /> Política de Privacidad
          </h2>
          <p className="section-subtitle">Última actualización: {currentDate}</p>
          
          <div className="privacy-content">
            <div className="privacy-section">
              <h3>1. Información General</h3>
              <p>
                Nextstep ("nosotros", "nuestro" o "la aplicación") respeta tu privacidad y se compromete a proteger 
                tus datos personales. Esta política de privacidad describe cómo recopilamos, usamos, almacenamos y 
                protegemos tu información cuando utilizas nuestro bot de Messenger para empresas.
              </p>
              <p>
                <strong>Información de contacto:</strong><br />
                Email: plantillasnextstep@gmail.com<br />
                Aplicación: Nextstep Bot de Messenger
              </p>
            </div>
            
            <div className="privacy-section">
              <h3>2. Información que Recopilamos</h3>
              
              <h4>2.1 Información proporcionada directamente</h4>
              <ul>
                <li>Mensajes que envías a través del bot</li>
                <li>Información de perfil básica de Facebook/Messenger (nombre, ID de usuario)</li>
                <li>Cualquier información que compartas voluntariamente durante las conversaciones</li>
              </ul>
              
              <h4>2.2 Información recopilada automáticamente</h4>
              <ul>
                <li>Datos de uso del bot (frecuencia de uso, comandos utilizados)</li>
                <li>Información técnica (tipo de dispositivo, hora de acceso)</li>
                <li>Datos de interacción con el bot</li>
              </ul>
            </div>
            
            <div className="privacy-section">
              <h3>3. Cómo Utilizamos tu Información</h3>
              <p>Utilizamos la información recopilada para:</p>
              <ul>
                <li>Proporcionar y mejorar nuestros servicios de bot</li>
                <li>Responder a tus consultas y solicitudes</li>
                <li>Personalizar tu experiencia con el bot</li>
                <li>Realizar análisis para mejorar la funcionalidad</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </div>
            
            <div className="privacy-section">
              <h3>4. Compartir Información</h3>
              <p>
                No vendemos, intercambiamos ni transferimos tu información personal a terceros, excepto:
              </p>
              <ul>
                <li>Cuando sea requerido por ley</li>
                <li>Para proteger nuestros derechos legales</li>
                <li>Con proveedores de servicios que nos ayudan a operar el bot (bajo estrictos acuerdos de confidencialidad)</li>
              </ul>
            </div>
            
            <div className="privacy-section">
              <h3>5. Almacenamiento y Seguridad</h3>
              <ul>
                <li>Implementamos medidas de seguridad técnicas y organizativas apropiadas</li>
                <li>Los datos se almacenan de forma segura y se accede a ellos solo cuando es necesario</li>
                <li>Mantenemos tu información solo durante el tiempo necesario para los fines descritos</li>
              </ul>
            </div>
            
            <div className="privacy-section">
              <h3>6. Tus Derechos</h3>
              <p>Tienes derecho a:</p>
              <ul>
                <li>Acceder a tu información personal</li>
                <li>Solicitar corrección de datos inexactos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Solicitar la portabilidad de tus datos</li>
              </ul>
              <p>Para ejercer estos derechos, contáctanos en: romero.sbn@gmail.com</p>
            </div>
            
            <div className="privacy-section">
              <h3>7. Eliminación de Datos</h3>
              <p>
                Puedes solicitar la eliminación de tus datos en cualquier momento. 
                Para más información, consulta nuestras "Instrucciones de Eliminación de Datos de Usuario".
              </p>
            </div>
            
            <div className="privacy-section">
              <h3>8. Menores de Edad</h3>
              <p>
                Nuestro servicio no está dirigido a menores de 13 años. No recopilamos conscientemente 
                información personal de menores de 13 años.
              </p>
            </div>
            
            <div className="privacy-section">
              <h3>9. Cambios en esta Política</h3>
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad. 
                Te notificaremos sobre cambios significativos a través del bot o por email.
              </p>
            </div>
            
            <div className="privacy-section">
              <h3>10. Contacto</h3>
              <p>
                Si tienes preguntas sobre esta política de privacidad, contáctanos en:<br />
                Email: plantillasnextstep@gmail.com
              </p>
            </div>
            
            <div className="privacy-footer">
              <p>
                Esta política de privacidad cumple con las regulaciones aplicables de protección de datos, 
                incluyendo GDPR y normativas locales.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="privacy-footer-nav">
        <button onClick={goHome} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default PrivacyPage;
