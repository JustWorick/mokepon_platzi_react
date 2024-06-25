import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { findInvocacionById } from '../components/invocacion.js';

const PantallaSelect = ({ isActive }) => {
  const { toggleComponent, invocaciones, jugador, enemigo  } = useContext(GlobalStateContext);
  const [idSectionSuperior, setIdSectionSuperior] = useState(null)


  let invoDivSuperior = findInvocacionById(idSectionSuperior, invocaciones)

  const elegirInvocacion = (id) => {
    setIdSectionSuperior(id)
  }

  const probarHabilidadJugador = () => {
    if (jugador && jugador.invocacionElegida && jugador.invocacionElegida.habilidades.length > 0) {
      jugador.invocacionElegida.habilidades[0].usarHabilidad()
    }
  };

  const probarHabilidadEnemigo = () => {
    if (enemigo && enemigo.invocacionElegida && enemigo.invocacionElegida.habilidades.length > 0) {
      enemigo.invocacionElegida.habilidades[0].usarHabilidad()
    }
  };

  return (
    <div className={`${isActive ? 'active' : 'inactive'} h-100`}>
      <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100'>
        <section className='h-75 w-100'>
          { idSectionSuperior == null && (
            <>
              <p>Elige un pj</p>
              <button className='btn btn-primary' onClick={probarHabilidadJugador}>Probar Habilidad Jugador</button>
              <button className='btn btn-danger' onClick={probarHabilidadEnemigo}>Probar Habilidad Enemigo</button>
            </>
          ) }
          { idSectionSuperior != null && (
            <div className='d-flex justify-content-between'>
              <div className='w-50'>
                <img src={invoDivSuperior.images.imgGrande} className='img-fluid' style={{width: 400, height: 400 }}/>
              </div>
              <div className='w-50'>
                <span>{invoDivSuperior.nombre}</span>
                <div className='flex flex-column border border-primary-subtle'>
                    <span>Stats</span> 
                      {(
                        <ul>
                          <li>Salud: {invoDivSuperior.stats.saludMaxima}</li>
                          <li>Blindaje: {invoDivSuperior.stats.blindaje}</li>
                          <li>Evasion: {invoDivSuperior.stats.evasion}</li>
                        </ul>
                      )}
                </div>
                <div>
                      <span>Habilidades</span>
                      {(
                        <>
                          <div className='row'>
                            <div className='col'> 
                              <span>{}</span>
                            </div>
                            <div className='col'> 

                            </div>
                          </div>
                          <div className='row'>
                            <div className='col'> 

                            </div>
                            <div className='col'> 

                            </div>
                          </div>
                        </>
                      )}
                </div>
              </div>
            </div>
          ) }
        </section>
        <section className='d-flex justify-content-evenly h-25 w-100'>
          { invocaciones.map((invocacion)  => (
            <div className='d-flex flex-column align-items-center' key={invocacion.id} onClick={() => elegirInvocacion(invocacion.id)}>
              <img src={invocacion.images.imgChica} className='img-fluid' style={{width: 200, height: 200 }}/>
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
