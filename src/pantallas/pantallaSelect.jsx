import React, { useContext, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { crearInvocaciones } from '../components/invocacion.js';

const PantallaSelect = ({ isActive }) => {
  const { toggleComponent } = useContext(GlobalStateContext);

  const [invocaciones, setInvocaciones] = useState([]);

  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <p>Este es el componente PantallaSelect.</p>
      <button onClick={() => toggleComponent('PantallaMenuJugador')}>Ir a Pantalla Menu Jugador</button>
    </div>
  );
};

export default PantallaSelect;
