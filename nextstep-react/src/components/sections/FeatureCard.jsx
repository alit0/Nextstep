import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Componente FeatureCard - Card reutilizable para mostrar características destacadas
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.icon - Ícono de FontAwesome para la característica
 * @param {string} props.title - Título de la característica
 * @param {string} props.description - Descripción breve de la característica
 */
function FeatureCard({ icon, title, description }) {
  // Generar un ID único basado en el título para asociaciones ARIA
  const titleId = `feature-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="feature-card" role="listitem">
      <FontAwesomeIcon 
        icon={icon} 
        size="3x" 
        aria-hidden="true"
        title={title} 
      />
      <h4 id={titleId}>{title}</h4>
      <p aria-labelledby={titleId}>{description}</p>
    </div>
  );
}

// Validación de propiedades para mejor mantenibilidad
FeatureCard.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default FeatureCard;
