import React, { useContext, useEffect, useState, useRef } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearEstados } from '../components/estados.js';
import { getRandomNumber } from '../components/habilidades.js';

const PantallaCombate = ({ isActive }) => {
  const { toggleComponent, jugador, enemigo, skills } = useContext(GlobalStateContext);
  const [ activeDiv, setActiveDiv ] = useState(false)
  const [ jugadorEnCombate, setJugadorEnCombate ] = useState(null)
  
  const [ historial, setHistorial ] = useState([])
  const [ ronda, setRonda ] = useState(0);
  const [ contadorTurno, setContadorTurno ] = useState(0)
  const [ miTurno, setMiTurno ] = useState(null);
  
  const [ estados, setEstados ] = useState(null) // <<<=====================================MAP DE ESTADOS CON SUS RESPECTIVA DURACION EN TURNOS
  const [ timeEstados, setTimeEstados ] = useState([]) // <<<===========================ESTADOS EN PERSONAJES, ESTA ES LA QUE CAMBIA
  const timeEstadosAnterior = useRef(timeEstados)


  const cambiarDivTo = (divDestino) => {
    setActiveDiv(divDestino)
  }

  function startCombate(){
    const newEstados = crearEstados() // <<<========== SE CREAN LOS ESTADOS
    setEstados(newEstados)
  }

  function gestorDeTurnos(){
    if(jugadorEnCombate.invocacionElegida.stats.velocidad >= enemigo.invocacionElegida.stats.velocidad){
      setMiTurno(true)
      console.log('Es Turno del Jugador');
    } else {
      setMiTurno(false)
      console.log('Es Turno del Enemigo');
    }
  }
asdw <================== asdawwd
  function ataqueEnemigo(){
    let num = Math.floor(getRandomNumber(0, enemigo.invocacionElegida.habilidades.length - 1))
  }

  useEffect(() => {  // <<<<<=============================== GESTOR DE ACCIONES
    if(miTurno === true){
      if(usarHabilidad()){
        setMiTurno(false)

        let contadorTurnoActual = contadorTurno + 1
        setContadorTurno(contadorTurnoActual)
      }
    } else if(miTurno === false){

    }

    if(contadorTurno >= 3){
      let rondaActual = ronda + 1
      setRonda(rondaActual)

      setContadorTurno(1)
    }
  },[miTurno, contadorTurno, ronda])
  
  useEffect(()=>{
    setJugadorEnCombate(jugador)
  },[jugador, skills])

  // useEffect(() => {  // <<<<<=================================================INICIA EL COMBATE Y DETERMINA EL TURNO===========================
  //   if(toggleComponent === 'PantallaCombate'){
  //     historial.push('Comienza El Combate')
  //     console.log('==============================================INICIO EL COMBATE==============================================');

  //     if(jugador.invocacionElegida.stats.velocidad >= enemigo.invocacionElegida.stats.velocidad){
  //       let rondaActual = ronda + 1
  //       setTurno(true)
  //       setRonda(rondaActual)
  //     } else {
  //       let rondaActual = ronda + 1
  //       setTurno(false)
  //       setRonda(rondaActual)
  //     }
  //   }
  // },[toggleComponent])

  // useEffect(() => { // <<<<<================================================MANEJA LOS TURNOS=================================================
  //   if(ronda > 0){
  //     if(historial.length[historial.length - 1].caster.nombre === jugadorEnCombate.invocacionElegida.nombre && historial.length[historial.length - 2].caster.nombre === enemigo.invocacionElegida.nombre) {
  //       let rondaActual = ronda + 1
  //       setRonda(rondaActual)
  //     } else if(historial.length[historial.length - 2].caster.nombre === jugadorEnCombate.invocacionElegida.nombre && historial.length[historial.length - 1].caster.nombre === enemigo.invocacionElegida.nombre){
  //       let rondaActual = ronda + 1
  //       setRonda(rondaActual) ================================ Y SI SOLO CREAMOS UNA FUNCION Y IGNORAMOS LOS <TURNOS></TURNOS>
  //     }

  //     if(historial.length[historial.length - 1].caster.nombre === jugadorEnCombate.invocacionElegida.nombre){  // SOLUCION POR REVISAR <<================
  //       setTurno(false)
  //     } else {
  //       setTurno(true)
  //     }
  //   }
  // },[historial])

  // useEffect(() => { // <<<<<<=============================================CREAMOS Y ACTUALIZAMOS LOS ESTADOS=========================================
  //   if(estados === null){
  //     let misEstados = crearEstados()
  //     setEstados(misEstados)
  //   }

  //   if(ronda != 0){
  //     let jugadorEstados = jugadorEnCombate.invocacionElegida.estados
  //     let enemigoEstados = enemigo.invocacionElegida.estados
  //     let duracionEstados = []  // <<<=================================================AQUI SE RETORNARA LA VARIABLE CUANTO DURE UN ESTADO (EL CONTADOR)

  //     if(jugadorEstados.length === 0 && timeEstadosAnterior != timeEstados){

  //     }
      
  //     if(enemigoEstados.length === 0){
        
  //     }
  //   }

  // },[ronda])



  return (
    <div className={`${isActive ? 'active' : 'inactive'}`}>
      {jugadorEnCombate != null && jugadorEnCombate.invocacionElegida && (
        <div className='d-flex flex-column h-100 w-100'>
          <section>
            {/* escenario */}
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut nulla itaque sint reprehenderit quidem eaque iure impedit beatae unde alias asperiores saepe, amet harum deserunt exercitationem possimus atque, consequatur quisquam.</p>
          </section>
          
          <section className='d-flex align-items-center'>
              {historial && historial.map((texto) => 
                <div className=' h-50 w-50'>
                    <p>{texto}</p>
                </div>
              )}

            <div>
              {/* menu de accion */}
              <button onClick={() => cambiarDivTo('divHabilidades')}>Habilidades</button>
              <button onClick={() => cambiarDivTo('divMochila')}>Mochila</button>
              <button onClick={() => cambiarDivTo('divHuir')}>Huir</button>
              <button onClick={() => cambiarDivTo('')}>Volver</button>

              <div className={`${activeDiv === 'divHabilidades'? 'active' : 'inactive'}`}>
                <div className='d-flex justify-content-evenly align-items-center  h-50 w-50'>
                  {jugadorEnCombate.invocacionElegida.habilidades.map((skill) => (
                    <button key={skill.id} onClick={() => {skill.usarHabilidad()}} disabled={miTurno ? false : true}>{skill.nombre}</button>
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
