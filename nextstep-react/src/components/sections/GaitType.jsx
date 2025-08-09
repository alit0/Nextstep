import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente GaitType - Card reutilizable para mostrar tipos de pisada
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.type - Tipo de pisada (pronada, neutra, supinada)
 * @param {string} props.title - Título del tipo de pisada
 * @param {string} props.description - Descripción del tipo de pisada
 */
function GaitType({ type, title, description }) {
  return (
    <div className={`gait-card ${type}`} role="listitem">
      <h4 id={`gait-${type}`}>{title}</h4>
      <p aria-labelledby={`gait-${type}`}>{description}</p>
    </div>
  );
}

// Validación de propiedades
GaitType.propTypes = {
  type: PropTypes.oneOf(['pronada', 'neutra', 'supinada']).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default GaitType;
