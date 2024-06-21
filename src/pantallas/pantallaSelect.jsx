import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearInvocaciones, findInvocacionById } from '../components/invocacion.js';

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

  let invoDivSuperior = findInvocacionById(sectionSuperior, invocaciones)

  return (
    <div className={`${isActive ? 'active' : 'inactive'} h-100`}>
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
        <section className='h-75 w-100'>
          <p>Elige un pj</p>
          { sectionSuperior != null && (
            <div className='d-flex justify-content-between'>
              <img src={invoDivSuperior.imgGrande} className='img-fluid' style={{width: 500, height: 500 }}/>
              <div>
                <span>{invoDivSuperior.nombre}</span>
                  <div>
                    
                  </div>
              </div>
            </div>
          ) }
        </section>
        <section className='d-flex justify-content-evenly h-25 w-100'>
          { invocaciones.map((invocacion)  => (
            <div className='d-flex flex-column align-items-center' key={invocacion.id} onClick={() => elegirInvocacion(invocacion.id)}>
              <img src={invocacion.imgChica} className='img-fluid' style={{width: 200, height: 200 }}/>
              <span>{invocacion.nombre}</span>
              <button >Elegir</button>
            </div>
          )) }
        </section>
      </div>  
    </div>
  );
};

export default PantallaSelect;
