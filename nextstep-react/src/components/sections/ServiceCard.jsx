import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Componente ServiceCard - Card reutilizable para mostrar servicios
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.icon - Ícono de FontAwesome para el servicio
 * @param {string} props.title - Título del servicio
 * @param {string} props.description - Descripción del servicio
 */
function ServiceCard({ icon, title, description }) {
  return (
    <div className="service-card" role="listitem">
      <div className="service-icon" aria-hidden="true">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

// Definición de PropTypes para validación de tipo
ServiceCard.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ServiceCard;
