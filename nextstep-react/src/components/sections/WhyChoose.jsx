import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faChild, faCalendarAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import FeatureCard from './FeatureCard';

/**
 * Componente WhyChoose - Sección que muestra las ventajas de elegir Next Step
 * Implementa el patrón de composición con componentes reutilizables
 */
function WhyChoose() {
  // Datos de características para facilitar mantenimiento y escalabilidad
  const features = [
    {
      id: 'garantia',
      icon: faShieldAlt,
      title: 'Garantía de 15 Días',
      description: 'Período de prueba completo con ajustes sin cargo adicional'
    },
    {
      id: 'familia',
      icon: faChild,
      title: 'Para Toda la Familia',
      description: 'Atendemos adultos y niños desde los 4 años de edad'
    },
    {
      id: 'durabilidad',
      icon: faCalendarAlt,
      title: 'Durabilidad Garantizada',
      description: 'Nuestras plantillas tienen una vida útil de 1 a 2 años'
    },
    {
      id: 'comodidad',
      icon: faHeart,
      title: 'Comodidad Inmediata',
      description: 'El 95% de nuestros pacientes reporta mejorías desde el primer uso'
    }
  ];

  return (
    <section className="section why-choose" aria-labelledby="why-choose-title">
      <div className="container">
        <h2 id="why-choose-title" className="section-title">¿Por Qué Elegir Next Step?</h2>
        <p className="section-subtitle">Beneficios que solo nuestras plantillas personalizadas pueden ofrecerte</p>
        
        <div className="features-grid" role="list">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
