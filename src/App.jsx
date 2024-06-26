import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Intro from './pantallas/intro.jsx'
import PantallaPrincipal from './pantallas/pantallaPrincipal.jsx'
import PantallaSelect from './pantallas/pantallaSelect.jsx'
import PantallaMenuJugador from './pantallas/pantallaMenuJugador.jsx'
import PantallaCombate from './pantallas/pantallaCombate.jsx'
import { GlobalStateContext } from './components/globalState.jsx';
import { Jugador } from './components/jugador.js'
import { crearHabilidades, agregarHabilidades, getRandomNumber } from './components/habilidades.js'
import { crearInvocaciones } from './components/invocacion.js'
import './style/App.css'

function App() {
  const { activeComponent, jugador, setJugador, enemigo, setEnemigo, invocaciones, setInvocaciones, skills, setSkills } = useContext(GlobalStateContext);
  const [ bandera1, setBandera1 ] = useState(false)  // <<<============ para ver los console.log al final

  useLayoutEffect(() => {   // <<======  CREAMOS JUGADOR Y ENEMIGO
    const player = new Jugador('ejemplo1');  
    setJugador(player);

    const enemy = new Jugador('enemigo');
    setEnemigo(enemy)
  }, []);

  useEffect(() => {   // <<=========== CREAMOS LAS INVOCACIONES
      let invocacionesCreadas = crearInvocaciones(); 
      setInvocaciones(invocacionesCreadas)
  },[])
  
  useEffect(() => {    // <<=========== CREAMOS LAS HABILIDADES
      let habilidadesCreadas = crearHabilidades();
      setSkills(habilidadesCreadas)
  },[])

  useEffect(() => {    // <<<===================== SE AGREGARON LAS HABILIDADES A LAS INVOCACIONES
    if(skills && invocaciones){
      let brayan = invocaciones.find(invo => invo.nombre === 'Brayan Anuel')
      let ramirez = invocaciones.find(invo => invo.nombre === 'Cabo Ramirez')

      if(brayan.habilidades.length <= 0 && ramirez.habilidades.length <= 0){
        agregarHabilidades(skills, [0,1,2,3], brayan) 
        agregarHabilidades(skills, [4,5,6,7,8], ramirez)
      }
    }
  },[skills])


  useEffect(() => { // <<<=============== LE AÑADE UNA INVOCACION AL ENEMIGO EN CASO DE QUE NO TENGA
    if(enemigo && invocaciones.length > 0 && enemigo.invocacionElegida === null){
      let num = Math.floor(getRandomNumber(1,2))
      if(num === 1){
        enemigo.modificarInvocacionElegida(invocaciones[0])
      } else {
        enemigo.modificarInvocacionElegida(invocaciones[1])
      }
    }
  },[invocaciones])

  
  // jugador.invocacionElegida.habilidades[0].setObjetivo(enemigo.invocacionElegida)
  // jugador.invocacionElegida.habilidades[0].setCaster(jugador.invocacionElegida)

  // enemigo.invocacionElegida.habilidades[0].setObjetivo(jugador.invocacionElegida)
  // enemigo.invocacionElegida.habilidades[0].setCaster(enemigo.invocacionElegida)

  
  useEffect(() => {
    console.log(jugador, enemigo, invocaciones, skills)
  },[skills])

  return (
    <div className='contenedor d-flex justify-content-center align-items-center'>
      <Intro isActive={activeComponent === 'Intro'} />
      <PantallaPrincipal isActive={activeComponent === 'PantallaPrincipal'} />
      <PantallaSelect isActive={activeComponent === 'PantallaSelect'} />
      <PantallaMenuJugador isActive={activeComponent === 'PantallaMenuJugador'} />
      <PantallaCombate isActive={activeComponent === 'PantallaCombate'} />
    </div>
  );
}

export default App
