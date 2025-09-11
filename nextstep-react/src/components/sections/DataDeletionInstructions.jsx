import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';

/**
 * Componente DataDeletionInstructions - Instrucciones para la eliminación de datos de usuario
 * Implementa estructura semántica y accesible
 */
function DataDeletionInstructions() {
  // Obtener la fecha actual en formato localizado para español
  const currentDate = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section id="eliminacion-datos" className="section data-deletion" aria-labelledby="deletion-title">
      <div className="container">
        <h2 id="deletion-title" className="section-title">
          <FontAwesomeIcon icon={faTrashAlt} className="deletion-icon" /> 
          Instrucciones para la Eliminación de Datos de Usuario
        </h2>
        <p className="section-subtitle">Última actualización: {currentDate}</p>
        
        <div className="deletion-content">
          <div className="deletion-section">
            <h3>1. Tu Derecho a la Eliminación de Datos</h3>
            <p>
              Como usuario de Nextstep, tienes derecho a solicitar la eliminación de tus datos personales 
              en cualquier momento. Respetamos tu privacidad y facilitamos este proceso.
            </p>
          </div>
          
          <div className="deletion-section">
            <h3>2. Qué Datos se Eliminarán</h3>
            <p>Cuando solicites la eliminación de tus datos, procederemos a eliminar:</p>
            <ul>
              <li>Todos los mensajes intercambiados con el bot</li>
              <li>Tu información de perfil almacenada</li>
              <li>Historial de interacciones y conversaciones</li>
              <li>Datos de uso y preferencias</li>
              <li>Cualquier otra información personal asociada a tu cuenta</li>
            </ul>
          </div>
          
          <div className="deletion-section">
            <h3>3. Cómo Solicitar la Eliminación</h3>
            <h4>Método 1: Email Directo</h4>
            <ul>
              <li>Envía un email a: romero.sbn@gmail.com</li>
              <li>Asunto: "Solicitud de Eliminación de Datos - Nextstep"</li>
              <li>Incluye: Tu nombre de usuario de Messenger o cualquier información que nos ayude a identificar tu cuenta</li>
            </ul>
            
            <h4>Método 2: A través del Bot</h4>
            <p>Contacta directamente a través del bot de Messenger y solicita la eliminación de tus datos.</p>
          </div>
          
          <div className="deletion-section">
            <h3>4. Información Requerida para la Solicitud</h3>
            <p>Para procesar tu solicitud de eliminación, necesitamos:</p>
            <ul>
              <li>Tu nombre completo</li>
              <li>Nombre de usuario de Messenger</li>
              <li>Fecha aproximada de cuando comenzaste a usar el bot</li>
              <li>Cualquier información adicional que nos ayude a verificar tu identidad</li>
            </ul>
          </div>
          
          <div className="deletion-section">
            <h3>5. Proceso de Eliminación</h3>
            <h4>Confirmación (24-48 horas)</h4>
            <ul>
              <li>Recibirás una confirmación de que hemos recibido tu solicitud</li>
              <li>Verificaremos tu identidad si es necesario</li>
            </ul>
            
            <h4>Eliminación (Hasta 30 días)</h4>
            <ul>
              <li>Procederemos a eliminar todos tus datos de nuestros sistemas</li>
              <li>Te enviaremos una confirmación una vez completado el proceso</li>
            </ul>
            
            <h4>Verificación</h4>
            <ul>
              <li>Realizaremos verificaciones internas para asegurar la eliminación completa</li>
              <li>Los datos se eliminan de todos nuestros sistemas, incluyendo copias de seguridad</li>
            </ul>
          </div>
          
          <div className="deletion-section">
            <h3>6. Excepciones</h3>
            <p>Podríamos conservar cierta información si:</p>
            <ul>
              <li>Es requerido por ley</li>
              <li>Es necesario para resolver disputas legales pendientes</li>
              <li>Es información agregada y anonimizada que no te identifica personalmente</li>
            </ul>
          </div>
          
          <div className="deletion-section">
            <h3>7. Consecuencias de la Eliminación</h3>
            <p>Una vez eliminados tus datos:</p>
            <ul>
              <li>No podrás acceder a conversaciones pasadas</li>
              <li>Perderás cualquier configuración personalizada</li>
              <li>Será necesario comenzar desde cero si decides usar el bot nuevamente</li>
            </ul>
          </div>
          
          <div className="deletion-section">
            <h3>8. Reactivación</h3>
            <p>Si decides usar Nextstep nuevamente después de eliminar tus datos:</p>
            <ul>
              <li>Será tratado como un usuario completamente nuevo</li>
              <li>No tendremos acceso a ninguna información o conversación anterior</li>
              <li>Deberás configurar nuevamente cualquier preferencia</li>
            </ul>
          </div>
          
          <div className="deletion-section">
            <h3>9. Soporte y Consultas</h3>
            <p>Si tienes preguntas sobre el proceso de eliminación de datos:</p>
            <ul>
              <li>Email: romero.sbn@gmail.com</li>
              <li>Responderemos a tu consulta dentro de 48 horas hábiles</li>
            </ul>
          </div>
          
          <div className="deletion-section">
            <h3>10. Cumplimiento Legal</h3>
            <p>Este proceso de eliminación cumple con:</p>
            <ul>
              <li>Reglamento General de Protección de Datos (GDPR)</li>
              <li>Ley de Protección de Datos Personales local aplicable</li>
              <li>Políticas de privacidad de Facebook/Meta</li>
            </ul>
          </div>
          
          <div className="deletion-footer">
            <p><strong>Nota Importante:</strong> La eliminación de datos es permanente e irreversible. Asegúrate de guardar cualquier información importante antes de solicitar la eliminación.</p>
            <p>Para cualquier consulta adicional, no dudes en contactarnos en: plantillasnextstep@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataDeletionInstructions;
