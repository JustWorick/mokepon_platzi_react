import React, { useContext } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';

const PantallaCombate = ({ isActive }) => {
  const { toggleComponent } = useContext(GlobalStateContext);

  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <p>Este es el componente PantallaCombate.</p>
      <button onClick={() => toggleComponent('Intro')}>Ir a Intro</button>
    </div>
  );
};

export default PantallaCombate;
