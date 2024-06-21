import React, { useContext } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';


const PantallaPrincipal = ({ isActive }) => {
  const { toggleComponent } = useContext(GlobalStateContext);

  return (
    <div className={`position-relative ${isActive ? 'd-block' : 'd-none'} w-100 h-100`}>
      <img src={'/assets/fondos/invokers.png'} className='position-absolute top-0 start-0 w-100 h-100 z-0' alt="Fondo" />
      <div className="d-flex flex-column justify-content-center align-items-center h-100 position-absolute mt-5 start-0 w-100 z-1">
        <button onClick={() => toggleComponent('PantallaSelect')} className='btn btn-success'>New Game</button>
        <button onClick={() => toggleComponent('PantallaSelect')} className='btn btn-success mt-2'>Load</button> // se hace al final
      </div>
    </div>
    
  );
};

export default PantallaPrincipal;
