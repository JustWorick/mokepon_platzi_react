import { useContext, useEffect } from 'react'
import Intro from './pantallas/intro.jsx'
import PantallaPrincipal from './pantallas/pantallaPrincipal.jsx'
import PantallaSelect from './pantallas/pantallaSelect.jsx'
import PantallaMenuJugador from './pantallas/pantallaMenuJugador.jsx'
import PantallaCombate from './pantallas/pantallaCombate.jsx'
import { GlobalStateContext } from './components/globalState.jsx';
import { Jugador } from './components/jugador.js'
import './style/App.css'

function App() {
  const { activeComponent, setJugador, enemigo, invocaciones, skills } = useContext(GlobalStateContext);

  useEffect(() => {
    const player = new Jugador('ejemplo1');
    setJugador(player);
  }, []);
  

  useEffect(() => {
    console.log(invocaciones)
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
