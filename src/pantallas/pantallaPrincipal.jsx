import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../components/globalState.jsx';
import { Jugador } from '../components/jugador.js';

const PantallaPrincipal = ({ isActive }) => {
  const { toggleComponent, jugador, setJugador} = useContext(GlobalStateContext);

  
  const [inputValue, setInputValue] = useState('Juanito');
  
  const handleChange = (event) => {
    setInputValue(event.target.value); // Actualiza el estado con el valor del input
  };
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const player = new Jugador(inputValue);
    setJugador(player); 
    toggleComponent('PantallaSelect');
    console.log(jugador);
  };
  

  return (
    <div className={`position-relative ${isActive ? 'd-block' : 'd-none'} w-100 h-100`}>
      <img src={'/assets/fondos/invokers.png'} className='position-absolute top-0 start-0 w-100 h-100 z-0' alt="Fondo" />

      <div className="d-flex flex-column justify-content-center align-items-center h-100 position-absolute mt-5 start-0 w-100 z-1">
        <form onSubmit={handleSubmit}>
          <label>
            Ingresa Tu Nombre:
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Enviar</button>
        </form>
        <button onClick={() => toggleComponent('PantallaSelect')} className='btn btn-success'>New Game</button>
        <button onClick={() => toggleComponent('PantallaSelect')} className='btn btn-success mt-2'>Load</button>
      </div>
    </div>
    
  );
};

export default PantallaPrincipal;
