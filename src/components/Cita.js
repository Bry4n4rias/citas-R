import React from 'react';
import PropTypes from 'prop-types';

export const Cita = ({ cita, eliminarCita }) => {
  return (
    <div>
      <div className='cita'>
        <p>
          Mascota:
          <span> {cita.mascota}</span>
        </p>
        <p>
          Propietario:
          <span> {cita.propietario}</span>
        </p>
        <p>
          Fecha:
          <span> {cita.fecha}</span>
        </p>
        <p>
          Hora:
          <span> {cita.hora}</span>
        </p>
        <p>
          Sintomas:
          <span> {cita.sintomas}</span>
        </p>

        <button
          className='button eliminar u-full-width'
          onClick={() => eliminarCita(cita.id)}
        >
          Eliminar &times;
        </button>
      </div>
    </div>
  );
};

// Esto es para q se sepa q el prop es obligatorio
Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired,
};
