import { useContext } from 'react'
import Intro from './pantallas/intro.jsx'
import PantallaPrincipal from './pantallas/pantallaPrincipal.jsx'
import PantallaSelect from './pantallas/pantallaSelect.jsx'
import PantallaMenuJugador from './pantallas/pantallaMenuJugador.jsx'
import PantallaCombate from './pantallas/pantallaCombate.jsx'
import { GlobalStateContext } from './components/globalState.jsx';
import './style/App.css'

function App() {
  const { activeComponent } = useContext(GlobalStateContext);

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
