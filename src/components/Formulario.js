import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export const Formulario = ({ crearCita }) => {
  // Crear state de citas
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  // Crear state de error
  const [error, actualizarError] = useState(false);

  // Funcion q ejecuta cada q escribe en un input
  const actualizarState = (e) => {
    actualizarCita({
      // Asi seteamos el objeto vacio de arriba
      // cogemos una copia del objeto para agregarle nuevos, ya que react nos lo reescribiria si no lo hacemos
      // No se puede hacer esto: this.mascota = e.target.value
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Extraer valores para setearlos en los atributos de los inputs
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usaurio envie el formulario
  const submitCita = (e) => {
    e.preventDefault();

    // Validar
    if (
      mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      // Llamamos a la funcion del state para cambiarla a true y q muestre error
      actualizarError(true);
      return;
    }

    // Eliminamos el error si aparece
    actualizarError(false);

    // Asignar id
    cita.id = uuidv4();

    // Crear cita
    crearCita(cita);

    // Reiniciar form con los valores a string vacio
    // si llegamos hasta aca es pq todo ya paso las pruebas tonces podemos reiniciar el form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',
    });
  };

  return (
    <div>
      <Fragment>
        <h2>Crear cita</h2>
        {/* Si error es true me muestra el p con el error si no null osea nada */}
        {error ? (
          <p className='alerta-error'>Todos los campos son obligatorios</p>
        ) : null}
        <form onSubmit={submitCita}>
          <label>Nombre mascota</label>
          <input
            type='text'
            name='mascota'
            className='u-full-width'
            placeholder='Nombre Mascota'
            onChange={actualizarState}
            value={mascota}
          />

          <label>Nombre del dueno</label>
          <input
            type='text'
            name='propietario'
            className='u-full-width'
            placeholder='Nombre Dueno'
            onChange={actualizarState}
            value={propietario}
          />

          <label>Fecha</label>
          <input
            type='date'
            name='fecha'
            className='u-full-width'
            onChange={actualizarState}
            value={fecha}
          />

          <label>Hora</label>
          <input
            type='time'
            name='hora'
            className='u-full-width'
            onChange={actualizarState}
            value={hora}
          />

          <label>Sintomas</label>
          <textarea
            className='u-full-width'
            name='sintomas'
            onChange={actualizarState}
            value={sintomas}
          ></textarea>

          <button
            type='submit'
            className='u-full-width button-primary'
            onChange={actualizarState}
          >
            Agregar cita
          </button>
        </form>
      </Fragment>
    </div>
  );
};

// Esto es para q se sepa q el prop es obligatorio
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};
