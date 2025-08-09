import React from 'react';
import GaitType from './GaitType';

/**
 * Componente GaitTypes - Sección que muestra los diferentes tipos de pisada
 * Usa el componente GaitType para cada tipo de pisada, mejorando la reutilización
 */
function GaitTypes() {
  // Datos de tipos de pisada para mejor mantenibilidad y escalabilidad
  const gaitTypes = [
    {
      id: 'pronada',
      type: 'pronada',
      title: 'PISADA PRONADA (Plano)',
      description: 'El pie se va hacia afuera y el arco colapsa para absorber el impacto. Necesita corrección específica para evitar lesiones.'
    },
    {
      id: 'neutra',
      type: 'neutra',
      title: 'PISADA NEUTRA',
      description: 'Los pies y tobillos mantienen la línea vertical. Es la pisada ideal que buscamos mantener o lograr.'
    },
    {
      id: 'supinada',
      type: 'supinada',
      title: 'PISADA SUPINADA (Cavo)',
      description: 'El apoyo es hacia el borde externo y el pie no rota hacia adentro. Requiere soporte especializado.'
    }
  ];

  return (
    <section id="pisada" className="section gait-types" aria-labelledby="gait-types-title">
      <div className="container">
        <h2 id="gait-types-title" className="section-title">Conoce Tu Pisada</h2>
        <p className="section-subtitle">Identificamos tu tipo de pisada para diseñar la plantilla perfecta para ti</p>
        
        <div className="gait-grid" role="list">
          {gaitTypes.map((gaitType) => (
            <GaitType 
              key={gaitType.id}
              type={gaitType.type}
              title={gaitType.title}
              description={gaitType.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GaitTypes;
