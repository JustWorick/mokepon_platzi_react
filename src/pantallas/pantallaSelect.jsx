import React, { useContext } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';

const PantallaSelect = ({ isActive }) => {
  const { toggleComponent } = useContext(GlobalStateContext);

  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <p>Este es el componente PantallaSelect.</p>
      <button onClick={() => toggleComponent('PantallaMenuJugador')}>Ir a Pantalla Menu Jugador</button>
    </div>
  );
};

export default PantallaSelect;
