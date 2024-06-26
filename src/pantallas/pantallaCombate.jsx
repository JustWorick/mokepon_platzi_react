import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';

const PantallaCombate = ({ isActive }) => {
  const { toggleComponent, jugador, enemigo, skills } = useContext(GlobalStateContext);
  const [ activeDiv, setActiveDiv ] = useState(false)
  const [ ronda, setRonda ] = useState(0);
  const [ turno, setTurno ] = useState(null);
  const [ jugadorEnCombate, setJugadorEnCombate ] = useState(null)

  const cambiarDivTo = (divDestino) => {
    setActiveDiv(divDestino)
  }

  useEffect(()=>{
    setJugadorEnCombate(jugador)
  },[jugador, skills])

  return (
    <div className={`${isActive ? 'active' : 'inactive'}`}>
      {/* <<<<<<<==================================================FALTA AGREGAR EL REDIRECCIONAMIENTO A PANTALLA COMBATE */}
      {jugadorEnCombate != null && (
        <div className='d-flex flex-column h-100 w-100'>
          <section>
            {/* escenario */}
          </section>
          
          <section className='d-flex justify-content-between align-items-center'>
            <div>
              {/* pantalla de texto */}
            </div>

            <div>
              {/* menu de accion */}
              <button onClick={() => cambiarDivTo('divHabilidades')}>Habilidades</button>
              <button onClick={() => cambiarDivTo('divMochila')}>Mochila</button>
              <button onClick={() => cambiarDivTo('divHuir')}>Huir</button>
              <button onClick={() => cambiarDivTo('')}>Volver</button>

              <div className={`${activeDiv === 'divHabilidades'? 'active' : 'inactive'}`}>
                <div className='d-flex justify-content-evenly align-items-center'>
                  {jugadorEnCombate.invocacionElegida.habilidades.map((skill) => (
                    <button key={skill.id} onClick={() => skill.usarHabilidad()}>{skill.nombre}</button>
                  ))}
                </div>
              </div>

              <div className={`${activeDiv === 'divMochila' ? 'active' : 'inactive'}`}>
                <div>
                  <span>WIP</span>
                </div>
              </div>

              <div className={`${activeDiv === 'divHuir' ? 'active' : 'inactive'}`}>
                <div>
                  <span>WIP</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      
    </div>
  );
};

export default PantallaCombate;
