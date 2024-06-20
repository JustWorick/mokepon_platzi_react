import React, { useContext } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';

const PantallaMenuJugador = ({ isActive }) => {
  const { toggleComponent } = useContext(GlobalStateContext);

  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <p>Este es el componente PantallaMenuJugador.</p>
      <button onClick={() => toggleComponent('PantallaCombate')}>Ir a Pantalla Combate</button>
    </div>
  );
};

export default PantallaMenuJugador;
