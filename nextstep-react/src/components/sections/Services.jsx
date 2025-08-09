import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints, faWalking } from '@fortawesome/free-solid-svg-icons';
import ServiceCard from './ServiceCard';

/**
 * Componente Services - Muestra los servicios ofrecidos por Nextstep
 * Implementa elementos semánticos y accesibles
 */
function Services() {
  // Definir los servicios como datos estructurados para mayor mantenibilidad
  const services = [
    {
      id: 'baropodometria',
      icon: faShoePrints,
      title: 'Baropodometría Digital',
      description: 'Escaneamos tu pisada con tecnología digital para obtener un diagnóstico visual y preciso de los diferentes puntos de apoyo del pie.'
    },
    {
      id: 'plantillas',
      icon: faShoePrints,
      title: 'Plantillas Personalizadas',
      description: 'Diseñadas 100% a medida con goma eva y resina termo-moldeable que se adapta perfectamente a tus pies.'
    },
    {
      id: 'marcha',
      icon: faWalking,
      title: 'Estudio Digital de Marcha',
      description: 'Análisis completo de datos estáticos y dinámicos de tus pisadas, ideal para deportistas y uso diario.'
    }
  ];

  return (
    <section id="servicios" className="section services" aria-labelledby="services-title">
      <div className="container">
        <h2 id="services-title" className="section-title">Nuestros Servicios</h2>
        <p className="section-subtitle">Utilizamos tecnología de vanguardia para brindarte el mejor cuidado podal</p>
        
        <div className="services-grid" role="list">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
