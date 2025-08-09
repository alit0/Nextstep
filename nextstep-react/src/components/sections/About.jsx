import React from 'react';
import plantillasImage from '../../assets/img/plantillas.jpg';

/**
 * Componente About - Sección sobre la empresa y su misión
 * Implementa estructura semántica y accesible
 */
function About() {
  return (
    <section id="nosotros" className="section about" aria-labelledby="about-title">
      <div className="container">
        <h2 id="about-title" className="section-title">Sobre Nosotros</h2>
        <p className="section-subtitle">Somos un equipo de salud dedicado al cuidado, prevención y concientización del desarrollo y funcionamiento biomecánico del cuerpo humano.</p>
        
        <div className="about-content">
          <div className="about-box">
            <div className="about-image-container">
              <img 
                src={plantillasImage} 
                alt="Plantillas ortopédicas digitalizadas" 
                className="about-image"
              />
            </div>

            <div className="about-text">
              <h3>Nuestra Misión</h3>
              <p>Equilibramos la vida brindando la información para un cuerpo donde los síntomas no sean un límite. Diseñamos plantillas digitalizadas a medida para ayudarte a que te muevas con seguridad y disfrutes de las actividades que te apasionan.</p>
              <p>Nuestra metodología de trabajo y tecnología nos permite evaluar al paciente en su totalidad para mejorar su calidad de vida y bienestar.</p>
            </div>
          </div>


          
          <div className="professional" aria-labelledby="professional-title">
            <h4 id="professional-title">Nuestros Profesionales</h4>
            <div className="professional-item">
              <h5>MARCOS VILLARREAL</h5>
              <p><strong>Lic. Terapia Física - Osteópata</strong></p>
              <p>Con múltiples certificaciones en:</p>
              <ul aria-label="Certificaciones profesionales">
                <li>Tapping Neuromuscular</li>
                <li>Kinesiología deportiva aplicada al Running</li>
                <li>Rehabilitación Postural</li>
                <li>Rehabilitación deportiva</li>
                <li>Reaviliación neuropediatría</li>
                <li>Evaluador interdisciplinario pediátrico</li>
              </ul>
            </div>

            <div className="professional-item">
              <h5>ACUÑA TEYRA ALEXIS GISSELL</h5>
              <p><strong>Lic. Terapia Física - Osteópata</strong></p>
              <p>Con múltiples certificaciones en:</p>
              <ul aria-label="Certificaciones profesionales">
                <li>Tapping Neuromuscular</li>
                <li>Kinesiología deportiva aplicada al Running</li>
                <li>Rehabilitación Postural</li>
                <li>Técnica y evaluadora del estudio de marcha</li>
                <li>Directora de instituto de Rehabilitación integral</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
