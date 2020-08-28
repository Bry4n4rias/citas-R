import React, { Fragment, useState, useEffect } from 'react';
import { Formulario } from './components/Formulario';
import { Cita } from './components/Cita';

function App() {
  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use efect para ciertas operaciones cuando el state cambia
  // En este caso si citas cambia
  // Leemos si en el local storage hay citas para q las muestra en pantalla
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  // Leer las citas actuales y agregar la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Funcion q elimina cita por ID
  const eliminarCita = (id) => {
    // Vamos a crear un uevo arreglo q muestra las citas cuando alguna se eliminar y la flltramos
    // Para q me traiga los q sean diferentes deacuerdo al id q le demos click
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    // Llamamos ese Use effect para q me actaulice el arreglo por pantalla
    // Como es un arreglo nuevo no necesitamos el spread para hacerle push
    guardarCitas(nuevasCitas);
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario crearCita={crearCita} />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
