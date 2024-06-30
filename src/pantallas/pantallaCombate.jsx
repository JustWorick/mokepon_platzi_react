import React, { useContext, useEffect, useState, useRef } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearEstados } from '../components/estados.js';
import { getRandomNumber } from '../components/habilidades.js';
import '../style/pantallaCombatte.css'


const PantallaCombate = ({ isActive }) => {
  const { toggleComponent, jugador, enemigo, skills, activeComponent } = useContext(GlobalStateContext);
  const [ activeDiv, setActiveDiv ] = useState(false)
  const [ jugadorEnCombate, setJugadorEnCombate ] = useState(null)
  const [ enemigoEnCombate, setEnemigoEnCombate ] = useState(null)
  
  const [ ronda, setRonda ] = useState(0);
  const [ contadorTurno, setContadorTurno ] = useState(0)
  const [ miTurno, setMiTurno ] = useState(null);
  const [ historial, setHistorial ] = useState([])
  
  const [ estados, setEstados ] = useState() // <<<=====================================MAP DE ESTADOS CON SUS RESPECTIVA DURACION EN TURNOS
  const [ timeEstados, setTimeEstados ] = useState([]) // <<<===========================ESTADOS EN PERSONAJES, ESTA ES LA QUE CAMBIA
  const timeEstadosAnterior = useRef(timeEstados)

  const cambiarDivTo = (divDestino) => {
    setActiveDiv(divDestino)
  }
  
  function startCombate(){
    const newEstados = crearEstados() // <<<========== SE CREAN LOS ESTADOS
    setEstados(newEstados)
    setHistorial(['Historial Creado'])

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
      console.log('<<<====================================================Gestor de turnos de   esta Leyendo');
    }
  }

  function ataqueEnemigo(){
    let num = Math.floor(getRandomNumber(0, enemigoEnCombate.invocacionElegida.habilidades.length - 1))
    jugadorEnCombate.invocacionElegida.habilidades[num].usarHabilidad()
    setMiTurno(true)

    let contadorTurnoActual = contadorTurno + 1
    setContadorTurno(contadorTurnoActual)

    console.log('============================================================================================================================================== TURNO DEL ENEMIGO');

  }

  function ataqueJugador(idFuncEfecto){
    jugadorEnCombate.invocacionElegida.habilidades.find(elemento => elemento.id === idFuncEfecto)
    setMiTurno(false)
    console.log(jugadorEnCombate.invocacionElegida.habilidades[idFuncEfecto]);

    let contadorTurnoActual = contadorTurno + 1
    setContadorTurno(contadorTurnoActual)

    console.log('============================================================================================================================================== TURNO DEL JUGADOR');
  }


  useEffect(() => {  // <<<<<=============================== GESTOR DE ACCIONES
    if(activeComponent === 'PantallaCombate'){
      if(ronda === 0){
        startCombate()
      }
  
      if(miTurno === null){
        gestorDeTurnos()  
      }
  
      if(miTurno === false){  // <<<=============================== LANZA EL ATAQUE ENEMIGO
        ataqueEnemigo()
      }
  
      if(contadorTurno > 2){  // <<<===================================== MANEJA LAS RONDAS
        let rondaActual = ronda + 1
        setRonda(rondaActual)
        
        setContadorTurno(1)
        console.log('Es la ronda N°: ' + ronda);
      }
  
      //console.log(`La ronda Actual es: ${ronda}, el contador de ronda es: ${contadorTurno} y el miTurno es: ${miTurno}`);
    }
  },[miTurno, contadorTurno, ronda, activeComponent])
  

  useEffect(()=>{  // <<<================================================= TRABAJAMOS CON COPIAS DE JUGADOR Y ENEMIGO PARA EVITAR PROBLEMAS
    if(activeComponent === 'PantallaCombate' && jugadorEnCombate === null){
      setJugadorEnCombate(jugador)
      setEnemigoEnCombate(enemigo)
    }

    if(activeComponent === 'PantallaCombate' && jugadorEnCombate){
      jugadorEnCombate.invocacionElegida.modificarIdRandom()
      enemigoEnCombate.invocacionElegida.modificarIdRandom()
      console.log('=========================================================================ESTO NO DEBERIA SALIR MAS DE 1 VEZ');
    }
  },[activeComponent, jugadorEnCombate])
  






  return (
    <div className={`${isActive ? 'active' : 'inactive'} h-100 w-100`}>
      {jugadorEnCombate != null && jugadorEnCombate.invocacionElegida && (
        <div className='d-flex flex-column h-100 w-100'>
          <section className='d-flex justify-content-between border border-primary h-50'>
            {/* ===================================== ESCENARIO =================================================================*/}
            <div className='d-flex flex-column w-50 ms-4 mt-2'>
              <div className="vida-container">
                {jugadorEnCombate && jugadorEnCombate.invocacionElegida && (
                  <div className="vida-barra text-center" id="vidaBarra">{Math.floor(jugadorEnCombate.invocacionElegida.stats.saludActual)} / {jugadorEnCombate.invocacionElegida.stats.saludMaxima}</div>
                )}
              </div>

              <div>
                <span>{jugadorEnCombate.invocacionElegida.nombre}</span>
              </div>

            </div>

            <div className='d-flex flex-column w-50 align-items-end me-4 mt-2'>
              <div className="vida-container">
                {enemigoEnCombate && enemigoEnCombate.invocacionElegida && (
                  <div className="vida-barra text-center" id="vidaBarra">{Math.floor(enemigoEnCombate.invocacionElegida.stats.saludActual)} / {enemigoEnCombate.invocacionElegida.stats.saludMaxima}</div>
                )}
              </div>

              <div>
                <span>{enemigoEnCombate.invocacionElegida.nombre}</span>
              </div>

            </div>

          </section>
          
          <section className='d-flex align-items-center border border-danger h-50'>
            <div className=' h-50 w-50'>
              {historial && historial.map((texto) => 
                    <p key={texto}>{texto}</p>
                  )}
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, perferendis? Aspernatur ut ea sint at, vero voluptatem amet ab sequi eaque repellendus dolor, mollitia iusto voluptas nostrum et neque modi.</p>
            </div>

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
