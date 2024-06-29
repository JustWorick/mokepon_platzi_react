import React, { useContext, useEffect, useState, useRef } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearEstados } from '../components/estados.js';
import { getRandomNumber } from '../components/habilidades.js';

const PantallaCombate = ({ isActive }) => {
  const { toggleComponent, jugador, enemigo, skills } = useContext(GlobalStateContext);
  const [ activeDiv, setActiveDiv ] = useState(false)
  const [ jugadorEnCombate, setJugadorEnCombate ] = useState(null)
  const [ enemigoEnCombate, setEnemigoEnCombate ] = useState(null)
  
  const [ ronda, setRonda ] = useState(0);
  const [ contadorTurno, setContadorTurno ] = useState(0)
  const [ miTurno, setMiTurno ] = useState(null);
  const [ historial, setHistorial ] = useState([])
  
  const [ estados, setEstados ] = useState(null) // <<<=====================================MAP DE ESTADOS CON SUS RESPECTIVA DURACION EN TURNOS
  const [ timeEstados, setTimeEstados ] = useState([]) // <<<===========================ESTADOS EN PERSONAJES, ESTA ES LA QUE CAMBIA
  const timeEstadosAnterior = useRef(timeEstados)
  

  const cambiarDivTo = (divDestino) => {
    setActiveDiv(divDestino)
  }
  
  function startCombate(){
    const newEstados = crearEstados() // <<<========== SE CREAN LOS ESTADOS
    setEstados(newEstados)

    setRonda(1)
    console.log('<<<==================================================== fUNC START COMBATE');
  }
  
  function gestorDeTurnos(){
    if(jugadorEnCombate && jugadorEnCombate.invocacionElegida && enemigoEnCombate && enemigoEnCombate.invocacionElegida){
      if(jugadorEnCombate.invocacionElegida.stats.velocidad >= enemigoEnCombate.invocacionElegida.stats.velocidad){
        setMiTurno(true)
        console.log('Es Turno del Jugador');
      } else {
        setMiTurno(false)
        console.log('Es Turno del Enemigo');
      }
      console.log('Jugador en combate y Enemigo en combate se estan leyendo');
    }
    console.log('<<<====================================================Gestor de turnos de esta Leyendo');
  }

  function ataqueEnemigo(){
    let num = Math.floor(getRandomNumber(0, enemigoEnCombate.invocacionElegida.habilidades.length - 1))
    jugadorEnCombate.invocacionElegida.habilidades[num].usarHabilidad()
    setMiTurno(true)

    let contadorTurnoActual = contadorTurno + 1
    setContadorTurno(contadorTurnoActual)
  }

  function ataqueJugador(idFuncEfecto){
    jugadorEnCombate.invocacionElegida.habilidades[idFuncEfecto].usarHabilidad()
    setMiTurno(false)

    let contadorTurnoActual = contadorTurno + 1
    setContadorTurno(contadorTurnoActual)
  }


  useEffect(() => {  // <<<<<=============================== GESTOR DE ACCIONES
    if(ronda === 0){
      startCombate()
    }

    gestorDeTurnos()  

    if(miTurno === false){  // <<<=============================== LANZA EL ATAQUE ENEMIGO
      ataqueEnemigo()
    }

    if(contadorTurno >= 3){  // <<<===================================== MANEJA LAS RONDAS
      let rondaActual = ronda + 1
      setRonda(rondaActual)
      
      setContadorTurno(1)
      console.log('Es la ronda N°: ' + ronda);
    }

    console.log(`La ronda Actual es: ${ronda}, el contador de ronda es: ${contadorTurno} y el miTurno es: ${miTurno}`);
    console.log(`El Jugador en combate es: ${jugadorEnCombate} y el Enemigo en combate es: ${enemigoEnCombate}`);
    console.log(jugadorEnCombate);
    console.log(enemigoEnCombate);
  },[miTurno, contadorTurno, ronda, jugadorEnCombate, activeDiv])
  

  useEffect(()=>{
    setJugadorEnCombate(jugador)
    setEnemigoEnCombate(enemigo)
  },[jugador, enemigo, skills])
  
  
  return (
    <div className={`${isActive ? 'active' : 'inactive'}`}>
      {jugadorEnCombate != null && jugadorEnCombate.invocacionElegida && (
        <div className='d-flex flex-column h-100 w-100'>
          <section>
            {/* ===================================== ESCENARIO =================================================================*/}

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut nulla itaque sint reprehenderit quidem eaque iure impedit beatae unde alias asperiores saepe, amet harum deserunt exercitationem possimus atque, consequatur quisquam.</p>
          </section>
          
          <section className='d-flex align-items-center'>
              {historial && historial.map((texto) => 
                <div className=' h-50 w-50'>
                    <p>{texto}</p>
                </div>
              )}

            <div>
              {/* ============================================= MENU DE ACCION ====================================================== */}
              <button onClick={() => cambiarDivTo('divHabilidades')}>Habilidades</button>
              <button onClick={() => cambiarDivTo('divMochila')}>Mochila</button>
              <button onClick={() => cambiarDivTo('divHuir')}>Huir</button>
              <button onClick={() => cambiarDivTo('')}>Volver</button>

              <div className={`${activeDiv === 'divHabilidades'? 'active' : 'inactive'}`}>
                <div className='d-flex justify-content-evenly align-items-center  h-50 w-50'>
                  {jugadorEnCombate.invocacionElegida.habilidades.map((skill) => (
                    <button key={skill.id} onClick={() => {ataqueJugador(skill.id)}} disabled={miTurno ? false : true}>{skill.nombre}</button>
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
