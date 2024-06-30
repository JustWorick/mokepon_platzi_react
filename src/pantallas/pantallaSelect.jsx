import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { findInvocacionById } from '../components/invocacion.js';

const PantallaSelect = ({ isActive }) => {
  const { toggleComponent, invocaciones, jugador, enemigo, skills  } = useContext(GlobalStateContext);
  const [idSectionSuperior, setIdSectionSuperior] = useState(null)
  const [ bandera2, setBandera2 ] = useState(false)
  let invoDivSuperior = findInvocacionById(idSectionSuperior, invocaciones)

  const elegirInvocacionForDiv = (id) => {   // <<<======================= LE MANDA INFORMACION AL SECTION SUPERIOR PARA RENDERIZAR
    setIdSectionSuperior(id)
  }

  const agregarInvocacionJugador = (id) => {   // <<<===================== FUNCION PARA AGREGAR INVOCACION AL JUGADOR
    let invo = findInvocacionById(id, invocaciones)
    jugador.addInvocaciones(invo)         ============================================
    jugador.modificarInvocacionElegida(invo)
    toggleComponent('PantallaCombate')
    console.log(jugador);
    setBandera2(true)
  }

  useEffect(() => {  // <<<<<======================================== AÑADE EL CASTER Y OBJETIVO A JUGADOR Y ENEMIGO
    if(jugador && invocaciones && enemigo && skills && jugador.invocacionElegida != null){
      if(jugador.invocacionElegida.habilidades[0].caster === null && enemigo.invocacionElegida.habilidades[0].caster === null){
          jugador.invocacionElegida.habilidades.map(skill => {
          skill.modificarCasterAndObjetivo(jugador.invocacionElegida, enemigo.invocacionElegida)
        })
      }
    }
  },[jugador, bandera2])

  return (
    <div className={`${isActive ? 'active' : 'inactive'} h-100`}>
      <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100'>
        <section className='h-75 w-100'>
          { idSectionSuperior == null && (
            <>
              <p>Elige una Invocacion</p>
            </>
          ) }
          { idSectionSuperior != null && (
            <div className='d-flex justify-content-between'>
              <div className='w-50'>
                <img src={invoDivSuperior.images.imgGrande} className='img-fluid' style={{width: 400, height: 400 }}/>
              </div>

              <div className='w-50'>
                <div className='flex justify-content-between'>
                  <span>{invoDivSuperior.nombre}</span>
                  <button onClick={() => agregarInvocacionJugador(invoDivSuperior.id)}>Elegir Invocacion</button>
                </div>

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
                  {invoDivSuperior.habilidades.length > 0 && (
                    <div>
                      {invoDivSuperior.habilidades.map((habilidad, index) => (
                        <div key={index} className='row'>
                          <div className='col'>
                            <span>{habilidad.nombre}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) }
        </section>
        <section className='d-flex justify-content-evenly h-25 w-100'>
          { invocaciones.map((invocacion)  => (
            <div className='d-flex flex-column align-items-center' key={invocacion.id} onClick={() => elegirInvocacionForDiv(invocacion.id)}>
              <img src={invocacion.images.imgChica} className='img-fluid' style={{width: 200, height: 200 }}/>
            </div>
          )) }
        </section>
      </div>  
    </div>
  );
};

export default PantallaSelect;
