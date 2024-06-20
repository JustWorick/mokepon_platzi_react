import React, { useContext } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';


const PantallaPrincipal = ({ isActive }) => {
  const { toggleComponent } = useContext(GlobalStateContext);

  return (
    // <div className={`position-relative ${isActive ? 'active' : 'inactive'}`}>
    //     <img src={'/assets/fondos/invokers.png'} className={'position-absolute top-0 start-0 z-index-0'}/>
    //     <button onClick={() => toggleComponent('PantallaSelect')} className='btn btn-success'>New Game</button>
    // </div>
    <div className={`position-relative ${isActive ? 'd-block' : 'd-none'} w-100 h-100`}>
      <img src={'/assets/fondos/invokers.png'} className='position-absolute top-0 start-0 w-100 h-100 z-0' alt="Fondo" />
      <div className="d-flex justify-content-center align-items-center h-100 z-1">
        <button onClick={() => toggleComponent('PantallaSelect')} className='btn btn-success position-absolute z-1'>New Game</button>
      </div>
    </div>
    
  );
};

export default PantallaPrincipal;
