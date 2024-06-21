import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearInvocaciones } from '../components/invocacion.js';

const PantallaSelect = ({ isActive }) => {
  const { toggleComponent, invocaciones, setInvocaciones } = useContext(GlobalStateContext);
  const [sectionSuperior, setSectionSuperior] = useState(null)

  useEffect(() => {
    let invoList = crearInvocaciones()
    setInvocaciones(invoList)
  },[])

  function elegirInvocacion(id){
    setSectionSuperior(id)
  }

  return (
    <div className={`${isActive ? 'active' : 'inactive'} h-100`}>
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
        <section className='h-75 w-100'>
          <p>Elige un pj</p>
          { sectionSuperior != null && (
            <div>se creo el div</div>
          ) }
        </section>
        <section className='d-flex justify-content-evenly h-25 w-100'>
          { invocaciones.map((invocacion)  => (
            <div className='d-flex flex-column align-items-center' key={invocacion.id} onClick={() => elegirInvocacion(invocacion.id)}>
              <img src={invocacion.img} className='rounded'/>
              <span>{invocacion.nombre}</span>
              <button >Elegir</button>
            </div>
          )) }
        </section>
      </div>
        <button onClick={() => toggleComponent('PantallaMenuJugador')}>Ir a Pantalla Menu Jugador</button> 
    </div>
  );
};

export default PantallaSelect;
